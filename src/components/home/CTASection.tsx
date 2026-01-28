import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, FileQuestion } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Fund Comparison CTA */}
          <div className="relative p-8 lg:p-10 rounded-2xl bg-primary overflow-hidden group hover-lift">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-accent blur-3xl" />
              <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-accent/50 blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                <BarChart className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-3">
                Fund Comparison Hub
              </h3>
              <p className="text-primary-foreground/70 mb-6 max-w-md">
                Compare our portfolios side-by-side. Filter by risk, return, and objective 
                to find the perfect fit for your clients.
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/fund-comparison">
                  Compare Funds <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Questionnaire CTA */}
          <div className="relative p-8 lg:p-10 rounded-2xl border-2 border-border bg-card overflow-hidden group hover-lift">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary blur-3xl" />
              <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-primary/50 blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <FileQuestion className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Not Sure Where to Start?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Take our quick questionnaire and we'll recommend the most suitable 
                portfolio solutions based on your clients' needs.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link to="/tools/questionnaire">
                  Start Questionnaire <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
