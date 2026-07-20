import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser tab favicon — brand mark (replaces default Vercel triangle). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0c2d6b 0%, #1e40af 50%, #e8541e 100%)",
          borderRadius: 8,
          color: "white",
          fontSize: 16,
          fontWeight: 800,
          fontFamily: "Arial, sans-serif",
          letterSpacing: -0.5,
        }}
      >
        AI
      </div>
    ),
    { ...size },
  );
}
