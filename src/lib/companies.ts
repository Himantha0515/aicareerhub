import { COMPANIES as RAW } from "@/data/companies";
import type { Company, CompanyType } from "@/lib/company-types";

export type { Company, CompanyType, AtsType, CompanyFocus } from "@/lib/company-types";

export const COMPANIES: Company[] = RAW;

export function getFetchableCompanies(): Company[] {
  const seen = new Set<string>();
  const out: Company[] = [];
  for (const c of COMPANIES) {
    if (c.ats === "custom" || !c.boardToken) continue;
    const key = `${c.ats}:${c.boardToken.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
}

export function getCompaniesByType(type: CompanyType): Company[] {
  return COMPANIES.filter((c) => c.type === type);
}
