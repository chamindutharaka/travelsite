import { ImageResponse } from "next/og";
import { company } from "@/content/company";

export const runtime = "edge";
export const alt = "Ceylon Holidays — Private, Tailor-Made Journeys Across Sri Lanka";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#12212E",
          backgroundImage: "linear-gradient(to bottom, #12212E, #0B131A)",
          color: "white",
          padding: "60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            letterSpacing: "6px",
            color: "#EA9527",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          {company.name} • GALLE, SRI LANKA
        </div>

        <div
          style={{
            fontSize: "54px",
            fontWeight: "bold",
            lineHeight: 1.2,
            maxWidth: "960px",
            color: "#FFFFFF",
            marginBottom: "24px",
            fontFamily: "Georgia, serif",
          }}
        >
          Private, Tailor-Made Journeys Across Sri Lanka
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#ECE7DC",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          Handcrafted around you with dedicated chauffeur-guides, boutique villas, and authentic local knowledge.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "40px",
            padding: "12px 32px",
            borderRadius: "9999px",
            backgroundColor: "#EA9527",
            color: "#12212E",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          ceylonholidays.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
