import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const funds = [
  {
    name: "Sequoia Growth Portfolio",
    category: "Growth",
    risk: "Medium-High",
    ytdReturn: 12.4,
    aum: "£420M",
    objective: "Long-term capital growth through diversified equity exposure",
    href: "/solutions/retail",
  },
  {
    name: "Sequoia Balanced Portfolio",
    category: "Balanced",
    risk: "Medium",
    ytdReturn: 8.2,
    aum: "£680M",
    objective: "Balance between growth and income with managed volatility",
    href: "/solutions/retail",
  },
  {
    name: "Sequoia Income Portfolio",
    category: "Income",
    risk: "Medium-Low",
    ytdReturn: 5.8,
    aum: "£540M",
    objective: "Consistent income generation with capital preservation",
    href: "/solutions/retail",
  },
  {
    name: "Sequoia Defensive Portfolio",
    category: "Defensive",
    risk: "Low",
    ytdReturn: 3.2,
    aum: "£320M",
    objective: "Capital preservation with modest growth in stable conditions",
    href: "/solutions/retail",
  },
];

const riskColors: Record<string, string> = {
  "Low": "bg-chart-4/20 text-chart-4 border-chart-4/30",
  "Medium-Low": "bg-chart-2/20 text-chart-2 border-chart-2/30",
  "Medium": "bg-accent/20 text-accent border-accent/30",
  "Medium-High": "bg-chart-3/20 text-chart-3 border-chart-3/30",
  "High": "bg-destructive/20 text-destructive border-destructive/30",
};

export function FundCards() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Portfolios
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Professionally managed portfolios designed to meet a range of investor objectives and risk profiles.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/fund-comparison">
              Compare All Funds <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {funds.map((fund, index) => (
            <div 
              key={fund.name}
              className="group p-6 rounded-xl bg-card border border-border hover-lift flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary" className="text-xs">
                  {fund.category}
                </Badge>
                <Badge variant="outline" className={`text-xs ${riskColors[fund.risk]}`}>
                  {fund.risk}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {fund.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                {fund.objective}
              </p>

              <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">YTD Return</p>
                  <div className="flex items-center gap-1">
                    {fund.ytdReturn > 0 ? (
                      <TrendingUp className="h-4 w-4 text-chart-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`font-semibold ${fund.ytdReturn > 0 ? 'text-chart-1' : 'text-destructive'}`}>
                      {fund.ytdReturn > 0 ? '+' : ''}{fund.ytdReturn}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">AUM</p>
                  <span className="font-semibold text-foreground">{fund.aum}</span>
                </div>
              </div>

              <Link 
                to={fund.href}
                className="mt-4 text-sm font-medium text-primary hover:text-primary/80 link-underline transition-colors inline-flex items-center gap-1"
              >
                View Details <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
