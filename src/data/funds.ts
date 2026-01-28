export interface Fund {
  id: string;
  name: string;
  category: string;
  riskLevel: number;
  ytdReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  aum: string;
  ocf: number;
  objective: string;
  assetAllocation: { equity: number; bonds: number; alternatives: number };
  factsheetUrl: string;
}

export const allFunds: Fund[] = [
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

export const riskLabels = ["Very Low", "Low", "Medium", "High", "Very High"];
