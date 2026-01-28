import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";

const insights = [
  {
    category: "Market Update",
    title: "Q4 2024 Market Outlook: Navigating Uncertainty",
    excerpt: "Our Chief Investment Officer shares perspectives on market dynamics and portfolio positioning for the quarter ahead.",
    date: "January 15, 2025",
    readTime: "5 min read",
    href: "/insights/q4-outlook",
  },
  {
    category: "Investment Strategy",
    title: "The Case for Multi-Asset Diversification in 2025",
    excerpt: "Why a well-diversified multi-asset approach remains crucial in the current market environment.",
    date: "January 10, 2025",
    readTime: "7 min read",
    href: "/insights/diversification",
  },
  {
    category: "Adviser Guide",
    title: "Consumer Duty: What It Means for Investment Selection",
    excerpt: "Practical guidance on how Consumer Duty requirements should influence your investment selection process.",
    date: "January 5, 2025",
    readTime: "10 min read",
    href: "/insights/consumer-duty",
  },
  {
    category: "Market Update",
    title: "Fixed Income Opportunities in a Higher Rate Environment",
    excerpt: "Exploring the renewed attractiveness of bonds after the interest rate reset.",
    date: "December 28, 2024",
    readTime: "6 min read",
    href: "/insights/fixed-income",
  },
  {
    category: "ESG",
    title: "Sustainable Investing: Beyond the Buzzwords",
    excerpt: "A practical look at how we integrate ESG considerations into our investment process.",
    date: "December 20, 2024",
    readTime: "8 min read",
    href: "/insights/esg",
  },
  {
    category: "Adviser Guide",
    title: "Building a Scalable Investment Proposition",
    excerpt: "How centralised investment propositions can help you scale your practice efficiently.",
    date: "December 15, 2024",
    readTime: "12 min read",
    href: "/insights/investment-proposition",
  },
];

const categoryColors: Record<string, string> = {
  "Market Update": "bg-chart-3/10 text-chart-3",
  "Investment Strategy": "bg-primary/10 text-primary",
  "Adviser Guide": "bg-accent/10 text-accent",
  "ESG": "bg-chart-1/10 text-chart-1",
};

const Insights = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Insights & Resources
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Market perspectives, investment insights, and practical guides to help 
              you stay informed and serve your clients better.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="aspect-[16/9] rounded-2xl bg-muted overflow-hidden">
              <div className="w-full h-full hero-gradient flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-primary-foreground/30" />
              </div>
            </div>
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColors["Market Update"]}`}>
                Featured
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {insights[0].title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {insights[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {insights[0].date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {insights[0].readTime}
                </div>
              </div>
              <Button asChild>
                <Link to={insights[0].href}>
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.slice(1).map((article) => (
              <article 
                key={article.title}
                className="group p-6 rounded-xl bg-card border border-border hover-lift"
              >
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColors[article.category] || 'bg-muted text-muted-foreground'}`}>
                  {article.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  <Link to={article.href}>{article.title}</Link>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 lg:py-28 subtle-gradient">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stay Informed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Subscribe to our monthly Market Insight Letter for the latest perspectives 
            and portfolio updates delivered directly to your inbox.
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">
              Subscribe Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Insights;
