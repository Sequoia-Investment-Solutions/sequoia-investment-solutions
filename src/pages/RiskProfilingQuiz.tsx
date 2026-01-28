import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, ArrowLeft, RotateCcw, Download, Target, Clock, PieChart } from "lucide-react";
import { useState, useMemo } from "react";
import { RecommendedFunds } from "@/components/quiz/RecommendedFunds";

interface Question {
  id: number;
  question: string;
  category: "capacity" | "tolerance" | "goals";
  options: {
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your client's primary investment objective?",
    category: "goals",
    options: [
      { text: "Capital preservation - protecting what they have", score: 1 },
      { text: "Income generation - regular returns with stability", score: 2 },
      { text: "Balanced growth - steady appreciation with some income", score: 3 },
      { text: "Capital growth - maximising long-term returns", score: 4 },
      { text: "Aggressive growth - highest possible returns", score: 5 },
    ],
  },
  {
    id: 2,
    question: "What is your client's investment time horizon?",
    category: "capacity",
    options: [
      { text: "Less than 2 years", score: 1 },
      { text: "2-5 years", score: 2 },
      { text: "5-10 years", score: 3 },
      { text: "10-20 years", score: 4 },
      { text: "More than 20 years", score: 5 },
    ],
  },
  {
    id: 3,
    question: "How would your client react if their portfolio dropped 20% in one month?",
    category: "tolerance",
    options: [
      { text: "Sell everything immediately to prevent further losses", score: 1 },
      { text: "Sell some investments to reduce exposure", score: 2 },
      { text: "Hold steady and wait for recovery", score: 3 },
      { text: "Consider buying more at lower prices", score: 4 },
      { text: "Definitely buy more - this is an opportunity", score: 5 },
    ],
  },
  {
    id: 4,
    question: "What percentage of your client's total wealth does this investment represent?",
    category: "capacity",
    options: [
      { text: "More than 75% - the majority of their wealth", score: 1 },
      { text: "50-75% - a significant portion", score: 2 },
      { text: "25-50% - a moderate portion", score: 3 },
      { text: "10-25% - a smaller portion", score: 4 },
      { text: "Less than 10% - a small fraction", score: 5 },
    ],
  },
  {
    id: 5,
    question: "How experienced is your client with investment volatility?",
    category: "tolerance",
    options: [
      { text: "No experience - this is their first investment", score: 1 },
      { text: "Limited - mainly savings accounts and bonds", score: 2 },
      { text: "Moderate - some equity exposure through funds", score: 3 },
      { text: "Experienced - actively managed portfolios for years", score: 4 },
      { text: "Very experienced - comfortable with complex strategies", score: 5 },
    ],
  },
  {
    id: 6,
    question: "Does your client have stable income to cover living expenses without touching investments?",
    category: "capacity",
    options: [
      { text: "No - they rely on investment income", score: 1 },
      { text: "Partially - some income needed from investments", score: 2 },
      { text: "Mostly - only occasional withdrawals needed", score: 3 },
      { text: "Yes - income covers all expenses comfortably", score: 4 },
      { text: "Yes - significant surplus income available", score: 5 },
    ],
  },
  {
    id: 7,
    question: "How would your client describe their attitude to financial risk generally?",
    category: "tolerance",
    options: [
      { text: "Very cautious - avoid risk at all costs", score: 1 },
      { text: "Cautious - prefer safety over returns", score: 2 },
      { text: "Moderate - balanced approach to risk and reward", score: 3 },
      { text: "Willing - comfortable with calculated risks", score: 4 },
      { text: "Adventurous - embrace risk for potential gains", score: 5 },
    ],
  },
  {
    id: 8,
    question: "What would concern your client more?",
    category: "tolerance",
    options: [
      { text: "Losing 15% of their investment value", score: 1 },
      { text: "Slightly more concerned about losses than missing gains", score: 2 },
      { text: "Both concern me equally", score: 3 },
      { text: "Slightly more concerned about missing potential gains", score: 4 },
      { text: "Missing out on 15% potential growth", score: 5 },
    ],
  },
  {
    id: 9,
    question: "Does your client have an emergency fund covering 6+ months of expenses?",
    category: "capacity",
    options: [
      { text: "No emergency fund", score: 1 },
      { text: "Less than 3 months covered", score: 2 },
      { text: "3-6 months covered", score: 3 },
      { text: "6-12 months covered", score: 4 },
      { text: "More than 12 months covered", score: 5 },
    ],
  },
  {
    id: 10,
    question: "How often does your client check their investment performance?",
    category: "tolerance",
    options: [
      { text: "Daily - I need to know what's happening", score: 2 },
      { text: "Weekly - regular monitoring is important", score: 3 },
      { text: "Monthly - periodic check-ins", score: 4 },
      { text: "Quarterly - when statements arrive", score: 4 },
      { text: "Annually - long-term perspective only", score: 5 },
    ],
  },
];

interface RiskProfile {
  name: string;
  level: number;
  description: string;
  allocation: { equities: number; bonds: number; alternatives: number; cash: number };
  suitableFor: string[];
  color: string;
}

const riskProfiles: RiskProfile[] = [
  {
    name: "Defensive",
    level: 1,
    description: "Focus on capital preservation with minimal volatility. Suitable for investors who cannot tolerate any significant losses.",
    allocation: { equities: 10, bonds: 60, alternatives: 10, cash: 20 },
    suitableFor: ["Short time horizon", "Low risk tolerance", "Income-dependent retirees"],
    color: "hsl(var(--chart-5))",
  },
  {
    name: "Cautious",
    level: 2,
    description: "Priority on stability with modest growth potential. Accepts limited short-term volatility for slightly higher returns.",
    allocation: { equities: 25, bonds: 50, alternatives: 15, cash: 10 },
    suitableFor: ["2-5 year horizon", "Prefer stability", "Approaching retirement"],
    color: "hsl(var(--chart-4))",
  },
  {
    name: "Balanced",
    level: 3,
    description: "Equal emphasis on growth and stability. Comfortable with moderate fluctuations in pursuit of reasonable returns.",
    allocation: { equities: 50, bonds: 35, alternatives: 10, cash: 5 },
    suitableFor: ["5-10 year horizon", "Moderate risk tolerance", "Accumulation phase"],
    color: "hsl(var(--chart-3))",
  },
  {
    name: "Growth",
    level: 4,
    description: "Emphasis on capital appreciation over income. Accepts significant volatility for higher long-term returns.",
    allocation: { equities: 70, bonds: 20, alternatives: 8, cash: 2 },
    suitableFor: ["10+ year horizon", "Higher risk tolerance", "Long-term wealth building"],
    color: "hsl(var(--chart-2))",
  },
  {
    name: "Adventurous",
    level: 5,
    description: "Maximum growth focus with high volatility tolerance. Suitable only for investors who can withstand substantial losses.",
    allocation: { equities: 90, bonds: 5, alternatives: 5, cash: 0 },
    suitableFor: ["15+ year horizon", "High risk tolerance", "Wealth not needed for decades"],
    color: "hsl(var(--chart-1))",
  },
];

const RiskProfilingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const progress = ((Object.keys(answers).length) / questions.length) * 100;

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (Object.keys(answers).length === questions.length) {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const results = useMemo(() => {
    if (Object.keys(answers).length !== questions.length) return null;

    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 5;
    const normalizedScore = (totalScore / maxScore) * 5;

    // Calculate category scores
    const categoryScores = {
      capacity: 0,
      tolerance: 0,
      goals: 0,
    };
    const categoryCounts = { capacity: 0, tolerance: 0, goals: 0 };

    questions.forEach(q => {
      if (answers[q.id]) {
        categoryScores[q.category] += answers[q.id];
        categoryCounts[q.category]++;
      }
    });

    const capacityAvg = categoryScores.capacity / categoryCounts.capacity;
    const toleranceAvg = categoryScores.tolerance / categoryCounts.tolerance;
    const goalsAvg = categoryScores.goals / categoryCounts.goals;

    // Determine risk profile (use minimum of capacity and tolerance for suitability)
    const effectiveScore = Math.min(capacityAvg, toleranceAvg);
    let profileIndex = Math.round(effectiveScore) - 1;
    profileIndex = Math.max(0, Math.min(4, profileIndex));

    return {
      totalScore,
      normalizedScore,
      capacityScore: capacityAvg,
      toleranceScore: toleranceAvg,
      goalsScore: goalsAvg,
      profile: riskProfiles[profileIndex],
      profileIndex,
    };
  }, [answers]);

  const handleExportPDF = () => {
    if (!results) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Risk Profile Assessment - Sequoia Investment Solutions</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #163B4F; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #163B4F; padding-bottom: 20px; }
          .header h1 { color: #163B4F; margin: 0 0 8px 0; font-size: 28px; }
          .header p { color: #455b70; margin: 0; font-size: 14px; }
          .profile-badge { text-align: center; padding: 30px; background: #163B4F; color: white; border-radius: 12px; margin: 20px 0; }
          .profile-badge h2 { margin: 0 0 10px 0; font-size: 32px; }
          .profile-badge p { margin: 0; opacity: 0.9; }
          .section { margin-bottom: 30px; }
          .section h3 { color: #163B4F; border-bottom: 1px solid #ddd; padding-bottom: 8px; font-size: 18px; }
          .scores { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
          .score-box { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0; }
          .score-value { font-size: 28px; font-weight: bold; color: #163B4F; }
          .score-label { font-size: 12px; color: #455b70; margin-top: 4px; }
          .allocation { margin-top: 20px; }
          .allocation-bar { display: flex; height: 40px; border-radius: 8px; overflow: hidden; margin: 15px 0; }
          .allocation-segment { display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 12px; }
          .allocation-legend { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 10px; }
          .legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
          .legend-dot { width: 12px; height: 12px; border-radius: 50%; }
          .suitable-list { list-style: none; padding: 0; }
          .suitable-list li { padding: 8px 0; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; gap: 8px; }
          .suitable-list li:last-child { border-bottom: none; }
          .checkmark { color: #22c55e; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #455b70; }
          .date { text-align: right; color: #455b70; font-size: 12px; margin-bottom: 20px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Sequoia Investment Solutions</h1>
          <p>Risk Profile Assessment Report</p>
        </div>
        <p class="date">Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div class="profile-badge">
          <h2>${results.profile.name}</h2>
          <p>Risk Profile Level ${results.profile.level} of 5</p>
        </div>

        <div class="section">
          <h3>Assessment Scores</h3>
          <div class="scores">
            <div class="score-box">
              <div class="score-value">${results.capacityScore.toFixed(1)}</div>
              <div class="score-label">Risk Capacity</div>
            </div>
            <div class="score-box">
              <div class="score-value">${results.toleranceScore.toFixed(1)}</div>
              <div class="score-label">Risk Tolerance</div>
            </div>
            <div class="score-box">
              <div class="score-value">${results.goalsScore.toFixed(1)}</div>
              <div class="score-label">Investment Goals</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>Profile Description</h3>
          <p>${results.profile.description}</p>
        </div>

        <div class="section">
          <h3>Recommended Asset Allocation</h3>
          <div class="allocation-bar">
            <div class="allocation-segment" style="width: ${results.profile.allocation.equities}%; background: #163B4F;">${results.profile.allocation.equities}%</div>
            <div class="allocation-segment" style="width: ${results.profile.allocation.bonds}%; background: #455b70;">${results.profile.allocation.bonds}%</div>
            <div class="allocation-segment" style="width: ${results.profile.allocation.alternatives}%; background: #6b7f8e;">${results.profile.allocation.alternatives}%</div>
            ${results.profile.allocation.cash > 0 ? `<div class="allocation-segment" style="width: ${results.profile.allocation.cash}%; background: #94a3b8;">${results.profile.allocation.cash}%</div>` : ''}
          </div>
          <div class="allocation-legend">
            <div class="legend-item"><span class="legend-dot" style="background: #163B4F;"></span> Equities ${results.profile.allocation.equities}%</div>
            <div class="legend-item"><span class="legend-dot" style="background: #455b70;"></span> Bonds ${results.profile.allocation.bonds}%</div>
            <div class="legend-item"><span class="legend-dot" style="background: #6b7f8e;"></span> Alternatives ${results.profile.allocation.alternatives}%</div>
            <div class="legend-item"><span class="legend-dot" style="background: #94a3b8;"></span> Cash ${results.profile.allocation.cash}%</div>
          </div>
        </div>

        <div class="section">
          <h3>Suitable For Investors Who</h3>
          <ul class="suitable-list">
            ${results.profile.suitableFor.map(item => `<li><span class="checkmark">✓</span> ${item}</li>`).join('')}
          </ul>
        </div>

        <div class="footer">
          <p><strong>Important Notice:</strong> This risk profile assessment is for guidance purposes only and should be used as part of a comprehensive financial planning discussion. Individual circumstances may require adjustments to the suggested profile.</p>
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

  if (showResults && results) {
    return (
      <Layout>
        <section className="py-16 lg:py-20 hero-gradient">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-8 w-8 text-accent" />
                <span className="text-accent font-medium">Assessment Complete</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                Risk Profile: {results.profile.name}
              </h1>
              <p className="text-lg text-primary-foreground/80">
                {results.profile.description}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-background">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Assessment Results</h2>
              <div className="flex gap-3">
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Start New Assessment
                </Button>
                <Button onClick={handleExportPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF Report
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Capacity</p>
                      <p className="text-2xl font-bold">{results.capacityScore.toFixed(1)}/5</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Financial ability to withstand investment losses
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Tolerance</p>
                      <p className="text-2xl font-bold">{results.toleranceScore.toFixed(1)}/5</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Emotional comfort with investment volatility
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-chart-1/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-chart-1" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Focus</p>
                      <p className="text-2xl font-bold">{results.goalsScore.toFixed(1)}/5</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Investment objective alignment
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Recommended Asset Allocation
                  </CardTitle>
                  <CardDescription>
                    Suggested portfolio mix for {results.profile.name} profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex h-8 rounded-lg overflow-hidden">
                      <div 
                        className="bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground"
                        style={{ width: `${results.profile.allocation.equities}%` }}
                      >
                        {results.profile.allocation.equities}%
                      </div>
                      <div 
                        className="bg-secondary flex items-center justify-center text-xs font-medium text-secondary-foreground"
                        style={{ width: `${results.profile.allocation.bonds}%` }}
                      >
                        {results.profile.allocation.bonds}%
                      </div>
                      <div 
                        className="bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground"
                        style={{ width: `${results.profile.allocation.alternatives}%` }}
                      >
                        {results.profile.allocation.alternatives}%
                      </div>
                      {results.profile.allocation.cash > 0 && (
                        <div 
                          className="bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground"
                          style={{ width: `${results.profile.allocation.cash}%` }}
                        >
                          {results.profile.allocation.cash}%
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span>Equities: {results.profile.allocation.equities}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary" />
                        <span>Bonds: {results.profile.allocation.bonds}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent" />
                        <span>Alternatives: {results.profile.allocation.alternatives}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-muted" />
                        <span>Cash: {results.profile.allocation.cash}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-chart-1" />
                    Suitable For
                  </CardTitle>
                  <CardDescription>
                    This profile is typically appropriate for:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.profile.suitableFor.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-chart-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Funds Section */}
            <div className="mt-8 pt-8 border-t border-border">
              <RecommendedFunds 
                riskLevel={results.profile.level} 
                profileName={results.profile.name} 
              />
            </div>

            <p className="text-xs text-muted-foreground mt-6 text-center">
              This assessment is for guidance purposes only and should be used as part of a comprehensive 
              suitability assessment. Individual circumstances may require adjustments to the suggested profile.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;
  const canProceed = isAnswered;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <Layout>
      <section className="py-16 lg:py-20 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-accent" />
              <span className="text-accent font-medium">Assessment Tool</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Risk Profiling Quiz
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Assess your client's risk capacity and tolerance to determine their suitable investment profile. 
              This questionnaire takes approximately 5 minutes to complete.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                {currentQ.category === "capacity" && <Clock className="h-4 w-4" />}
                {currentQ.category === "tolerance" && <Shield className="h-4 w-4" />}
                {currentQ.category === "goals" && <Target className="h-4 w-4" />}
                <span className="capitalize">{currentQ.category === "capacity" ? "Risk Capacity" : currentQ.category === "tolerance" ? "Risk Tolerance" : "Investment Goals"}</span>
              </div>
              <CardTitle className="text-xl">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQ.id]?.toString() || ""}
                onValueChange={(value) => handleAnswer(currentQ.id, parseInt(value))}
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                      answers[currentQ.id] === option.score
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleAnswer(currentQ.id, option.score)}
                  >
                    <RadioGroupItem value={option.score.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {isLastQuestion ? (
                  <Button
                    onClick={handleNext}
                    disabled={!allAnswered}
                  >
                    View Results
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                  >
                    Next Question
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6">
            <Button variant="ghost" onClick={handleReset} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RiskProfilingQuiz;
