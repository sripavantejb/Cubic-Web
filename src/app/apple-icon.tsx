import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f3d2b",
          color: "#f4f1e8",
          fontSize: 64,
          fontWeight: 600,
        }}
      >
        HI
      </div>
    ),
    size,
  );
}
