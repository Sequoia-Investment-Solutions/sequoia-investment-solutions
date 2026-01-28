import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, Target, Heart, ArrowRight } from "lucide-react";

const team = [
  {
    name: "David Harrington",
    role: "Chief Executive Officer",
    bio: "30+ years in investment management, previously at Schroders and BlackRock.",
  },
  {
    name: "Claire Edwards",
    role: "Chief Investment Officer",
    bio: "Former Head of Multi-Asset at Aberdeen, PhD in Financial Economics.",
  },
  {
    name: "Michael Chen",
    role: "Head of Adviser Relations",
    bio: "15 years supporting IFA businesses, passionate about adviser success.",
  },
  {
    name: "Sarah Williams",
    role: "Director of Operations",
    bio: "Expert in platform integration and operational excellence.",
  },
];

const values = [
  {
    icon: Target,
    title: "Adviser First",
    description: "Every decision we make starts with 'how does this help advisers serve their clients better?'",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standards in investment management and client service.",
  },
  {
    icon: Heart,
    title: "Partnership",
    description: "We succeed when our adviser partners succeed. Their growth is our growth.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Institutional-quality investments should be available to all investors, not just the wealthy.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              About Sequoia Investment Solutions
            </h1>
            <p className="text-xl text-primary-foreground/80">
              For over 15 years, we've been dedicated to empowering financial advisers 
              with the tools, portfolios, and support they need to deliver exceptional outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sequoia was founded in 2009 with a simple but powerful mission: to democratise 
                  access to institutional-quality investment solutions for financial advisers and their clients.
                </p>
                <p>
                  Our founders, veteran investment professionals from some of the world's leading 
                  asset managers, recognised a gap in the market. While large institutional investors 
                  had access to sophisticated, well-diversified portfolios, retail investors were often 
                  left with subpar options.
                </p>
                <p>
                  Today, we manage over £2.4 billion for more than 500 adviser firms across the UK. 
                  We've grown not through aggressive marketing, but through word-of-mouth recommendations 
                  from advisers who trust us with their clients' futures.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden">
                <div className="absolute inset-0 hero-gradient opacity-90 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <p className="text-6xl font-bold mb-2">15+</p>
                    <p className="text-xl">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 subtle-gradient">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to adviser and investor success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="p-6 rounded-xl bg-card border border-border hover-lift">
                <div className="w-16 h-16 rounded-full bg-muted mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-accent font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Partner with Us?
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-8">
            Join over 500 adviser firms who trust Sequoia with their clients' investments.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/contact">
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
