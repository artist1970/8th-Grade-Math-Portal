// preAlgebra.js
// 8th Grade Math Portal - Pre-Algebra Mission
// Exporting an array of question objects
// Each object: { question: "text", answer: number }

export const preAlgebra = [
  // Level 1: Basic arithmetic
  { question: "4 + 7 × 2", answer: 18 },
  { question: "(12 ÷ 3) + 5", answer: 9 },
  { question: "(8 - 3) × 2", answer: 10 },
  { question: "15 - 4 × 2", answer: 7 },
  { question: "18 ÷ 3 + 6", answer: 12 },
  { question: "(7 + 5) × 2", answer: 24 },
  { question: "9 + 8 ÷ 4", answer: 11 },
  { question: "14 - (6 ÷ 2)", answer: 11 },
  { question: "3 × (5 + 2)", answer: 21 },
  { question: "16 ÷ (4 × 2)", answer: 2 },

  // Level 2: Introduce negatives
  { question: "(-5) + 8", answer: 3 },
  { question: "-3 × 4", answer: -12 },
  { question: "7 + (-2) × 3", answer: 1 },
  { question: "18 ÷ (-3)", answer: -6 },

  // Level 3: Decimals
  { question: "0.5 × 8", answer: 4 },
  { question: "3.6 + 4.4", answer: 8 },
  { question: "7.2 ÷ 0.6", answer: 12 },
  { question: "5 - 7.5", answer: -2.5 },
  { question: "(2.5 + 1.5) × 2", answer: 8 },
  { question: "(6 ÷ 0.5) + 2", answer: 14 },

  // Level 4: Fractions (can also be decimals)
  { question: "1/2 + 3/4", answer: 1.25 },
  { question: "2/3 × 9", answer: 6 },
  { question: "5 ÷ 2/5", answer: 12.5 },
  { question: "3/4 - 1/2", answer: 0.25 },

  // Level 5: Mixed multi-step
  { question: "2 × (3 + 5) - 4", answer: 12 },
  { question: "(12 ÷ (2 + 4)) + 7", answer: 9 },
  { question: "(-3 + 8) × 2", answer: 10 },
  { question: "5 + (-2 × 3) + 7", answer: 6 },

  
  { question: "(-5) + 8", answer: 3 },
  { question: "-3 × 4", answer: -12 },
  { question: "7 + (-2) × 3", answer: 1 },
  { question: "18 ÷ (-3)", answer: -6 },
  { question: "0.5 × 8", answer: 4 },
  { question: "3.6 + 4.4", answer: 8 },
  { question: "7.2 ÷ 0.6", answer: 12 },
  { question: "5 - 7.5", answer: -2.5 },
  { question: "(2.5 + 1.5) × 2", answer: 8 },
  { question: "(6 ÷ 0.5) + 2", answer: 14 },

  // ---- 11–20 ----
  { question: "(-10) + (-5)", answer: -15 },
  { question: "(-8) - (-3)", answer: -5 },
  { question: "12 ÷ 4 × 2", answer: 6 },
  { question: "3 × (-2) × (-3)", answer: 18 },
  { question: "(5 + 3) × 2", answer: 16 },
  { question: "9 - (4 × 2)", answer: 1 },
  { question: "(-4) × 6", answer: -24 },
  { question: "8 ÷ (-2)", answer: -4 },
  { question: "(-3)²", answer: 9 },
  { question: "(2 + 6) ÷ 4", answer: 2 },

  // ---- 21–30 ----
  { question: "5 × 0", answer: 0 },
  { question: "(-9) + 14", answer: 5 },
  { question: "(-6) × (-2)", answer: 12 },
  { question: "(-12) ÷ 3", answer: -4 },
  { question: "(10 - 6) + 4", answer: 8 },
  { question: "(-7) + (-8)", answer: -15 },
  { question: "(-0.5) × 10", answer: -5 },
  { question: "(9 + 3) ÷ 3", answer: 4 },
  { question: "(-8) ÷ (-2)", answer: 4 },
  { question: "(-10) + 15 - 3", answer: 2 },

  // ---- 31–40 ----
  { question: "(4 × 3) - 5", answer: 7 },
  { question: "(5 + 2) × (-3)", answer: -21 },
  { question: "(-9) ÷ 3 + 8", answer: 5 },
  { question: "(12 ÷ 4) × (-2)", answer: -6 },
  { question: "(-3)³", answer: -27 },
  { question: "(0.2 × 5)", answer: 1 },
  { question: "1.5 + (-0.5)", answer: 1 },
  { question: "2.4 × (-3)", answer: -7.2 },
  { question: "(6 - 3)²", answer: 9 },
  { question: "(-7 + 4) × 2", answer: -6 },

  // ---- 41–50 ----
  { question: "(10 ÷ 2) + (-1)", answer: 4 },
  { question: "(4 + 8) ÷ (-2)", answer: -6 },
  { question: "(-3) + (-2) + 7", answer: 2 },
  { question: "(-6) × (4 - 2)", answer: -12 },
  { question: "(8 ÷ 0.5)", answer: 16 },
  { question: "(5 × 2) - (3 × 4)", answer: -2 },
  { question: "(-2.5) + 1.5", answer: -1 },
  { question: "(3 + 7) ÷ 2", answer: 5 },
  { question: "(0.75 × 8)", answer: 6 },
  { question: "(-9) - (-4)", answer: -5 },

  // ---- 51–60 ----
  { question: "(2 + 5) × 3", answer: 21 },
  { question: "(10 - 8) ÷ 2", answer: 1 },
  { question: "(-4) × (-5)", answer: 20 },
  { question: "9 + (-3) - 5", answer: 1 },
  { question: "(6 ÷ 3) × 2", answer: 4 },
  { question: "(-12) ÷ (-4)", answer: 3 },
  { question: "(8 × 0.25)", answer: 2 },
  { question: "(-7) × 2 + 9", answer: -5 },
  { question: "(5.5 - 2.5)", answer: 3 },
  { question: "(3 × 4) - 5", answer: 7 },

  // ---- 61–70 ----
  { question: "(1.2 × 10)", answer: 12 },
  { question: "(-8 + 5)", answer: -3 },
  { question: "(-6) ÷ 2", answer: -3 },
  { question: "(4 + 6) - 3", answer: 7 },
  { question: "7 × (-2)", answer: -14 },
  { question: "(-10) ÷ (-5)", answer: 2 },
  { question: "(2.5 × 4) + 1", answer: 11 },
  { question: "(-9 + 3) × 2", answer: -12 },
  { question: "5 × (3 + 2)", answer: 25 },
  { question: "(12 ÷ 3) + (-1)", answer: 3 },

  // ---- 71–80 ----
  { question: "(-4) + 10", answer: 6 },
  { question: "(3 × 2) × (-2)", answer: -12 },
  { question: "(6 - 4) × 5", answer: 10 },
  { question: "(2.5 + 3.5) × 2", answer: 12 },
  { question: "(10 ÷ 0.25)", answer: 40 },
  { question: "(-2) × (-8)", answer: 16 },
  { question: "(7 + 8) ÷ 3", answer: 5 },
  { question: "(-5)²", answer: 25 },
  { question: "(9 ÷ 0.3)", answer: 30 },
  { question: "(4.8 + 3.2)", answer: 8 },

  // ---- 81–90 ----
  { question: "(2 × 3) + 4", answer: 10 },
  { question: "(-12) + 8", answer: -4 },
  { question: "(1.5 + 2.5) × 2", answer: 8 },
  { question: "(5 × 5) - 12", answer: 13 },
  { question: "(-6 + 9) ÷ 3", answer: 1 },
  { question: "(4 - 7) × (-2)", answer: 6 },
  { question: "(3²) + (-4)", answer: 5 },
  { question: "(0.4 × 10)", answer: 4 },
  { question: "(-9) ÷ 3", answer: -3 },
  { question: "(-2.5 + 1.5)", answer: -1 },

  // ---- 91–100 ----
  { question: "(8 + 4) ÷ 4", answer: 3 },
  { question: "(10 - 3) × 2", answer: 14 },
  { question: "(6 × -2) + 8", answer: -4 },
  { question: "(-5) + (-5)", answer: -10 },
  { question: "(12 ÷ 6) + 7", answer: 9 },
  { question: "(3 × 4) ÷ 2", answer: 6 },
  { question: "(2 + 8) × (-1)", answer: -10 },
  { question: "(-7) + 10 - 5", answer: -2 },
  { question: "(5²) ÷ 5", answer: 5 },
  { question: "(8 ÷ 0.4)", answer: 20 }
]
  // Add more progressively harder problems until you reach 100 total
  // Example pattern:
  // - More decimals
  // - Negative fractions
  // - Order of operations with parentheses
  // - Multi-step arithmetic with multiple operations
];
