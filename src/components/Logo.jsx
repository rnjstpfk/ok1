// src/components/Logo.jsx
import logoUrl from "../assets/logo.png"; // 파일명/확장자에 맞게 수정

export default function Logo({ size = 40, rounded = false }) {
  return (
    <img
      src={logoUrl}
      alt="OK DRUGS"
      width={size}
      height={size}
      style={{
        display: "block",
        objectFit: "contain",
        borderRadius: rounded ? "50%" : 0
      }}
      draggable="false"
    />
  );
}
