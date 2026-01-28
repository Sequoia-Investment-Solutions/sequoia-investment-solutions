import { Target, TrendingUp, Headphones, FileCheck } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Adviser-Centric Approach",
    description: "Every portfolio and service is designed with the adviser in mind. We understand your challenges and build solutions that make your life easier.",
  },
  {
    icon: TrendingUp,
    title: "Institutional Quality",
    description: "Access the same calibre of investment strategies typically reserved for institutional investors, now available for your retail clients.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Your dedicated relationship manager is just a call away. We pride ourselves on responsive, knowledgeable service that adds value.",
  },
  {
    icon: FileCheck,
    title: "Comprehensive Reporting",
    description: "Client-ready reports, performance analytics, and regulatory documentation—all designed to save you time and impress your clients.",
  },
];

export function WhySequoia() {
  return (
    <section className="py-20 lg:py-28 subtle-gradient">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Advisers Choose Sequoia
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've built our business around what matters most to financial advisers: 
            quality, service, and outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-6 lg:p-8 rounded-xl bg-card border border-border hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
