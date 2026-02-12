import { Button } from "@/components/ui/button";

export const BuyMeATea = () => {
  return (
    <section className="py-40 px-6">
      <div className="max-w-4xl mx-auto flex justify-center">
        <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-secondary/50 border border-border">
          <span className="text-4xl">☕</span>
          <h3 className="text-xl font-bold">Buy Me a Tea</h3>
          <p className="text-sm text-muted-foreground max-w-sm text-center">
            If you enjoy my work and want to support me, consider buying me a tea!
          </p>
          <a
            href="https://www.buymeacoffee.com/ashbin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-5 rounded-full">
              ☕ Buy Me a Tea
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
