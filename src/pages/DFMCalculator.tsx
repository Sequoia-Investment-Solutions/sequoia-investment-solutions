import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, PoundSterling, Calculator, ChartLine, Users, ArrowRight, Info, Download } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const DFMCalculator = () => {
  const [portfolioValue, setPortfolioValue] = useState(500000);
  const [annualContribution, setAnnualContribution] = useState(20000);
  const [timeHorizon, setTimeHorizon] = useState(10);
  const [currentApproach, setCurrentApproach] = useState("advisory");
  const [clientCount, setClientCount] = useState(50);
  const [hoursPerClient, setHoursPerClient] = useState(8);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = () => {
    const currentAssumptions = assumptions[currentApproach as keyof typeof assumptions];
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>DFM Value Calculator Results - Sequoia Investment Solutions</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #163B4F; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #163B4F; padding-bottom: 20px; }
          .header h1 { color: #163B4F; margin: 0 0 8px 0; font-size: 28px; }
          .header p { color: #455b70; margin: 0; font-size: 14px; }
          .section { margin-bottom: 30px; }
          .section h2 { color: #163B4F; border-bottom: 1px solid #ddd; padding-bottom: 8px; font-size: 18px; }
          .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
          .metric { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0; }
          .metric-value { font-size: 24px; font-weight: bold; color: #163B4F; }
          .metric-label { font-size: 12px; color: #455b70; margin-top: 4px; }
          .highlight { background: #163B4F; color: white; }
          .highlight .metric-value { color: white; }
          .highlight .metric-label { color: rgba(255,255,255,0.8); }
          .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
          .table th { background: #f8fafc; color: #163B4F; font-weight: 600; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #455b70; }
          .date { text-align: right; color: #455b70; font-size: 12px; margin-bottom: 20px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Sequoia Investment Solutions</h1>
          <p>DFM Value Calculator Results</p>
        </div>
        <p class="date">Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        
        <div class="section">
          <h2>Input Parameters</h2>
          <table class="table">
            <tr><td>Current Portfolio Value</td><td><strong>${formatCurrency(portfolioValue)}</strong></td></tr>
            <tr><td>Annual Contribution</td><td><strong>${formatCurrency(annualContribution)}</strong></td></tr>
            <tr><td>Investment Horizon</td><td><strong>${timeHorizon} years</strong></td></tr>
            <tr><td>Current Approach</td><td><strong>${currentApproach === 'diy' ? 'DIY / Execution Only' : 'Advisory Service'}</strong></td></tr>
            <tr><td>Number of Clients</td><td><strong>${clientCount}</strong></td></tr>
          </table>
        </div>

        <div class="section">
          <h2>Key Results</h2>
          <div class="metrics">
            <div class="metric highlight">
              <div class="metric-value">${formatCurrency(calculations.dfmFinalValue)}</div>
              <div class="metric-label">DFM Portfolio Value (${timeHorizon}yr)</div>
            </div>
            <div class="metric">
              <div class="metric-value" style="color: #22c55e;">+${formatCurrency(calculations.valueAdded)}</div>
              <div class="metric-label">Value Added by DFM (+${calculations.percentageGain}%)</div>
            </div>
            <div class="metric">
              <div class="metric-value">${calculations.timeSaved} hrs</div>
              <div class="metric-label">Time Saved Annually</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Comparison Analysis</h2>
          <table class="table">
            <tr>
              <th>Metric</th>
              <th>${currentApproach === 'diy' ? 'DIY Approach' : 'Advisory Service'}</th>
              <th>Sequoia DFM</th>
            </tr>
            <tr>
              <td>Expected Return</td>
              <td>${currentAssumptions.returnRate}% p.a.</td>
              <td>${assumptions.dfm.returnRate}% p.a.</td>
            </tr>
            <tr>
              <td>Annual Fees</td>
              <td>${currentAssumptions.fees}%</td>
              <td>${assumptions.dfm.fees}%</td>
            </tr>
            <tr>
              <td>Net Return</td>
              <td>${(currentAssumptions.returnRate - currentAssumptions.fees).toFixed(2)}%</td>
              <td>${(assumptions.dfm.returnRate - assumptions.dfm.fees).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Hours per Client</td>
              <td>${currentAssumptions.timePerClient} hrs</td>
              <td>${assumptions.dfm.timePerClient} hrs</td>
            </tr>
            <tr>
              <td>Final Portfolio Value</td>
              <td>${formatCurrency(calculations.currentFinalValue)}</td>
              <td><strong>${formatCurrency(calculations.dfmFinalValue)}</strong></td>
            </tr>
          </table>
        </div>

        <div class="section">
          <h2>Time Savings Analysis</h2>
          <table class="table">
            <tr><td>Current hours per year (${clientCount} clients)</td><td>${calculations.currentTimeSpent} hours</td></tr>
            <tr><td>DFM hours per year</td><td>${calculations.dfmTimeSpent} hours</td></tr>
            <tr><td><strong>Annual time saved</strong></td><td><strong>${calculations.timeSaved} hours</strong></td></tr>
          </table>
        </div>

        <div class="footer">
          <p><strong>Important Notice:</strong> These projections are for illustrative purposes only. Past performance is not indicative of future results. Actual returns may vary based on market conditions and individual circumstances.</p>
          <p style="margin-top: 15px;">Sequoia Investment Solutions is authorised and regulated by the Financial Conduct Authority.</p>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  // Assumptions for different approaches
  const assumptions = {
    diy: { returnRate: 4.5, fees: 0.3, timePerClient: 12 },
    advisory: { returnRate: 5.5, fees: 0.75, timePerClient: 8 },
    dfm: { returnRate: 6.5, fees: 0.65, timePerClient: 3 },
  };

  // Calculate projected values
  const calculations = useMemo(() => {
    const currentAssumptions = assumptions[currentApproach as keyof typeof assumptions];
    const dfmAssumptions = assumptions.dfm;

    // Calculate future values using compound interest with contributions
    const calculateFutureValue = (
      principal: number,
      annualContrib: number,
      rate: number,
      fees: number,
      years: number
    ) => {
      const netRate = (rate - fees) / 100;
      let value = principal;
      const yearlyValues = [{ year: 0, value: principal }];
      
      for (let i = 1; i <= years; i++) {
        value = value * (1 + netRate) + annualContrib;
        yearlyValues.push({ year: i, value: Math.round(value) });
      }
      
      return { finalValue: Math.round(value), yearlyValues };
    };

    const currentResult = calculateFutureValue(
      portfolioValue,
      annualContribution,
      currentAssumptions.returnRate,
      currentAssumptions.fees,
      timeHorizon
    );

    const dfmResult = calculateFutureValue(
      portfolioValue,
      annualContribution,
      dfmAssumptions.returnRate,
      dfmAssumptions.fees,
      timeHorizon
    );

    // Combine chart data
    const chartData = currentResult.yearlyValues.map((item, index) => ({
      year: `Year ${item.year}`,
      current: item.value,
      dfm: dfmResult.yearlyValues[index].value,
    }));

    // Time savings calculation
    const currentTimeSpent = clientCount * currentAssumptions.timePerClient;
    const dfmTimeSpent = clientCount * dfmAssumptions.timePerClient;
    const timeSaved = currentTimeSpent - dfmTimeSpent;

    // Value added
    const valueAdded = dfmResult.finalValue - currentResult.finalValue;
    const percentageGain = ((valueAdded / currentResult.finalValue) * 100).toFixed(1);

    return {
      currentFinalValue: currentResult.finalValue,
      dfmFinalValue: dfmResult.finalValue,
      valueAdded,
      percentageGain,
      chartData,
      timeSaved,
      currentTimeSpent,
      dfmTimeSpent,
      totalContributions: annualContribution * timeHorizon,
    };
  }, [portfolioValue, annualContribution, timeHorizon, currentApproach, clientCount]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-8 w-8 text-accent" />
              <span className="text-accent font-medium">Interactive Tool</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              DFM Value Calculator
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Demonstrate the tangible benefits of Discretionary Fund Management to your clients. 
              See how DFM can enhance portfolio returns and free up your time.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PoundSterling className="h-5 w-5 text-primary" />
                    Client Portfolio
                  </CardTitle>
                  <CardDescription>
                    Enter your client's investment details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="portfolioValue">Current Portfolio Value</Label>
                      <span className="text-sm font-medium text-primary">
                        {formatCurrency(portfolioValue)}
                      </span>
                    </div>
                    <Slider
                      id="portfolioValue"
                      value={[portfolioValue]}
                      onValueChange={(value) => setPortfolioValue(value[0])}
                      min={50000}
                      max={5000000}
                      step={10000}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>£50k</span>
                      <span>£5m</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="annualContribution">Annual Contribution</Label>
                      <span className="text-sm font-medium text-primary">
                        {formatCurrency(annualContribution)}
                      </span>
                    </div>
                    <Slider
                      id="annualContribution"
                      value={[annualContribution]}
                      onValueChange={(value) => setAnnualContribution(value[0])}
                      min={0}
                      max={100000}
                      step={1000}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>£0</span>
                      <span>£100k</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="timeHorizon">Investment Horizon</Label>
                      <span className="text-sm font-medium text-primary">
                        {timeHorizon} years
                      </span>
                    </div>
                    <Slider
                      id="timeHorizon"
                      value={[timeHorizon]}
                      onValueChange={(value) => setTimeHorizon(value[0])}
                      min={1}
                      max={30}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 year</span>
                      <span>30 years</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentApproach">Current Management Approach</Label>
                    <Select value={currentApproach} onValueChange={setCurrentApproach}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diy">DIY / Execution Only</SelectItem>
                        <SelectItem value="advisory">Advisory Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Adviser Time Analysis
                  </CardTitle>
                  <CardDescription>
                    Calculate time savings across your practice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="clientCount">Number of Clients</Label>
                      <span className="text-sm font-medium text-primary">
                        {clientCount} clients
                      </span>
                    </div>
                    <Slider
                      id="clientCount"
                      value={[clientCount]}
                      onValueChange={(value) => setClientCount(value[0])}
                      min={10}
                      max={200}
                      step={5}
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current hours/year:</span>
                      <span className="font-medium">{calculations.currentTimeSpent} hrs</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">With DFM hours/year:</span>
                      <span className="font-medium">{calculations.dfmTimeSpent} hrs</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="font-medium text-chart-1">Time saved annually:</span>
                      <span className="font-bold text-chart-1">{calculations.timeSaved} hrs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-3 space-y-6" ref={resultsRef}>
              {/* Export Button */}
              <div className="flex justify-end">
                <Button onClick={handleExportPDF} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results as PDF
                </Button>
              </div>

              {/* Key Metrics */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-primary-foreground/70">DFM Portfolio Value</p>
                        <p className="text-2xl font-bold mt-1">
                          {formatCurrency(calculations.dfmFinalValue)}
                        </p>
                        <p className="text-xs text-primary-foreground/60 mt-1">
                          After {timeHorizon} years
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Value Added by DFM</p>
                        <p className="text-2xl font-bold text-chart-1 mt-1">
                          +{formatCurrency(calculations.valueAdded)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          +{calculations.percentageGain}% vs current
                        </p>
                      </div>
                      <ChartLine className="h-8 w-8 text-chart-1" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Time Reclaimed</p>
                        <p className="text-2xl font-bold text-accent mt-1">
                          {calculations.timeSaved} hrs
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Per year across practice
                        </p>
                      </div>
                      <Clock className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Growth Projection</CardTitle>
                  <CardDescription>
                    Comparing {currentApproach === 'diy' ? 'DIY' : 'Advisory'} approach vs Sequoia DFM
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="area" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="area">Area Chart</TabsTrigger>
                      <TabsTrigger value="line">Line Chart</TabsTrigger>
                    </TabsList>
                    <TabsContent value="area">
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={calculations.chartData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis 
                              dataKey="year" 
                              className="text-xs"
                              tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <YAxis 
                              className="text-xs"
                              tick={{ fill: 'hsl(var(--muted-foreground))' }}
                              tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip 
                              formatter={(value: number) => formatCurrency(value)}
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                            />
                            <Legend />
                            <Area 
                              type="monotone" 
                              dataKey="current" 
                              name={currentApproach === 'diy' ? 'DIY Approach' : 'Advisory Approach'}
                              stroke="hsl(var(--muted-foreground))" 
                              fill="hsl(var(--muted))"
                              strokeWidth={2}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="dfm" 
                              name="Sequoia DFM"
                              stroke="hsl(var(--primary))" 
                              fill="hsl(var(--primary) / 0.2)"
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    <TabsContent value="line">
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={calculations.chartData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis 
                              dataKey="year" 
                              className="text-xs"
                              tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <YAxis 
                              className="text-xs"
                              tick={{ fill: 'hsl(var(--muted-foreground))' }}
                              tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip 
                              formatter={(value: number) => formatCurrency(value)}
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                            />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="current" 
                              name={currentApproach === 'diy' ? 'DIY Approach' : 'Advisory Approach'}
                              stroke="hsl(var(--muted-foreground))" 
                              strokeWidth={2}
                              dot={false}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="dfm" 
                              name="Sequoia DFM"
                              stroke="hsl(var(--primary))" 
                              strokeWidth={3}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Assumptions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Assumptions Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium text-muted-foreground">DIY / Execution Only</h4>
                      <ul className="text-sm space-y-1">
                        <li>Return: {assumptions.diy.returnRate}% p.a.</li>
                        <li>Fees: {assumptions.diy.fees}% p.a.</li>
                        <li>Time: {assumptions.diy.timePerClient} hrs/client</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-muted-foreground">Advisory Service</h4>
                      <ul className="text-sm space-y-1">
                        <li>Return: {assumptions.advisory.returnRate}% p.a.</li>
                        <li>Fees: {assumptions.advisory.fees}% p.a.</li>
                        <li>Time: {assumptions.advisory.timePerClient} hrs/client</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-primary">Sequoia DFM</h4>
                      <ul className="text-sm space-y-1">
                        <li>Return: {assumptions.dfm.returnRate}% p.a.</li>
                        <li>Fees: {assumptions.dfm.fees}% p.a.</li>
                        <li>Time: {assumptions.dfm.timePerClient} hrs/client</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                    * These projections are for illustrative purposes only. Past performance is not indicative of future results. 
                    Actual returns may vary based on market conditions and individual circumstances.
                  </p>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Ready to explore DFM?</h3>
                        <p className="text-sm text-muted-foreground">
                          Speak with our team about transitioning your clients
                        </p>
                      </div>
                    </div>
                    <Button asChild>
                      <a href="/contact">
                        Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DFMCalculator;
