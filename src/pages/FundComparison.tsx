import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown, Filter, X, FileText, Download, Eye } from "lucide-react";
import { useState, useMemo } from "react";

const allFunds = [
  {
    id: "growth",
    name: "Sequoia Growth Portfolio",
    category: "Growth",
    riskLevel: 4,
    ytdReturn: 12.4,
    threeYearReturn: 8.2,
    fiveYearReturn: 9.1,
    aum: "£420M",
    ocf: 0.65,
    objective: "Long-term capital growth through diversified equity exposure",
    assetAllocation: { equity: 85, bonds: 10, alternatives: 5 },
    factsheetUrl: "/factsheets/sequoia-growth-portfolio.pdf",
  },
  {
    id: "balanced",
    name: "Sequoia Balanced Portfolio",
    category: "Balanced",
    riskLevel: 3,
    ytdReturn: 8.2,
    threeYearReturn: 6.5,
    fiveYearReturn: 7.3,
    aum: "£680M",
    ocf: 0.58,
    objective: "Balance between growth and income with managed volatility",
    assetAllocation: { equity: 60, bonds: 30, alternatives: 10 },
    factsheetUrl: "/factsheets/sequoia-balanced-portfolio.pdf",
  },
  {
    id: "income",
    name: "Sequoia Income Portfolio",
    category: "Income",
    riskLevel: 2,
    ytdReturn: 5.8,
    threeYearReturn: 5.2,
    fiveYearReturn: 5.8,
    aum: "£540M",
    ocf: 0.52,
    objective: "Consistent income generation with capital preservation",
    assetAllocation: { equity: 35, bonds: 55, alternatives: 10 },
    factsheetUrl: "/factsheets/sequoia-income-portfolio.pdf",
  },
  {
    id: "defensive",
    name: "Sequoia Defensive Portfolio",
    category: "Defensive",
    riskLevel: 1,
    ytdReturn: 3.2,
    threeYearReturn: 3.8,
    fiveYearReturn: 4.1,
    aum: "£320M",
    ocf: 0.45,
    objective: "Capital preservation with modest growth in stable conditions",
    assetAllocation: { equity: 20, bonds: 70, alternatives: 10 },
    factsheetUrl: "/factsheets/sequoia-defensive-portfolio.pdf",
  },
  {
    id: "adventurous",
    name: "Sequoia Adventurous Portfolio",
    category: "Adventurous",
    riskLevel: 5,
    ytdReturn: 15.8,
    threeYearReturn: 10.2,
    fiveYearReturn: 11.5,
    aum: "£180M",
    ocf: 0.72,
    objective: "Maximum long-term growth for investors comfortable with volatility",
    assetAllocation: { equity: 95, bonds: 0, alternatives: 5 },
    factsheetUrl: "/factsheets/sequoia-adventurous-portfolio.pdf",
  },
  {
    id: "esg-balanced",
    name: "Sequoia ESG Balanced",
    category: "ESG",
    riskLevel: 3,
    ytdReturn: 7.9,
    threeYearReturn: 6.8,
    fiveYearReturn: 7.1,
    aum: "£240M",
    ocf: 0.62,
    objective: "Sustainable investing with balanced risk-return profile",
    assetAllocation: { equity: 55, bonds: 35, alternatives: 10 },
    factsheetUrl: "/factsheets/sequoia-esg-balanced.pdf",
  },
];

const riskLabels = ["Very Low", "Low", "Medium", "High", "Very High"];

const FundComparison = () => {
  const [selectedFunds, setSelectedFunds] = useState<string[]>([]);
  const [riskFilter, setRiskFilter] = useState<number[]>([1, 5]);
  const [showESGOnly, setShowESGOnly] = useState(false);

  const filteredFunds = useMemo(() => {
    return allFunds.filter(fund => {
      const withinRisk = fund.riskLevel >= riskFilter[0] && fund.riskLevel <= riskFilter[1];
      const matchesESG = showESGOnly ? fund.category === "ESG" : true;
      return withinRisk && matchesESG;
    });
  }, [riskFilter, showESGOnly]);

  const toggleFundSelection = (fundId: string) => {
    setSelectedFunds(prev => 
      prev.includes(fundId) 
        ? prev.filter(id => id !== fundId)
        : prev.length < 3 
          ? [...prev, fundId]
          : prev
    );
  };

  const selectedFundData = allFunds.filter(f => selectedFunds.includes(f.id));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Fund Comparison Hub
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Compare our portfolios side-by-side to find the right solution for your clients. 
              Select up to 3 funds to compare.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/50 border-b border-border sticky top-16 z-40 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Label className="text-sm">Risk Level: {riskLabels[riskFilter[0] - 1]} - {riskLabels[riskFilter[1] - 1]}</Label>
              <div className="w-48">
                <Slider
                  value={riskFilter}
                  onValueChange={setRiskFilter}
                  min={1}
                  max={5}
                  step={1}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch 
                id="esg" 
                checked={showESGOnly}
                onCheckedChange={setShowESGOnly}
              />
              <Label htmlFor="esg" className="text-sm">ESG Only</Label>
            </div>

            {selectedFunds.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedFunds([])}
                className="ml-auto"
              >
                Clear Selection ({selectedFunds.length}/3)
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Funds Grid */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map((fund) => (
              <div 
                key={fund.id}
                onClick={() => toggleFundSelection(fund.id)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedFunds.includes(fund.id)
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">{fund.category}</Badge>
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

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {fund.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
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
                    <p className="text-xs text-muted-foreground mb-1">OCF</p>
                    <span className="font-semibold text-foreground">{fund.ocf}%</span>
                  </div>
                </div>

                {/* Factsheet buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 flex-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Factsheet
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>{fund.name} - Factsheet</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 overflow-hidden rounded-lg border border-border bg-muted/30 flex flex-col items-center justify-center p-8">
                        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 flex-1" 
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={fund.factsheetUrl} download onClick={(e) => e.stopPropagation()}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </a>
                  </Button>
                </div>

                {selectedFunds.includes(fund.id) && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-sm font-medium text-accent">✓ Selected for comparison</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      {selectedFundData.length > 0 && (
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="container">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Comparison Table
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-xl border border-border">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground">Metric</th>
                    {selectedFundData.map(fund => (
                      <th key={fund.id} className="text-left p-4 font-semibold text-foreground">
                        {fund.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4 text-muted-foreground">Risk Level</td>
                    {selectedFundData.map(fund => (
                      <td key={fund.id} className="p-4 font-medium">{riskLabels[fund.riskLevel - 1]}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-muted-foreground">YTD Return</td>
                    {selectedFundData.map(fund => (
                      <td key={fund.id} className="p-4 font-medium text-chart-1">+{fund.ytdReturn}%</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-muted-foreground">3-Year Return (p.a.)</td>
                    {selectedFundData.map(fund => (
                      <td key={fund.id} className="p-4 font-medium">+{fund.threeYearReturn}%</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-muted-foreground">5-Year Return (p.a.)</td>
                    {selectedFundData.map(fund => (
                      <td key={fund.id} className="p-4 font-medium">+{fund.fiveYearReturn}%</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-muted-foreground">OCF</td>
                    {selectedFundData.map(fund => (
                      <td key={fund.id} className="p-4 font-medium">{fund.ocf}%</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-muted-foreground">AUM</td>
                    {selectedFundData.map(fund => (
                      <td key={fund.id} className="p-4 font-medium">{fund.aum}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-muted-foreground">Equity Allocation</td>
                    {selectedFundData.map(fund => (
                      <td key={fund.id} className="p-4 font-medium">{fund.assetAllocation.equity}%</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">Factsheet</td>
                    {selectedFundData.map(fund => (
                      <td key={fund.id} className="p-4">
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl h-[80vh]">
                              <DialogHeader>
                                <DialogTitle>{fund.name} - Factsheet</DialogTitle>
                              </DialogHeader>
                              <div className="flex-1 overflow-hidden rounded-lg border border-border bg-muted/30 flex flex-col items-center justify-center p-8">
                                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
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
                          <Button variant="outline" size="sm" className="h-8 px-2" asChild>
                            <a href={fund.factsheetUrl} download>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </a>
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default FundComparison;
