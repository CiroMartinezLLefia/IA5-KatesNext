import React from "react";

interface BeerIllustrationProps {
  style: string;
  className?: string;
}

export default function BeerIllustration({ style, className = "w-24 h-24" }: BeerIllustrationProps) {
  let liquidColor = "#f59e0b";
  let foamColor = "#fef3c7";
  let labelColor = "#b45309";

  const lowerStyle = style.toLowerCase();
  if (lowerStyle.includes("blonde") || lowerStyle.includes("rossa")) {
    liquidColor = "#fbbf24";
    foamColor = "#fffbeb";
    labelColor = "#047857";
  } else if (lowerStyle.includes("double ipa") || lowerStyle.includes("tremenda")) {
    liquidColor = "#ea580c";
    foamColor = "#ffedd5";
    labelColor = "#991b1b";
  } else if (lowerStyle.includes("ipa")) {
    liquidColor = "#d97706";
    foamColor = "#fef3c7";
    labelColor = "#1e3a8a";
  } else if (lowerStyle.includes("stout") || lowerStyle.includes("porter") || lowerStyle.includes("negra")) {
    liquidColor = "#1a0f05";
    foamColor = "#d97706";
    labelColor = "#854d0e";
  } else if (lowerStyle.includes("pale ale")) {
    liquidColor = "#f59e0b";
    foamColor = "#fffdf5";
    labelColor = "#4b5563";
  }

  return (
    <div className={`relative flex items-center justify-center p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 overflow-hidden group ${className}`}>
      <div 
        className="absolute inset-0 opacity-10 blur-xl transition-all duration-500 group-hover:opacity-20"
        style={{ backgroundColor: liquidColor }}
      />
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
      >
        <path
          d="M30 20 L32 90 Q33 105 50 105 Q67 105 68 90 L70 20 Z"
          fill="#ffffff"
          fillOpacity="0.05"
          stroke="#52525b"
          strokeWidth="1.5"
        />
        <path
          d="M31 40 L32.3 90 Q33 103 50 103 Q67 103 67.7 90 L69 40 Z"
          fill={liquidColor}
        />
        <path
          d="M34 45 L35 85 Q35.5 95 45 96"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
        />
        <path
          d="M28 20 Q24 16 30 12 Q35 8 40 13 Q45 7 52 11 Q60 6 66 12 Q72 10 72 20 Q72 28 65 26 Q55 24 50 26 Q45 28 35 25 Q28 27 28 20 Z"
          fill={foamColor}
        />
        <circle cx="45" cy="50" r="1.5" fill="#ffffff" opacity="0.3" />
        <circle cx="55" cy="65" r="1" fill="#ffffff" opacity="0.4" />
        <circle cx="38" cy="75" r="1.2" fill="#ffffff" opacity="0.25" />
        <circle cx="62" cy="55" r="1.5" fill="#ffffff" opacity="0.35" />
        <circle cx="50" cy="85" r="1" fill="#ffffff" opacity="0.4" />
        <circle cx="42" cy="60" r="1" fill="#ffffff" opacity="0.2" />
        <path
          d="M66 25 L64.5 80"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.1"
        />
      </svg>
    </div>
  );
}
