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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phoneNumber, email, bookingDate, message }: BookingNotificationRequest = await req.json();

    console.log("Sending booking notification for:", { name, email, bookingDate });

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
        subject: `New Booking Request from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Booking Request</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone Number:</strong> ${phoneNumber}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Booking Date:</strong> ${bookingDate}</p>
              ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
            </div>
            <p style="color: #666; font-size: 14px;">
              This is an automated notification from your portfolio website.
            </p>
          </div>
        `,
      }),
    });

    const adminEmailData = await adminEmailResponse.json();
    console.log("Admin email sent:", adminEmailData);

    // Send confirmation to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Ashwin <onboarding@resend.dev>",
        to: [email],
        subject: "Booking Confirmation - We received your request!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for your booking request, ${name}!</h2>
            <p>We have received your booking request for <strong>${bookingDate}</strong>.</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Booking Details:</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone Number:</strong> ${phoneNumber}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Date:</strong> ${bookingDate}</p>
              ${message ? `<p><strong>Your Message:</strong> ${message}</p>` : ""}
            </div>
            <p>I'll get back to you as soon as possible to confirm your booking.</p>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Best regards,<br>
              Ashwin
            </p>
          </div>
        `,
      }),
    });

    const userEmailData = await userEmailResponse.json();
    console.log("User confirmation email sent:", userEmailData);

    return new Response(
      JSON.stringify({ 
        success: true,
        adminEmail: adminEmailData,
        userEmail: userEmailData 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
