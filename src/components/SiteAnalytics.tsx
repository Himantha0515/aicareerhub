import { GoogleAnalytics } from "@next/third-parties/google";

/** GA4 measurement ID from env (e.g. G-XXXXXXXX). Empty = analytics off. */
export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return undefined;
  return id;
}

/** Renders GA4 only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set. */
export default function SiteAnalytics() {
  const gaId = getGaMeasurementId();
  if (!gaId) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
