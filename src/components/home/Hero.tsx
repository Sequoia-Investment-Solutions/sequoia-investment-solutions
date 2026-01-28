import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Shield, Users } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Sequoia forest" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 lg:py-32">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 text-primary-foreground text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Trusted by 500+ Financial Advisers
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Investment Solutions{" "}
            <span className="text-accent">Built for Advisers</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
            Partner with Sequoia for institutional-grade portfolios, comprehensive reporting, 
            and dedicated support that helps you deliver exceptional outcomes for your clients.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/fund-comparison">
                Compare Funds <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-background/10 border-background/30 text-primary-foreground hover:bg-background/20" asChild>
              <Link to="/tools/questionnaire">
                Find the Right Solution
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-background/20">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                <span className="text-2xl md:text-3xl font-bold text-primary-foreground">£2.4B+</span>
              </div>
              <p className="text-sm text-primary-foreground/60">Assets Under Management</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <Users className="h-5 w-5 text-accent" />
                <span className="text-2xl md:text-3xl font-bold text-primary-foreground">500+</span>
              </div>
              <p className="text-sm text-primary-foreground/60">Adviser Partners</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-2xl md:text-3xl font-bold text-primary-foreground">15+</span>
              </div>
              <p className="text-sm text-primary-foreground/60">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
