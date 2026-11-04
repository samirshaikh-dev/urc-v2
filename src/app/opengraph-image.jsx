import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const alt = "United Rubber Cork — Engineered Cork Solutions for Industry";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBuffer = await readFile(
    join(process.cwd(), "public", "united-rubber-cork-logo.png")
  );
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFB",
          position: "relative",
          padding: "40px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top Maroon Accent Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#650510",
          }}
        />

        {/* Top Orange Accent Line */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: "#F58634",
          }}
        />

        {/* Brand Logo Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="United Rubber Cork"
            width={500}
            height={250}
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        {/* Tagline Pill Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F4EBEC",
            border: "1px solid #DCB4B9",
            borderRadius: "9999px",
            paddingLeft: "26px",
            paddingRight: "26px",
            paddingTop: "8px",
            paddingBottom: "8px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#650510",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Engineered Cork Solutions for Industry
          </span>
        </div>

        {/* Key Product Offerings Subtitle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "17px",
            fontWeight: 400,
            color: "#4B505A",
            marginBottom: "36px",
          }}
        >
          Natural Cork Sheets &amp; Rolls &nbsp;•&nbsp; Rubberised Cork Gaskets &nbsp;•&nbsp; Precision Components
        </div>

        {/* Footer Facility & Standards Trust Bar */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "80px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTop: "1px solid #E5E7EB",
            paddingTop: "16px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#828791",
          }}
        >
          Direct Manufacturing Plant: GIDC Vapi, Gujarat &nbsp;|&nbsp; Conforms to IS: 4253 &amp; ASTM Standards
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

