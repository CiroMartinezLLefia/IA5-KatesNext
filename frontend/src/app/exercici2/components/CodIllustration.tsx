import React from "react";

interface CodIllustrationProps {
  type: string;
  name: string;
  className?: string;
}

export default function CodIllustration({ type, name, className = "card-image-placeholder" }: CodIllustrationProps) {
  const lowerType = type.toLowerCase();
  const lowerName = name.toLowerCase();

  if (lowerType.includes("salat")) {
    return (
      <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#e2e8f0" />
        <defs>
          <linearGradient id="saltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
        <path d="M20 90 L180 90 L175 105 L25 105 Z" fill="#b45309" opacity="0.6" />
        <rect x="40" y="45" width="70" height="35" rx="4" fill="url(#saltGrad)" stroke="#94a3b8" strokeWidth="2" transform="rotate(-5, 75, 62)" />
        <circle cx="50" cy="50" r="1" fill="#ffffff" />
        <circle cx="65" cy="55" r="1.5" fill="#ffffff" />
        <circle cx="80" cy="48" r="1.2" fill="#ffffff" />
        <circle cx="95" cy="62" r="1" fill="#ffffff" />
        <circle cx="60" cy="70" r="1.5" fill="#ffffff" />
        <circle cx="85" cy="72" r="1.2" fill="#ffffff" />
        <rect x="95" y="50" width="65" height="30" rx="3" fill="url(#saltGrad)" stroke="#94a3b8" strokeWidth="1.5" transform="rotate(8, 127, 65)" />
        <circle cx="105" cy="55" r="1.2" fill="#ffffff" />
        <circle cx="120" cy="65" r="1" fill="#ffffff" />
        <circle cx="140" cy="62" r="1.5" fill="#ffffff" />
        <rect x="35" y="82" width="4" height="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" transform="rotate(45)" />
        <rect x="75" y="85" width="3" height="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
        <rect x="150" y="80" width="4" height="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" transform="rotate(20)" />
      </svg>
    );
  } else if (lowerType.includes("esqueixat")) {
    return (
      <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#f0fdf4" />
        <circle cx="100" cy="60" r="48" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="100" cy="60" r="38" fill="#fafafa" />
        <path d="M80 50 Q85 45 92 48" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        <path d="M110 52 Q118 58 122 50" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
        <path d="M85 70 Q95 72 102 68" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
        <path d="M100 80 Q108 75 115 82" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        <path d="M78 62 Q85 64 90 60" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
        <path d="M105 45 Q110 40 116 46" stroke="#f1f5f9" strokeWidth="5" strokeLinecap="round" />
        <circle cx="85" cy="55" r="4.5" fill="#1e293b" />
        <circle cx="85" cy="55" r="1.5" fill="#475569" />
        <circle cx="118" cy="68" r="4.5" fill="#1e293b" />
        <circle cx="118" cy="68" r="1.5" fill="#475569" />
        <path d="M92 42 Q96 46 94 54" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M102 74 Q108 72 104 80" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="95" cy="60" r="2" fill="#16a34a" />
        <circle cx="108" cy="52" r="1.5" fill="#16a34a" />
        <circle cx="80" cy="72" r="1.8" fill="#16a34a" />
        <path d="M75 50 Q100 35 125 65" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
    );
  } else if (lowerType.includes("fresc")) {
    return (
      <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#f0f9ff" />
        <path d="M10 100 L190 100 L180 115 L20 115 Z" fill="#e0f2fe" opacity="0.8" />
        <polygon points="30,105 40,98 50,105" fill="#ffffff" stroke="#bae6fd" strokeWidth="0.5" />
        <polygon points="70,107 80,100 90,107" fill="#ffffff" stroke="#bae6fd" strokeWidth="0.5" />
        <polygon points="120,104 130,97 140,104" fill="#ffffff" stroke="#bae6fd" strokeWidth="0.5" />
        <circle cx="150" cy="50" r="15" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
        <path d="M150 35 L150 65 M135 50 L165 50" stroke="#eab308" strokeWidth="1" />
        <path d="M50 65 Q90 35 130 55 Q135 60 125 70 Q90 85 45 70 Q40 65 50 65 Z" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
        <path d="M45 70 Q90 85 125 70" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M65 57 Q90 47 115 60" stroke="#fecdd3" strokeWidth="1.5" fill="none" />
        <path d="M60 65 Q90 55 110 68" stroke="#fecdd3" strokeWidth="1.5" fill="none" />
        <path d="M35 45 Q38 42 42 45 M38 42 Q32 38 34 34" stroke="#16a34a" strokeWidth="1.5" fill="none" />
      </svg>
    );
  } else if (lowerName.includes("morro") || lowerType.includes("noble")) {
    return (
      <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#f8fafc" />
        <defs>
          <linearGradient id="loinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="75" rx="75" ry="30" fill="#334155" stroke="#1e293b" strokeWidth="2" />
        <path d="M60 45 L140 45 L145 75 L55 75 Z" fill="url(#loinGrad)" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M55 75 L145 75 L140 90 L60 90 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M70 55 Q100 50 130 55" stroke="#e2e8f0" strokeWidth="2" fill="none" />
        <path d="M65 65 Q100 60 135 65" stroke="#cbd5e1" strokeWidth="2" fill="none" />
        <path d="M72 80 Q100 78 128 80" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M130 85 Q155 78 160 88" stroke="#16a34a" strokeWidth="2" fill="none" />
        <path d="M140 82 L138 78 M148 80 L146 76 M156 84 L154 80" stroke="#16a34a" strokeWidth="1.5" />
      </svg>
    );
  } else if (lowerType.includes("dessalat")) {
    return (
      <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#fffbeb" />
        <ellipse cx="100" cy="70" rx="65" ry="32" fill="#7c2d12" stroke="#431407" strokeWidth="2" />
        <ellipse cx="100" cy="66" rx="61" ry="28" fill="#9a3412" />
        <path d="M65 50 C80 45 120 45 135 50 C140 55 138 75 130 78 C110 82 80 82 70 78 C62 75 60 55 65 50 Z" fill="#fafafa" stroke="#e2e8f0" strokeWidth="1" />
        <ellipse cx="80" cy="58" rx="4" ry="2.5" fill="#fef08a" transform="rotate(15, 80, 58)" />
        <ellipse cx="120" cy="62" rx="4" ry="2.5" fill="#fef08a" transform="rotate(-30, 120, 62)" />
        <ellipse cx="100" cy="54" rx="3.5" fill="#fef08a" />
        <circle cx="75" cy="52" r="1" fill="#15803d" />
        <circle cx="110" cy="50" r="1.2" fill="#15803d" />
        <circle cx="125" cy="58" r="0.8" fill="#15803d" />
        <circle cx="90" cy="70" r="1" fill="#15803d" />
        <circle cx="115" cy="72" r="1.2" fill="#15803d" />
        <ellipse cx="100" cy="66" rx="45" ry="18" fill="none" stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
      </svg>
    );
  } else if (lowerType.includes("fumat")) {
    return (
      <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#fafaf9" />
        <rect x="20" y="20" width="160" height="80" rx="6" fill="#78350f" stroke="#451a03" strokeWidth="2" />
        <line x1="20" y1="40" x2="180" y2="40" stroke="#451a03" strokeWidth="1" opacity="0.3" />
        <line x1="20" y1="70" x2="180" y2="70" stroke="#451a03" strokeWidth="1" opacity="0.3" />
        <path d="M40 35 L120 30 C125 42 120 48 115 50 L35 55 C30 43 35 37 40 35 Z" fill="#d97706" fillOpacity="0.45" stroke="#b45309" strokeWidth="1" />
        <path d="M50 55 L130 50 C135 62 130 68 125 70 L45 75 C40 63 45 57 50 55 Z" fill="#d97706" fillOpacity="0.45" stroke="#b45309" strokeWidth="1" />
        <path d="M60 75 L140 70 C145 82 140 88 135 90 L55 95 C50 83 55 77 60 75 Z" fill="#d97706" fillOpacity="0.45" stroke="#b45309" strokeWidth="1" />
        <circle cx="145" cy="45" r="2" fill="#1c1917" />
        <circle cx="152" cy="52" r="1.8" fill="#1c1917" />
        <circle cx="138" cy="58" r="2.2" fill="#1c1917" />
        <path d="M28 85 Q35 78 40 82" stroke="#16a34a" strokeWidth="1" fill="none" />
        <line x1="32" y1="83" x2="30" y2="79" stroke="#16a34a" strokeWidth="0.8" />
        <line x1="35" y1="81" x2="34" y2="76" stroke="#16a34a" strokeWidth="0.8" />
      </svg>
    );
  } else {
    return (
      <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#f8fafc" />
        <ellipse cx="100" cy="65" rx="70" ry="35" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M50 65 Q80 40 120 55 C145 62 155 58 160 55 C155 68 145 68 120 75 Q80 85 50 65 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M40 55 L52 64 L40 75 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
        <path d="M100 50 Q110 40 108 55" fill="#22c55e" />
      </svg>
    );
  }
}
