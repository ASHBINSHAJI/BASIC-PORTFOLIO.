import { Clock } from "lucide-react";

const services = [
  "Business Websites",
  "Portfolio Websites",
  "Ecommerce Stores",
  "Booking Systems",
  "Website Redesign",
  "Bug Fixing",
];

export const Services = () => {
  return (
    <section className="py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="liquid-glass-subtle">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            What I offer
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Service
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, idx) => (
                <tr
                  key={service}
                  className={`${idx < services.length - 1 ? "border-b border-border" : ""} hover:bg-accent/5 transition-colors`}
                >
                  <td className="px-6 py-5 text-lg font-medium">{service}</td>
                  <td className="px-6 py-5 text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                        Coming Soon
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
