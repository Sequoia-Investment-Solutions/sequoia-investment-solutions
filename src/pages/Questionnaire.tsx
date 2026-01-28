import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Target, 
  Clock, 
  TrendingUp,
  Shield,
  Leaf,
  PiggyBank,
  RotateCcw,
  Download,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

// Question types
interface Question {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: "single" | "multiple";
  options: {
    value: string;
    label: string;
    description?: string;
    score: {
      growth: number;
      income: number;
      defensive: number;
      esg: number;
    };
  }[];
}

// Fund recommendation type
interface FundRecommendation {
  name: string;
  ticker: string;
  riskLevel: number;
  category: string;
  description: string;
  matchScore: number;
  keyFeatures: string[];
}

const questions: Question[] = [
  {
    id: "objective",
    title: "What is the primary investment objective?",
    description: "Select the main goal for this investment",
    icon: <Target className="h-6 w-6" />,
    type: "single",
    options: [
      {
        value: "capital-growth",
        label: "Capital Growth",
        description: "Maximise long-term capital appreciation",
        score: { growth: 3, income: 0, defensive: 0, esg: 0 }
      },
      {
        value: "income-generation",
        label: "Income Generation",
        description: "Generate regular income from investments",
        score: { growth: 0, income: 3, defensive: 1, esg: 0 }
      },
      {
        value: "balanced",
        label: "Balanced Growth & Income",
        description: "Combination of growth and income",
        score: { growth: 2, income: 2, defensive: 1, esg: 0 }
      },
      {
        value: "capital-preservation",
        label: "Capital Preservation",
        description: "Protect capital with modest returns",
        score: { growth: 0, income: 1, defensive: 3, esg: 0 }
      }
    ]
  },
  {
    id: "timeHorizon",
    title: "What is the investment time horizon?",
    description: "How long will the client remain invested?",
    icon: <Clock className="h-6 w-6" />,
    type: "single",
    options: [
      {
        value: "short",
        label: "Short Term (1-3 years)",
        description: "Near-term liquidity needs",
        score: { growth: 0, income: 1, defensive: 3, esg: 0 }
      },
      {
        value: "medium",
        label: "Medium Term (3-7 years)",
        description: "Moderate investment period",
        score: { growth: 1, income: 2, defensive: 1, esg: 0 }
      },
      {
        value: "long",
        label: "Long Term (7-15 years)",
        description: "Extended growth opportunity",
        score: { growth: 2, income: 1, defensive: 0, esg: 0 }
      },
      {
        value: "very-long",
        label: "Very Long Term (15+ years)",
        description: "Maximum compounding potential",
        score: { growth: 3, income: 0, defensive: 0, esg: 0 }
      }
    ]
  },
  {
    id: "riskTolerance",
    title: "What is the client's risk tolerance?",
    description: "How would they react to a 20% portfolio decline?",
    icon: <Shield className="h-6 w-6" />,
    type: "single",
    options: [
      {
        value: "conservative",
        label: "Conservative",
        description: "Would be very concerned and consider selling",
        score: { growth: 0, income: 1, defensive: 3, esg: 0 }
      },
      {
        value: "moderate-conservative",
        label: "Moderately Conservative",
        description: "Would be uncomfortable but stay invested",
        score: { growth: 1, income: 2, defensive: 2, esg: 0 }
      },
      {
        value: "moderate",
        label: "Moderate",
        description: "Understands volatility is part of investing",
        score: { growth: 2, income: 1, defensive: 1, esg: 0 }
      },
      {
        value: "aggressive",
        label: "Aggressive",
        description: "Would view it as a buying opportunity",
        score: { growth: 3, income: 0, defensive: 0, esg: 0 }
      }
    ]
  },
  {
    id: "incomeNeeds",
    title: "What are the income requirements?",
    description: "Does the client need regular income withdrawals?",
    icon: <PiggyBank className="h-6 w-6" />,
    type: "single",
    options: [
      {
        value: "no-income",
        label: "No Income Required",
        description: "All returns can be reinvested",
        score: { growth: 2, income: 0, defensive: 0, esg: 0 }
      },
      {
        value: "low-income",
        label: "Low Income (1-3% p.a.)",
        description: "Minimal income needs",
        score: { growth: 1, income: 1, defensive: 0, esg: 0 }
      },
      {
        value: "moderate-income",
        label: "Moderate Income (3-5% p.a.)",
        description: "Regular income requirements",
        score: { growth: 0, income: 2, defensive: 1, esg: 0 }
      },
      {
        value: "high-income",
        label: "High Income (5%+ p.a.)",
        description: "Significant income dependency",
        score: { growth: 0, income: 3, defensive: 1, esg: 0 }
      }
    ]
  },
  {
    id: "esgPreference",
    title: "Are ESG considerations important?",
    description: "Does the client have sustainability preferences?",
    icon: <Leaf className="h-6 w-6" />,
    type: "single",
    options: [
      {
        value: "not-important",
        label: "Not a Priority",
        description: "Focus purely on financial returns",
        score: { growth: 0, income: 0, defensive: 0, esg: 0 }
      },
      {
        value: "somewhat-important",
        label: "Nice to Have",
        description: "Consider ESG where it doesn't impact returns",
        score: { growth: 0, income: 0, defensive: 0, esg: 1 }
      },
      {
        value: "important",
        label: "Important",
        description: "ESG integration is a key factor",
        score: { growth: 0, income: 0, defensive: 0, esg: 2 }
      },
      {
        value: "essential",
        label: "Essential",
        description: "Must be a dedicated ESG/sustainable fund",
        score: { growth: 0, income: 0, defensive: 0, esg: 3 }
      }
    ]
  },
  {
    id: "investmentSize",
    title: "What is the anticipated investment size?",
    description: "This helps determine suitable fund options",
    icon: <TrendingUp className="h-6 w-6" />,
    type: "single",
    options: [
      {
        value: "under-100k",
        label: "Under £100,000",
        description: "Retail portfolio range",
        score: { growth: 0, income: 0, defensive: 0, esg: 0 }
      },
      {
        value: "100k-500k",
        label: "£100,000 - £500,000",
        description: "Standard portfolio range",
        score: { growth: 0, income: 0, defensive: 0, esg: 0 }
      },
      {
        value: "500k-1m",
        label: "£500,000 - £1,000,000",
        description: "Enhanced service eligibility",
        score: { growth: 0, income: 0, defensive: 0, esg: 0 }
      },
      {
        value: "over-1m",
        label: "Over £1,000,000",
        description: "Institutional/bespoke solutions",
        score: { growth: 0, income: 0, defensive: 0, esg: 0 }
      }
    ]
  }
];

// Available funds database
const availableFunds: FundRecommendation[] = [
  {
    name: "Sequoia Growth Portfolio",
    ticker: "SQGP",
    riskLevel: 5,
    category: "Growth",
    description: "Aggressive growth strategy focused on global equities with tactical allocation to emerging markets.",
    matchScore: 0,
    keyFeatures: ["Global equity focus", "Emerging market exposure", "Active management", "Long-term capital appreciation"]
  },
  {
    name: "Sequoia Balanced Portfolio",
    ticker: "SQBP",
    riskLevel: 3,
    category: "Balanced",
    description: "Multi-asset approach balancing growth potential with income generation and capital preservation.",
    matchScore: 0,
    keyFeatures: ["60/40 equity-bond split", "Quarterly rebalancing", "Dividend focus", "Moderate volatility"]
  },
  {
    name: "Sequoia Income Portfolio",
    ticker: "SQIP",
    riskLevel: 2,
    category: "Income",
    description: "Income-focused strategy prioritising regular distributions through bonds and dividend equities.",
    matchScore: 0,
    keyFeatures: ["Monthly income", "Investment grade bonds", "Dividend aristocrats", "4-5% target yield"]
  },
  {
    name: "Sequoia Defensive Portfolio",
    ticker: "SQDP",
    riskLevel: 1,
    category: "Defensive",
    description: "Capital preservation focus with emphasis on quality fixed income and defensive equities.",
    matchScore: 0,
    keyFeatures: ["Capital preservation", "Low volatility", "Government bonds", "Defensive sectors"]
  },
  {
    name: "Sequoia Sustainable Growth",
    ticker: "SQSG",
    riskLevel: 4,
    category: "ESG Growth",
    description: "ESG-integrated growth strategy investing in companies with strong sustainability credentials.",
    matchScore: 0,
    keyFeatures: ["ESG integration", "Impact reporting", "Climate-aware", "UN SDG alignment"]
  },
  {
    name: "Sequoia Sustainable Income",
    ticker: "SQSI",
    riskLevel: 2,
    category: "ESG Income",
    description: "Sustainable income strategy combining ESG principles with stable income generation.",
    matchScore: 0,
    keyFeatures: ["Green bonds", "ESG equity income", "Quarterly distributions", "Sustainability focus"]
  }
];

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleSingleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultipleAnswer = (questionId: string, value: string, checked: boolean) => {
    setAnswers(prev => {
      const current = (prev[questionId] as string[]) || [];
      if (checked) {
        return { ...prev, [questionId]: [...current, value] };
      } else {
        return { ...prev, [questionId]: current.filter(v => v !== value) };
      }
    });
  };

  const canProceed = () => {
    const currentQuestion = questions[currentStep];
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "single") {
      return !!answer;
    }
    return Array.isArray(answer) && answer.length > 0;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
  };

  // Calculate recommendations based on answers
  const recommendations = useMemo(() => {
    if (!isComplete) return [];

    // Calculate total scores
    let totalScores = { growth: 0, income: 0, defensive: 0, esg: 0 };

    questions.forEach(question => {
      const answer = answers[question.id];
      if (typeof answer === "string") {
        const option = question.options.find(o => o.value === answer);
        if (option) {
          totalScores.growth += option.score.growth;
          totalScores.income += option.score.income;
          totalScores.defensive += option.score.defensive;
          totalScores.esg += option.score.esg;
        }
      }
    });

    // Calculate match scores for each fund
    const scoredFunds = availableFunds.map(fund => {
      let matchScore = 0;

      // Growth alignment
      if (fund.category.includes("Growth") && totalScores.growth > totalScores.income && totalScores.growth > totalScores.defensive) {
        matchScore += totalScores.growth * 10;
      }

      // Income alignment
      if (fund.category.includes("Income") && totalScores.income >= totalScores.growth) {
        matchScore += totalScores.income * 10;
      }

      // Defensive alignment
      if (fund.category === "Defensive" && totalScores.defensive > totalScores.growth) {
        matchScore += totalScores.defensive * 10;
      }

      // Balanced alignment
      if (fund.category === "Balanced" && Math.abs(totalScores.growth - totalScores.income) <= 2) {
        matchScore += 25;
      }

      // ESG preference bonus
      if (fund.category.includes("ESG") && totalScores.esg >= 2) {
        matchScore += totalScores.esg * 15;
      } else if (!fund.category.includes("ESG") && totalScores.esg < 2) {
        matchScore += 10;
      }

      return { ...fund, matchScore };
    });

    // Sort by match score and return top 3
    return scoredFunds
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }, [answers, isComplete]);

  const currentQuestion = questions[currentStep];

  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Fund Recommendation Questionnaire
            </h1>
            <p className="text-lg text-muted-foreground">
              Answer a few questions about your client's needs and we'll recommend 
              the most suitable portfolio solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {!isComplete ? (
              <>
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Question {currentStep + 1} of {questions.length}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {Math.round(progress)}% Complete
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Question Card */}
                <Card className="border-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {currentQuestion.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
                        <CardDescription>{currentQuestion.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {currentQuestion.type === "single" ? (
                      <RadioGroup
                        value={answers[currentQuestion.id] as string || ""}
                        onValueChange={(value) => handleSingleAnswer(currentQuestion.id, value)}
                        className="space-y-3"
                      >
                        {currentQuestion.options.map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                              answers[currentQuestion.id] === option.value
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            }`}
                          >
                            <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={option.value} className="text-base font-medium cursor-pointer">
                                {option.label}
                              </Label>
                              {option.description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {option.description}
                                </p>
                              )}
                            </div>
                          </label>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="space-y-3">
                        {currentQuestion.options.map((option) => {
                          const isChecked = ((answers[currentQuestion.id] as string[]) || []).includes(option.value);
                          return (
                            <label
                              key={option.value}
                              className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                                isChecked ? "border-primary bg-primary/5" : "border-border"
                              }`}
                            >
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => 
                                  handleMultipleAnswer(currentQuestion.id, option.value, checked as boolean)
                                }
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <span className="text-base font-medium">{option.label}</span>
                                {option.description && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {option.description}
                                  </p>
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="gap-2"
                      >
                        {currentStep === questions.length - 1 ? (
                          <>Get Recommendations <CheckCircle2 className="h-4 w-4" /></>
                        ) : (
                          <>Next <ArrowRight className="h-4 w-4" /></>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Results Section */
              <div className="space-y-8">
                {/* Success Header */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Your Personalised Recommendations
                  </h2>
                  <p className="text-muted-foreground">
                    Based on your client's profile, we recommend the following portfolios
                  </p>
                </div>

                {/* Recommendations */}
                <div className="space-y-4">
                  {recommendations.map((fund, index) => (
                    <Card key={fund.ticker} className={`border-2 ${index === 0 ? "border-accent" : "border-border"}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {index === 0 && (
                                <span className="px-2 py-0.5 text-xs font-semibold bg-accent text-accent-foreground rounded">
                                  Best Match
                                </span>
                              )}
                              <span className="text-sm text-muted-foreground">{fund.ticker}</span>
                            </div>
                            <h3 className="text-xl font-bold text-foreground">{fund.name}</h3>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Match Score</div>
                            <div className="text-2xl font-bold text-primary">
                              {Math.min(Math.round((fund.matchScore / 50) * 100), 100)}%
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{fund.description}</p>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-muted-foreground">Risk Level:</span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`w-2 h-4 rounded-sm ${
                                    level <= fund.riskLevel ? "bg-primary" : "bg-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                            {fund.category}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {fund.keyFeatures.map((feature, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={handleRestart} className="gap-2">
                    <RotateCcw className="h-4 w-4" /> Start New Assessment
                  </Button>
                  <Button asChild className="gap-2">
                    <Link to="/fund-comparison">
                      Compare These Funds <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Contact CTA */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Need More Guidance?</h3>
                    <p className="text-primary-foreground/80 mb-4">
                      Our investment consultants are available to discuss these recommendations 
                      and help you find the perfect solution for your client.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="secondary" asChild className="gap-2">
                        <Link to="/contact">
                          <Mail className="h-4 w-4" /> Contact Us
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                      >
                        <Download className="h-4 w-4" /> Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
