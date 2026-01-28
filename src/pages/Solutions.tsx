import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Building2, Layers, LayoutGrid, FileBarChart } from "lucide-react";

const solutions = [
  {
    id: "retail",
    icon: Briefcase,
    title: "Retail Portfolios",
    description: "Professionally managed multi-asset portfolios designed for individual investors, available across all major platforms.",
    features: [
      "Risk-targeted portfolio range",
      "Active and passive options",
      "Quarterly rebalancing",
      "Full adviser reporting suite",
    ],
    href: "/solutions/retail",
  },
  {
    id: "institutional",
    icon: Building2,
    title: "Institutional Portfolios",
    description: "Sophisticated investment strategies for pension schemes, charities, and corporate clients requiring bespoke solutions.",
    features: [
      "Tailored mandates",
      "ESG integration",
      "Liability-driven strategies",
      "Dedicated relationship management",
    ],
    href: "/solutions/institutional",
  },
  {
    id: "structured",
    icon: Layers,
    title: "Structured Portfolios",
    description: "Bespoke structured products offering defined outcomes, capital protection options, and enhanced yield strategies.",
    features: [
      "Capital protection structures",
      "Autocall strategies",
      "Enhanced income products",
      "Tailored maturity profiles",
    ],
    href: "/solutions/structured",
  },
  {
    id: "model-portfolio",
    icon: LayoutGrid,
    title: "Model Portfolio Service",
    description: "Ready-to-use model portfolios available on all major platforms, designed for efficient implementation.",
    features: [
      "Platform-ready solutions",
      "Automatic rebalancing",
      "Centralised investment proposition",
      "Reduced admin burden",
    ],
    href: "/solutions/model-portfolio",
  },
  {
    id: "reporting",
    icon: FileBarChart,
    title: "Reporting Solutions",
    description: "Comprehensive client reporting tools that save time, impress clients, and support regulatory compliance.",
    features: [
      "Branded client reports",
      "Performance analytics",
      "Regulatory documentation",
      "Digital delivery options",
    ],
    href: "/solutions/reporting",
  },
];

const Solutions = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Investment Solutions for Every Need
            </h1>
            <p className="text-xl text-primary-foreground/80">
              From retail portfolios to institutional mandates, we offer a comprehensive 
              range of investment solutions designed to meet diverse client objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="space-y-8">
            {solutions.map((solution, index) => (
              <div 
                key={solution.id}
                className={`grid lg:grid-cols-2 gap-8 items-center p-8 rounded-2xl border border-border bg-card hover-lift ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <solution.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {solution.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {solution.description}
                  </p>
                  <Button asChild>
                    <Link to={solution.href}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="bg-muted rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 subtle-gradient">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Not Sure Which Solution is Right?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Take our quick questionnaire and we'll recommend the most suitable portfolio 
            solutions based on your clients' needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/tools/questionnaire">
                Start Questionnaire <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">
                Speak to Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
