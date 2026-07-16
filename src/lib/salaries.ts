export type SalaryRange = { avgLPA: number; highLPA: number };

export type CityBreakdown = {
  city: string;
  service: SalaryRange;
  product: SalaryRange;
};

export type CompanyExample = {
  name: string;
  type: "service" | "product";
  avgLPA: number;
};

export type GrowthPoint = {
  year: string;
  service: number;
  product: number;
};

export type ExperienceLevel = "fresher" | "mid" | "senior";

export type RoleSalaryTier = {
  level: ExperienceLevel;
  label: string;
  yearsRange: string;
  service: SalaryRange;
  product: SalaryRange;
};

export type RoleSalary = {
  roleSlug: string;
  tiers: RoleSalaryTier[];
  cities: CityBreakdown[];
  exampleCompanies: CompanyExample[];
  growthTrajectory: GrowthPoint[];
  source: string;
  lastVerified: string;
  disclaimer: string;
};

const COMMON_DISCLAIMER =
  "These are estimated ranges compiled from AmbitionBox, Glassdoor and Levels.fyi as of early 2025. Actual compensation varies by company, team, negotiation and equity. Use as directional guidance, not a precise benchmark.";

export const SALARY_DATA: RoleSalary[] = [
  {
    roleSlug: "ml-engineer",
    tiers: [
      { level: "fresher", label: "Fresher (0–2 yrs)", yearsRange: "0–2", service: { avgLPA: 6, highLPA: 10 }, product: { avgLPA: 12, highLPA: 22 } },
      { level: "mid", label: "Mid (2–5 yrs)", yearsRange: "2–5", service: { avgLPA: 10, highLPA: 16 }, product: { avgLPA: 20, highLPA: 35 } },
      { level: "senior", label: "Senior (5+ yrs)", yearsRange: "5+", service: { avgLPA: 16, highLPA: 25 }, product: { avgLPA: 30, highLPA: 55 } },
    ],
    cities: [
      { city: "Bengaluru", service: { avgLPA: 11, highLPA: 18 }, product: { avgLPA: 22, highLPA: 45 } },
      { city: "Hyderabad", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 18, highLPA: 38 } },
      { city: "Pune", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 16, highLPA: 32 } },
      { city: "Delhi NCR", service: { avgLPA: 10, highLPA: 16 }, product: { avgLPA: 20, highLPA: 40 } },
      { city: "Chennai", service: { avgLPA: 8, highLPA: 13 }, product: { avgLPA: 15, highLPA: 30 } },
      { city: "Remote", service: { avgLPA: 10, highLPA: 16 }, product: { avgLPA: 22, highLPA: 50 } },
    ],
    exampleCompanies: [
      { name: "TCS", type: "service", avgLPA: 8 },
      { name: "Infosys", type: "service", avgLPA: 9 },
      { name: "Wipro", type: "service", avgLPA: 7 },
      { name: "Google", type: "product", avgLPA: 35 },
      { name: "Microsoft", type: "product", avgLPA: 28 },
      { name: "Flipkart", type: "product", avgLPA: 25 },
      { name: "Swiggy", type: "product", avgLPA: 22 },
    ],
    growthTrajectory: [
      { year: "Year 0", service: 6, product: 12 },
      { year: "Year 2", service: 10, product: 20 },
      { year: "Year 5", service: 16, product: 30 },
      { year: "Year 8", service: 22, product: 45 },
      { year: "Year 10+", service: 25, product: 55 },
    ],
    source: "AmbitionBox, Glassdoor, Levels.fyi",
    lastVerified: "Q1 2025",
    disclaimer: COMMON_DISCLAIMER,
  },

  {
    roleSlug: "ai-engineer",
    tiers: [
      { level: "fresher", label: "Fresher (0–2 yrs)", yearsRange: "0–2", service: { avgLPA: 5, highLPA: 9 }, product: { avgLPA: 14, highLPA: 25 } },
      { level: "mid", label: "Mid (2–4 yrs)", yearsRange: "2–4", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 22, highLPA: 40 } },
      { level: "senior", label: "Senior (4+ yrs)", yearsRange: "4+", service: { avgLPA: 14, highLPA: 22 }, product: { avgLPA: 32, highLPA: 60 } },
    ],
    cities: [
      { city: "Bengaluru", service: { avgLPA: 10, highLPA: 17 }, product: { avgLPA: 25, highLPA: 50 } },
      { city: "Hyderabad", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 20, highLPA: 40 } },
      { city: "Pune", service: { avgLPA: 7, highLPA: 12 }, product: { avgLPA: 18, highLPA: 35 } },
      { city: "Delhi NCR", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 22, highLPA: 42 } },
      { city: "Chennai", service: { avgLPA: 7, highLPA: 12 }, product: { avgLPA: 16, highLPA: 32 } },
      { city: "Remote", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 25, highLPA: 55 } },
    ],
    exampleCompanies: [
      { name: "TCS", type: "service", avgLPA: 7 },
      { name: "Infosys", type: "service", avgLPA: 8 },
      { name: "HCLTech", type: "service", avgLPA: 7 },
      { name: "Google", type: "product", avgLPA: 38 },
      { name: "Anthropic (remote)", type: "product", avgLPA: 50 },
      { name: "Razorpay", type: "product", avgLPA: 28 },
      { name: "Meesho", type: "product", avgLPA: 24 },
    ],
    growthTrajectory: [
      { year: "Year 0", service: 5, product: 14 },
      { year: "Year 2", service: 9, product: 22 },
      { year: "Year 4", service: 14, product: 32 },
      { year: "Year 7", service: 20, product: 48 },
      { year: "Year 10+", service: 22, product: 60 },
    ],
    source: "AmbitionBox, Glassdoor, Levels.fyi",
    lastVerified: "Q1 2025",
    disclaimer: COMMON_DISCLAIMER,
  },

  {
    roleSlug: "data-scientist",
    tiers: [
      { level: "fresher", label: "Fresher (0–2 yrs)", yearsRange: "0–2", service: { avgLPA: 5, highLPA: 8 }, product: { avgLPA: 10, highLPA: 18 } },
      { level: "mid", label: "Mid (2–5 yrs)", yearsRange: "2–5", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 16, highLPA: 30 } },
      { level: "senior", label: "Senior (5+ yrs)", yearsRange: "5+", service: { avgLPA: 14, highLPA: 22 }, product: { avgLPA: 25, highLPA: 45 } },
    ],
    cities: [
      { city: "Bengaluru", service: { avgLPA: 9, highLPA: 16 }, product: { avgLPA: 18, highLPA: 38 } },
      { city: "Hyderabad", service: { avgLPA: 7, highLPA: 13 }, product: { avgLPA: 14, highLPA: 30 } },
      { city: "Pune", service: { avgLPA: 7, highLPA: 12 }, product: { avgLPA: 13, highLPA: 28 } },
      { city: "Delhi NCR", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 16, highLPA: 32 } },
      { city: "Chennai", service: { avgLPA: 6, highLPA: 11 }, product: { avgLPA: 12, highLPA: 25 } },
      { city: "Remote", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 18, highLPA: 40 } },
    ],
    exampleCompanies: [
      { name: "TCS", type: "service", avgLPA: 7 },
      { name: "Mu Sigma", type: "service", avgLPA: 6 },
      { name: "Fractal Analytics", type: "service", avgLPA: 10 },
      { name: "Amazon", type: "product", avgLPA: 25 },
      { name: "Flipkart", type: "product", avgLPA: 22 },
      { name: "PhonePe", type: "product", avgLPA: 20 },
    ],
    growthTrajectory: [
      { year: "Year 0", service: 5, product: 10 },
      { year: "Year 2", service: 8, product: 16 },
      { year: "Year 5", service: 14, product: 25 },
      { year: "Year 8", service: 20, product: 38 },
      { year: "Year 10+", service: 22, product: 45 },
    ],
    source: "AmbitionBox, Glassdoor, Levels.fyi",
    lastVerified: "Q1 2025",
    disclaimer: COMMON_DISCLAIMER,
  },

  {
    roleSlug: "mlops-engineer",
    tiers: [
      { level: "fresher", label: "Fresher (0–2 yrs)", yearsRange: "0–2", service: { avgLPA: 5, highLPA: 9 }, product: { avgLPA: 10, highLPA: 18 } },
      { level: "mid", label: "Mid (2–5 yrs)", yearsRange: "2–5", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 18, highLPA: 30 } },
      { level: "senior", label: "Senior (5+ yrs)", yearsRange: "5+", service: { avgLPA: 15, highLPA: 22 }, product: { avgLPA: 28, highLPA: 48 } },
    ],
    cities: [
      { city: "Bengaluru", service: { avgLPA: 10, highLPA: 16 }, product: { avgLPA: 20, highLPA: 40 } },
      { city: "Hyderabad", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 16, highLPA: 32 } },
      { city: "Pune", service: { avgLPA: 7, highLPA: 12 }, product: { avgLPA: 15, highLPA: 28 } },
      { city: "Delhi NCR", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 18, highLPA: 35 } },
      { city: "Chennai", service: { avgLPA: 7, highLPA: 12 }, product: { avgLPA: 14, highLPA: 26 } },
      { city: "Remote", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 20, highLPA: 42 } },
    ],
    exampleCompanies: [
      { name: "Infosys", type: "service", avgLPA: 8 },
      { name: "Wipro", type: "service", avgLPA: 7 },
      { name: "Cognizant", type: "service", avgLPA: 8 },
      { name: "Microsoft", type: "product", avgLPA: 26 },
      { name: "Walmart Labs", type: "product", avgLPA: 22 },
      { name: "Ola", type: "product", avgLPA: 20 },
    ],
    growthTrajectory: [
      { year: "Year 0", service: 5, product: 10 },
      { year: "Year 2", service: 9, product: 18 },
      { year: "Year 5", service: 15, product: 28 },
      { year: "Year 8", service: 20, product: 40 },
      { year: "Year 10+", service: 22, product: 48 },
    ],
    source: "AmbitionBox, Glassdoor, Levels.fyi",
    lastVerified: "Q1 2025",
    disclaimer: COMMON_DISCLAIMER,
  },

  {
    roleSlug: "data-engineer",
    tiers: [
      { level: "fresher", label: "Fresher (0–2 yrs)", yearsRange: "0–2", service: { avgLPA: 5, highLPA: 8 }, product: { avgLPA: 10, highLPA: 16 } },
      { level: "mid", label: "Mid (2–5 yrs)", yearsRange: "2–5", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 16, highLPA: 28 } },
      { level: "senior", label: "Senior (5+ yrs)", yearsRange: "5+", service: { avgLPA: 14, highLPA: 20 }, product: { avgLPA: 25, highLPA: 42 } },
    ],
    cities: [
      { city: "Bengaluru", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 18, highLPA: 35 } },
      { city: "Hyderabad", service: { avgLPA: 7, highLPA: 13 }, product: { avgLPA: 15, highLPA: 28 } },
      { city: "Pune", service: { avgLPA: 7, highLPA: 12 }, product: { avgLPA: 14, highLPA: 26 } },
      { city: "Delhi NCR", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 16, highLPA: 30 } },
      { city: "Chennai", service: { avgLPA: 6, highLPA: 11 }, product: { avgLPA: 13, highLPA: 24 } },
      { city: "Remote", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 18, highLPA: 38 } },
    ],
    exampleCompanies: [
      { name: "TCS", type: "service", avgLPA: 6 },
      { name: "Infosys", type: "service", avgLPA: 7 },
      { name: "Tech Mahindra", type: "service", avgLPA: 6 },
      { name: "Amazon", type: "product", avgLPA: 24 },
      { name: "Flipkart", type: "product", avgLPA: 20 },
      { name: "Uber", type: "product", avgLPA: 22 },
    ],
    growthTrajectory: [
      { year: "Year 0", service: 5, product: 10 },
      { year: "Year 2", service: 8, product: 16 },
      { year: "Year 5", service: 14, product: 25 },
      { year: "Year 8", service: 18, product: 35 },
      { year: "Year 10+", service: 20, product: 42 },
    ],
    source: "AmbitionBox, Glassdoor, Levels.fyi",
    lastVerified: "Q1 2025",
    disclaimer: COMMON_DISCLAIMER,
  },

  {
    roleSlug: "nlp-engineer",
    tiers: [
      { level: "fresher", label: "Fresher (0–2 yrs)", yearsRange: "0–2", service: { avgLPA: 5, highLPA: 9 }, product: { avgLPA: 11, highLPA: 20 } },
      { level: "mid", label: "Mid (2–5 yrs)", yearsRange: "2–5", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 18, highLPA: 32 } },
      { level: "senior", label: "Senior (5+ yrs)", yearsRange: "5+", service: { avgLPA: 15, highLPA: 22 }, product: { avgLPA: 28, highLPA: 50 } },
    ],
    cities: [
      { city: "Bengaluru", service: { avgLPA: 10, highLPA: 16 }, product: { avgLPA: 20, highLPA: 42 } },
      { city: "Hyderabad", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 16, highLPA: 34 } },
      { city: "Pune", service: { avgLPA: 7, highLPA: 12 }, product: { avgLPA: 15, highLPA: 30 } },
      { city: "Delhi NCR", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 18, highLPA: 36 } },
      { city: "Chennai", service: { avgLPA: 7, highLPA: 12 }, product: { avgLPA: 14, highLPA: 28 } },
      { city: "Remote", service: { avgLPA: 9, highLPA: 15 }, product: { avgLPA: 22, highLPA: 48 } },
    ],
    exampleCompanies: [
      { name: "Infosys", type: "service", avgLPA: 8 },
      { name: "Wipro", type: "service", avgLPA: 7 },
      { name: "Google", type: "product", avgLPA: 32 },
      { name: "Microsoft", type: "product", avgLPA: 28 },
      { name: "Sharechat", type: "product", avgLPA: 22 },
    ],
    growthTrajectory: [
      { year: "Year 0", service: 5, product: 11 },
      { year: "Year 2", service: 9, product: 18 },
      { year: "Year 5", service: 15, product: 28 },
      { year: "Year 8", service: 20, product: 42 },
      { year: "Year 10+", service: 22, product: 50 },
    ],
    source: "AmbitionBox, Glassdoor, Levels.fyi",
    lastVerified: "Q1 2025",
    disclaimer: COMMON_DISCLAIMER,
  },

  {
    roleSlug: "computer-vision-engineer",
    tiers: [
      { level: "fresher", label: "Fresher (0–2 yrs)", yearsRange: "0–2", service: { avgLPA: 5, highLPA: 9 }, product: { avgLPA: 10, highLPA: 18 } },
      { level: "mid", label: "Mid (2–5 yrs)", yearsRange: "2–5", service: { avgLPA: 9, highLPA: 14 }, product: { avgLPA: 17, highLPA: 30 } },
      { level: "senior", label: "Senior (5+ yrs)", yearsRange: "5+", service: { avgLPA: 14, highLPA: 22 }, product: { avgLPA: 26, highLPA: 48 } },
    ],
    cities: [
      { city: "Bengaluru", service: { avgLPA: 10, highLPA: 16 }, product: { avgLPA: 19, highLPA: 40 } },
      { city: "Hyderabad", service: { avgLPA: 8, highLPA: 13 }, product: { avgLPA: 15, highLPA: 32 } },
      { city: "Pune", service: { avgLPA: 7, highLPA: 12 }, product: { avgLPA: 14, highLPA: 28 } },
      { city: "Delhi NCR", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 17, highLPA: 34 } },
      { city: "Chennai", service: { avgLPA: 7, highLPA: 12 }, product: { avgLPA: 13, highLPA: 26 } },
      { city: "Remote", service: { avgLPA: 9, highLPA: 14 }, product: { avgLPA: 20, highLPA: 44 } },
    ],
    exampleCompanies: [
      { name: "TCS", type: "service", avgLPA: 7 },
      { name: "HCLTech", type: "service", avgLPA: 7 },
      { name: "Qualcomm", type: "product", avgLPA: 24 },
      { name: "Samsung R&D", type: "product", avgLPA: 20 },
      { name: "Ather Energy", type: "product", avgLPA: 18 },
    ],
    growthTrajectory: [
      { year: "Year 0", service: 5, product: 10 },
      { year: "Year 2", service: 9, product: 17 },
      { year: "Year 5", service: 14, product: 26 },
      { year: "Year 8", service: 18, product: 38 },
      { year: "Year 10+", service: 22, product: 48 },
    ],
    source: "AmbitionBox, Glassdoor, Levels.fyi",
    lastVerified: "Q1 2025",
    disclaimer: COMMON_DISCLAIMER,
  },

  {
    roleSlug: "research-scientist",
    tiers: [
      { level: "fresher", label: "Post-PhD (0–3 yrs)", yearsRange: "0–3", service: { avgLPA: 8, highLPA: 14 }, product: { avgLPA: 18, highLPA: 35 } },
      { level: "mid", label: "Mid (3–7 yrs)", yearsRange: "3–7", service: { avgLPA: 14, highLPA: 22 }, product: { avgLPA: 30, highLPA: 55 } },
      { level: "senior", label: "Senior (7+ yrs)", yearsRange: "7+", service: { avgLPA: 22, highLPA: 35 }, product: { avgLPA: 45, highLPA: 80 } },
    ],
    cities: [
      { city: "Bengaluru", service: { avgLPA: 14, highLPA: 22 }, product: { avgLPA: 30, highLPA: 60 } },
      { city: "Hyderabad", service: { avgLPA: 12, highLPA: 18 }, product: { avgLPA: 25, highLPA: 50 } },
      { city: "Pune", service: { avgLPA: 10, highLPA: 16 }, product: { avgLPA: 22, highLPA: 42 } },
      { city: "Delhi NCR", service: { avgLPA: 12, highLPA: 20 }, product: { avgLPA: 28, highLPA: 55 } },
      { city: "Chennai", service: { avgLPA: 10, highLPA: 16 }, product: { avgLPA: 20, highLPA: 40 } },
      { city: "Remote", service: { avgLPA: 14, highLPA: 22 }, product: { avgLPA: 35, highLPA: 75 } },
    ],
    exampleCompanies: [
      { name: "TCS Research", type: "service", avgLPA: 14 },
      { name: "Infosys Research", type: "service", avgLPA: 12 },
      { name: "Google DeepMind", type: "product", avgLPA: 50 },
      { name: "Microsoft Research", type: "product", avgLPA: 40 },
      { name: "Meta FAIR", type: "product", avgLPA: 45 },
    ],
    growthTrajectory: [
      { year: "Year 0", service: 8, product: 18 },
      { year: "Year 3", service: 14, product: 30 },
      { year: "Year 5", service: 18, product: 40 },
      { year: "Year 7", service: 22, product: 50 },
      { year: "Year 10+", service: 35, product: 80 },
    ],
    source: "AmbitionBox, Glassdoor, Levels.fyi",
    lastVerified: "Q1 2025",
    disclaimer: COMMON_DISCLAIMER,
  },
];

export function getSalaryData(roleSlug: string): RoleSalary | undefined {
  return SALARY_DATA.find((s) => s.roleSlug === roleSlug);
}
