import React from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

/**
 * ChatShield Utility & Component
 * Scans messages for phone numbers, emails, social media handles, and external links
 * to prevent escrow bypass. Allows pricing/numbers related to wedding budgets.
 */

// Regex patterns for prohibited contact sharing
const FORBIDDEN_REGEX = [
  // Phone numbers (10 digits, with or without +91, spaces, dashes)
  /(\+91[\-\s]?)?[6-9]\d{9}/g,
  // Generic 10+ digit numbers
  /\b\d{10,}\b/g,
  // Social media handles / @ mentions
  /@[a-zA-Z0-9_.]{3,}/g,
  // Email addresses
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  // URLs and Web links
  /https?:\/\/[^\s]+/g,
  /www\.[^\s]+/g,
  // Spoken number words attempt (e.g. "nine eight", "one two three")
  /\b(one|two|three|four|five|six|seven|eight|nine|zero)\s+(one|two|three|four|five|six|seven|eight|nine|zero)/gi
];

export function scanMessageForBypass(text) {
  if (!text) return { isClean: true, sanitizedText: text };

  let isViolating = false;

  for (let regex of FORBIDDEN_REGEX) {
    regex.lastIndex = 0;
    if (regex.test(text)) {
      isViolating = true;
      break;
    }
  }

  if (isViolating) {
    return {
      isClean: false,
      sanitizedText: "[Blocked by AUG ChatShield - Anti-Bypass Protocol: Contact sharing prohibited to maintain escrow safety]"
    };
  }

  return { isClean: true, sanitizedText: text };
}

// UI Badge Component for Chat Headers or Warnings
export default function ChatShieldBanner() {
  return (
    <div className="bg-[#8B0000]/5 border border-[#8B0000]/20 px-4 py-2.5 rounded-2xl flex items-center justify-between text-xs text-[#8B0000] mb-3">
      <div className="flex items-center gap-2">
        <ShieldAlert size={16} className="shrink-0" />
        <span><b>AUG ChatShield Active:</b> Phone numbers, emails, and social handles are automatically scrubbed to secure your escrow guarantee.</span>
      </div>
      <span className="hidden md:inline-flex items-center gap-1 font-mono text-[10px] bg-[#8B0000] text-white px-2 py-0.5 rounded-md">
        <Lock size={10} /> 256-Bit Guard
      </span>
    </div>
  );
}

