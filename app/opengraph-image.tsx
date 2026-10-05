import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "نوستالژی مگ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#f4efe4", color: "#17130e", border: "24px solid #17130e", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 34, letterSpacing: 8 }}>مجله اینترنتی ایرانی</div>
      <div style={{ fontSize: 92, fontWeight: 900, marginTop: 24 }}>نوستالژی مگ</div>
      <div style={{ fontSize: 38, marginTop: 18 }}>اخبار مهمی که اصلاً مهم نیستند!</div>
    </div>,
    { ...size }
  );
}
