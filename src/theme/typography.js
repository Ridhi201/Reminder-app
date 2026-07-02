/**
 * Typography system.
 * Display: Sora (headings, brand moments) — geometric, confident.
 * Body/UI: Inter (everything you read and click).
 * Mono: JetBrains Mono (timers, streak counts, timestamps, data).
 */
const typography = {
  fonts: {
    display: '"Sora", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", "SFMono-Regular", monospace',
  },
  sizes: {
    h1: "40px",
    h2: "32px",
    h3: "28px",
    h4: "22px",
    body: "16px",
    small: "14px",
    caption: "12px",
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};

export default typography;