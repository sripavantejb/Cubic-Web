import { ImageResponse } from "next/og";

export const alt = "Hazel India — AI-Powered Green Facility Management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1a12",
          color: "#f4f1e8",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#a9d6b5" }}>
          HAZEL INDIA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, letterSpacing: -2, fontWeight: 500 }}>
            Cleaner spaces. Greener India.
          </div>
          <div style={{ fontSize: 28, color: "#a9d6b5" }}>
            India&apos;s first AI-native green facility company
          </div>
        </div>
      </div>
    ),
    size,
  );
}
