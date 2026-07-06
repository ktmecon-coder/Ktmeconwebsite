import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { box: "w-8 h-8", text: "text-base", sub: "text-[7px]", gap: "gap-2" },
    md: { box: "w-10 h-10", text: "text-lg", sub: "text-[9px]", gap: "gap-3" },
    lg: { box: "w-14 h-14", text: "text-2xl", sub: "text-[11px]", gap: "gap-4" },
  };

  const dims = sizeMap[size];

  return (
    <div className={`flex items-center ${dims.gap} ${className}`} id="ke-brand-logo">
      {/* Red logo mark matching the uploaded image of "ΚΣ" */}
      <div className={`${dims.box} bg-[#B91C1C] flex items-center justify-center shrink-0 shadow-sm`} id="ke-logo-box">
        <span className="font-serif font-bold text-white leading-none tracking-tight select-none" style={{ fontSize: size === "sm" ? "15px" : size === "md" ? "19px" : "28px" }}>
          ΚΣ
        </span>
      </div>
      {showText && (
        <div className="flex flex-col justify-center leading-none" id="ke-logo-text">
          <span className="font-serif font-extrabold text-[#111111] tracking-tight text-sm uppercase">
            Kathmandu
          </span>
          <span className="font-sans font-bold text-[#B91C1C] tracking-widest uppercase mt-0.5" style={{ fontSize: size === "sm" ? "7px" : size === "md" ? "8.5px" : "11px" }}>
            Economics
          </span>
        </div>
      )}
    </div>
  );
}
