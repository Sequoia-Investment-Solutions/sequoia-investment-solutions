import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Download, Eye, ArrowRight, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { allFunds, riskLabels, Fund } from "@/data/funds";
import { useMemo } from "react";

interface RecommendedFundsProps {
  riskLevel: number;
  profileName: string;
}

export const RecommendedFunds = ({ riskLevel, profileName }: RecommendedFundsProps) => {
  const recommendedFunds = useMemo(() => {
    // Get exact match and adjacent risk levels
    return allFunds.filter(fund => 
      fund.riskLevel === riskLevel || 
      fund.riskLevel === riskLevel - 1 || 
      fund.riskLevel === riskLevel + 1
    ).sort((a, b) => {
      // Prioritize exact match
      const aMatch = a.riskLevel === riskLevel ? 0 : 1;
      const bMatch = b.riskLevel === riskLevel ? 0 : 1;
      return aMatch - bMatch;
    });
  }, [riskLevel]);

  const primaryFunds = recommendedFunds.filter(f => f.riskLevel === riskLevel);
  const alternativeFunds = recommendedFunds.filter(f => f.riskLevel !== riskLevel);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            Recommended Funds
          </h2>
          <p className="text-muted-foreground mt-1">
            Portfolios matched to the {profileName} risk profile
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="/fund-comparison">
            View All Funds <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      {primaryFunds.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Badge variant="default" className="bg-accent text-accent-foreground">Best Match</Badge>
            Risk Level {riskLevel} - {riskLabels[riskLevel - 1]}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {primaryFunds.map((fund) => (
              <FundCard key={fund.id} fund={fund} isPrimary />
            ))}
          </div>
        </div>
      )}

      {alternativeFunds.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Badge variant="secondary">Also Consider</Badge>
            Adjacent Risk Profiles
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alternativeFunds.map((fund) => (
              <FundCard key={fund.id} fund={fund} isPrimary={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface FundCardProps {
  fund: Fund;
  isPrimary: boolean;
}

const FundCard = ({ fund, isPrimary }: FundCardProps) => {
  return (
    <Card className={`transition-all ${isPrimary ? 'border-accent bg-accent/5' : 'border-border'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="mb-2">{fund.category}</Badge>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < fund.riskLevel ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-lg">{fund.name}</CardTitle>
        <CardDescription className="line-clamp-2">{fund.objective}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">YTD</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-chart-1" />
              <span className="font-semibold text-chart-1">+{fund.ytdReturn}%</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">3Y (p.a.)</p>
            <span className="font-semibold text-foreground">+{fund.threeYearReturn}%</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">OCF</p>
            <span className="font-semibold text-foreground">{fund.ocf}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 flex-1">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>{fund.name} - Factsheet</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-hidden rounded-lg border border-border bg-muted/30 flex flex-col items-center justify-center p-8">
                <p className="text-muted-foreground text-center mb-4">
                  PDF Preview would display here.<br />
                  <span className="text-sm">In production, this would embed the actual PDF document.</span>
                </p>
                <Button asChild>
                  <a href={fund.factsheetUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" className="h-8 flex-1" asChild>
            <a href={fund.factsheetUrl} download>
              <Download className="h-4 w-4 mr-1" />
              Download
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
