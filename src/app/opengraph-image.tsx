import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Royal Builders - Building Dreams Since 2010";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#081625",
          fontFamily: "Georgia, 'Times New Roman', serif",
          padding: 70,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 30,
            border: "2px solid rgba(196,30,42,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -150,
            width: 500,
            height: 500,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(196,30,42,0.25), transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 30,
            color: "#C41E2A",
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              border: "2px solid #C41E2A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            RG
          </div>
          Royal Builders
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, color: "#C41E2A", letterSpacing: 10, textTransform: "uppercase", marginBottom: 16 }}>
            Since 2010 · Chennai
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Building Dreams
            <br />
            <span style={{ color: "#C41E2A" }}>Since 2010</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 800,
              lineHeight: 1.5,
            }}
          >
            Construction · Interiors · Real Estate · Building Maintenance
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 3,
          }}
        >
          <span>+91 98409 51292</span>
          <span>{SITE.email}</span>
          <span>Chennai - 600039</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
