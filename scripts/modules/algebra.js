// algebra.js
// 8th Grade Math Portal - Algebra Mission
// Exporting an array of question objects
// Each object: { question: "text", answer: number }

export const algebra = [
  // Level 1: Simple one-step equations
  { question: "Solve for x: x + 5 = 12", answer: 7 },
  { question: "Solve for x: 3x = 15", answer: 5 },
  { question: "Solve for x: 2x + 7 = 13", answer: 3 },
  { question: "Solve for x: 5x - 4 = 11", answer: 3 },
  { question: "Solve for x: 8 - 2x = 4", answer: 2 },
  { question: "Solve for x: 3x + 2 = 11", answer: 3 },
  { question: "Solve for x: 7x - 5 = 16", answer: 3 },
  { question: "Solve for x: 2(x + 3) = 10", answer: 2 },
  { question: "Solve for x: 5 - 3x = -4", answer: 3 },
  { question: "Solve for x: 4(x - 1) = 12", answer: 4 },

  // Level 2: Two-step equations
  { question: "Solve for x: 2x + 3 = 11", answer: 4 },
  { question: "Solve for x: 3x - 5 = 10", answer: 5 },
  { question: "Solve for x: 4x + 7 = 23", answer: 4 },
  { question: "Solve for x: 5x - 9 = 11", answer: 4 },
  { question: "Solve for x: 6x + 2 = 20", answer: 3 },
  { question: "Solve for x: 7x - 3 = 18", answer: 3 },
  { question: "Solve for x: 2x + 4 = 14", answer: 5 },
  { question: "Solve for x: 5x - 6 = 9", answer: 3 },
  { question: "Solve for x: 3x + 8 = 17", answer: 3 },
  { question: "Solve for x: 4x - 5 = 11", answer: 4 },

  // Level 3: Fractional and decimal coefficients
  { question: "Solve for x: (1/2)x + 3 = 7", answer: 8 },
  { question: "Solve for x: -3x + 9 = 0", answer: 3 },
  { question: "Solve for x: 5x/2 - 4 = 6", answer: 4 },
  { question: "Solve for x: x/3 + 5 = 9", answer: 12 },
  { question: "Solve for x: 0.5x + 7 = 12", answer: 10 },
  { question: "Solve for x: 2.5x - 5 = 10", answer: 6 },
  { question: "Solve for x: 3x/4 + 2 = 8", answer: 8 },
  { question: "Solve for x: 1.5x - 3 = 6", answer: 6 },
  { question: "Solve for x: x/5 + 3 = 7", answer: 20 },
  { question: "Solve for x: -0.5x + 6 = 4", answer: 4 },

  // Level 4: Multi-step with variables on both sides
  { question: "Solve for x: 2x + 3 = x + 7", answer: 4 },
  { question: "Solve for x: 3x - 5 = 2x + 4", answer: 9 },
  { question: "Solve for x: 5x + 2 = 3x + 10", answer: 4 },
  { question: "Solve for x: 4x - 7 = 2x + 5", answer: 6 },
  { question: "Solve for x: 3x + 4 = x + 10", answer: 3 },
  { question: "Solve for x: 7x - 5 = 2x + 20", answer: 5 },
  { question: "Solve for x: 2x + 9 = 3x - 6", answer: 15 },
  { question: "Solve for x: 5x + 7 = 2x + 19", answer: 4 },
  { question: "Solve for x: 6x - 4 = 3x + 8", answer: 4 },
  { question: "Solve for x: 4x + 3 = 2x + 11", answer: 4 },

  // Level 5: Word problems / contextual algebra
  { question: "John has 3 more than twice x. If total is 11, find x.", answer: 4 },
  { question: "The sum of a number and its triple is 24. Find the number.", answer: 6 },
  { question: "Twice a number minus 7 equals 9. Find the number.", answer: 8 },
  { question: "Three times a number plus 5 equals 20. Find x.", answer: 5 },
  { question: "A number plus 8 equals twice the number minus 4. Find x.", answer: 12 },
  { question: "Two consecutive integers sum to 15. Find the smaller number.", answer: 7 },
  { question: "If 5 less than 3 times a number is 10, find x.", answer: 5 },
  { question: "Twice a number increased by 7 equals 19. Find x.", answer: 6 },
  { question: "A number divided by 2 plus 3 equals 7. Find x.", answer: 8 },
  { question: "Four less than twice a number is 10. Find the number.", answer: 7 },

  // Level 6: Multi-step + fractions
  { question: "Solve for x: (1/2)x + 3 = 7", answer: 8 },
  { question: "Solve for x: (3/4)x - 2 = 4", answer: 8 },
  { question: "Solve for x: (2/3)x + 5 = 9", answer: 6 },
  { question: "Solve for x: (5/2)x - 3 = 7", answer: 4 },
  { question: "Solve for x: (4/3)x + 2 = 6", answer: 3 },
  { question: "Solve for x: (3/5)x - 4 = 2", answer: 10 },
  { question: "Solve for x: (7/2)x + 3 = 17", answer: 4 },
  { question: "Solve for x: (2/5)x - 1 = 3", answer: 10 },
  { question: "Solve for x: (3/4)x + 2 = 8", answer: 8 },
  { question: "Solve for x: (5/3)x - 7 = 3", answer: 6 },

  // Level 7: Decimals and negatives
  { question: "Solve for x: 0.5x + 2 = 4", answer: 4 },
  { question: "Solve for x: 1.2x - 3 = 9", answer: 10 },
  { question: "Solve for x: 0.3x + 1.8 = 3.6", answer: 6 },
  { question: "Solve for x: -2x + 5 = 9", answer: -2 },
  { question: "Solve for x: 4x - 7.5 = 8.5", answer: 4 },
  { question: "Solve for x: -3x + 9 = 0", answer: 3 },
  { question: "Solve for x: 2.5x - 5 = 10", answer: 6 },
  { question: "Solve for x: -1.5x + 6 = 3", answer: 2 },
  { question: "Solve for x: 0.25x + 1 = 3", answer: 8 },
  { question: "Solve for x: -0.5x + 10 = 6", answer: 8 },

  // Level 8 / word problems / multi-step
  { question: "Three more than half a number is 9. Find the number.", answer: 12 },
  { question: "Five times a number decreased by 2 equals 18. Find the number.", answer: 4 },
  { question: "Twice a number plus 9 equals 23. Find the number.", answer: 7 },
  { question: "Four less than three times a number equals 14. Find the number.", answer: 6 },
  { question: "A number minus 7 equals 3 times 5. Find the number.", answer: 22 },
  { question: "A number increased by 10 equals twice the number minus 4. Find x.", answer: 14 },
  { question: "When 4 is added to three times a number, the result is 19. Find x.", answer: 5 },
  { question: "The difference between twice a number and 5 is 9. Find the number.", answer: 7 },
  { question: "Three less than four times a number equals 13. Find the number.", answer: 4 },
  { question: "A number divided by 4 plus 6 equals 10. Find x.", answer: 16 },

  { question: "A number plus 5 equals three times the number minus 7. Find x.", answer: 6 },
  { question: "Twice a number decreased by 8 equals 10. Find x.", answer: 9 },
  { question: "Five less than a number is equal to half the number. Find x.", answer: 10 },
  { question: "A number added to its double equals 21. Find x.", answer: 7 },
  { question: "Three more than twice a number equals 15. Find x.", answer: 6 },
  { question: "When 8 is subtracted from a number, the result is twice 4. Find the number.", answer: 16 },
  { question: "A number divided by 3 plus 2 equals 8. Find the number.", answer: 18 },
  { question: "Four more than 5 times a number equals 24. Find x.", answer: 4 },
  { question: "The sum of a number and 12 equals twice the number plus 4. Find x.", answer: 8 },
  { question: "A number plus its half equals 18. Find the number.", answer: 12 },

  { question: "Six less than three times a number equals 9. Find x.", answer: 5 },
  { question: "A number divided by 5 plus 7 equals 9. Find the number.", answer: 10 },
  { question: "If twice a number minus 3 equals 9, find x.", answer: 6 },
  { question: "The sum of a number and 4 equals the number times 2. Find x.", answer: 4 },
  { question: "Eight more than 3 times a number is 20. Find x.", answer: 4 },
  { question: "A number minus 3 equals one-fourth of 12. Find x.", answer: 6 },
  { question: "Twice a number plus 5 equals 17. Find the number.", answer: 6 },
  { question: "If 3 times a number plus 7 equals 16, find the number.", answer: 3 },
  { question: "When a number is subtracted from 20, the result is 8. Find x.", answer: 12 },
  { question: "A number divided by 2 plus 5 equals 15. Find x.", answer: 20 },

  { question: "Five more than one-third of a number equals 11. Find x.", answer: 18 },
  { question: "A number increased by 9 equals three times the number minus 15. Find x.", answer: 12 },
  { question: "Twice a number minus 6 equals the number plus 8. Find x.", answer: 14 },
  { question: "Three times a number decreased by 4 equals 14. Find the number.", answer: 6 },
  { question: "A number plus 7 equals 3 times the number minus 5. Find x.", answer: 6 },
  { question: "When 6 is subtracted from twice a number, the result is 10. Find x.", answer: 8 },
  { question: "Half of a number plus 3 equals 7. Find x.", answer: 8 },
  { question: "A number increased by twice itself equals 27. Find x.", answer: 9 },
  { question: "Four less than three times a number equals 11. Find x.", answer: 5 },
  { question: "A number divided by 2 plus 5 equals 15. Find x.", answer: 20 }
];

  // ---- Add more progressively harder questions until reaching 100 ----
  // Include decimals, fractions, negatives, multi-step, multi-variable style
];
