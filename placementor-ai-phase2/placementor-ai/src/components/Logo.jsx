/**
 * PlaceMentor AI logo: a rounded gradient mark built from the letter P,
 * plus a wordmark. `variant="light"` is used on dark backgrounds
 * (e.g. the login page's brand panel).
 */
export default function Logo({ variant = "dark" }) {
  const isLight = variant === "light";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <rect width="34" height="34" rx="10" fill="url(#pm-mark-gradient)" />
        <path
          d="M12 9h6.2c3 0 5 1.9 5 4.6 0 2.7-2 4.6-5 4.6H15v6.3h-3V9Zm3 2.5v4.2h3c1.5 0 2.4-.8 2.4-2.1s-.9-2.1-2.4-2.1h-3Z"
          fill="white"
        />
        <defs>
          <linearGradient id="pm-mark-gradient" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F46E5" />
            <stop offset="1" stopColor="#7C6CFF" />
          </linearGradient>
        </defs>
      </svg>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 18,
          color: isLight ? "#ffffff" : "var(--ink)",
          letterSpacing: "-0.01em",
        }}
      >
        PlaceMentor
        <span style={{ color: isLight ? "#B9B2FF" : "var(--primary)" }}> AI</span>
      </span>
    </span>
  );
}
