import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  name: string;
  phoneNumber: string;
  email: string;
  bookingDate: string;
  message?: string;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return String(text ?? "").replace(/[&<>"']/g, (m) => map[m]);
}

// Simple in-memory IP rate limiter (per edge instance)
const RATE_LIMIT = 5;
const TIME_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const rateLimiter = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLimiter.get(ip) || []).filter((t) => now - t < TIME_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    rateLimiter.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimiter.set(ip, recent);
  return false;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const errorId = crypto.randomUUID();

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const body = (await req.json()) as BookingNotificationRequest;

    // Basic input validation
    const name = String(body.name ?? "").trim().slice(0, 100);
    const phoneNumber = String(body.phoneNumber ?? "").trim().slice(0, 20);
    const email = String(body.email ?? "").trim().slice(0, 255);
    const bookingDate = String(body.bookingDate ?? "").trim().slice(0, 100);
    const message = body.message ? String(body.message).trim().slice(0, 1000) : "";

    if (!name || !phoneNumber || !email || !bookingDate) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`[${errorId}] Sending booking notification`);

    const safe = {
      name: escapeHtml(name),
      phoneNumber: escapeHtml(phoneNumber),
      email: escapeHtml(email),
      bookingDate: escapeHtml(bookingDate),
      message: escapeHtml(message),
    };

    // Send notification to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["appuminnu500@gmail.com"],
        subject: `New Booking Request from ${name.replace(/[\r\n]/g, " ")}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Booking Request</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${safe.name}</p>
              <p><strong>Phone Number:</strong> ${safe.phoneNumber}</p>
              <p><strong>Email:</strong> ${safe.email}</p>
              <p><strong>Booking Date:</strong> ${safe.bookingDate}</p>
              ${safe.message ? `<p><strong>Message:</strong> ${safe.message}</p>` : ""}
            </div>
            <p style="color: #666; font-size: 14px;">
              This is an automated notification from your portfolio website.
            </p>
          </div>
        `,
      }),
    });

    // Send confirmation to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Ashbin <onboarding@resend.dev>",
        to: [email],
        subject: "Booking Confirmation - We received your request!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for your booking request, ${safe.name}!</h2>
            <p>We have received your booking request for <strong>${safe.bookingDate}</strong>.</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Booking Details:</h3>
              <p><strong>Name:</strong> ${safe.name}</p>
              <p><strong>Phone Number:</strong> ${safe.phoneNumber}</p>
              <p><strong>Email:</strong> ${safe.email}</p>
              <p><strong>Date:</strong> ${safe.bookingDate}</p>
              ${safe.message ? `<p><strong>Your Message:</strong> ${safe.message}</p>` : ""}
            </div>
            <p>I'll get back to you as soon as possible to confirm your booking.</p>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Best regards,<br>
              Ashbin
            </p>
          </div>
        `,
      }),
    });

    if (!adminEmailResponse.ok || !userEmailResponse.ok) {
      console.error(
        `[${errorId}] Email send failed`,
        adminEmailResponse.status,
        userEmailResponse.status
      );
      return new Response(
        JSON.stringify({
          error: "Unable to send notification at this time. Please try again later.",
          errorId,
        }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error(`[${errorId}] Error in send-booking-notification:`, error);
    return new Response(
      JSON.stringify({
        error: "Unable to process booking notification. Please try again later.",
        errorId,
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
