export type CompanyType = "product" | "service";
export type AtsType = "greenhouse" | "lever" | "ashby" | "custom";
export type CompanyFocus = "ai" | "backend" | "both";

export type Company = {
  slug: string;
  name: string;
  type: CompanyType;
  /** Public ATS board when available; custom = careers page only (not auto-fetched). */
  ats: AtsType;
  boardToken?: string;
  careersUrl: string;
  focus: CompanyFocus;
};
