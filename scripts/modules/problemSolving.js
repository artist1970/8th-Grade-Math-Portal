// problemSolving.js
// 8th Grade Math Portal - Problem Solving Mission
// Exporting an array of question objects
// Each object: { question: "text", answer: number }

export const problemSolving = [
  // --- LEVEL 1: Simple one-step word problems ---
  { question: "Twice a number is 14. Find the number.", answer: 7 },
  { question: "A number plus 5 equals 12. Find the number.", answer: 7 },
  { question: "Three less than a number is 10. Find the number.", answer: 13 },
  { question: "A number divided by 4 equals 3. Find the number.", answer: 12 },
  { question: "Five more than a number is 20. Find x.", answer: 15 },
  { question: "Half of a number is 9. Find the number.", answer: 18 },
  { question: "A number minus 8 equals 11. Find x.", answer: 19 },
  { question: "Three times a number equals 24. Find x.", answer: 8 },
  { question: "A number plus 10 equals 15. Find x.", answer: 5 },
  { question: "A number divided by 5 is 7. Find the number.", answer: 35 },

  // --- LEVEL 2: Two-step equations & relationships ---
  { question: "Three more than twice a number equals 11. Find x.", answer: 4 },
  { question: "Four less than triple a number equals 8. Find x.", answer: 4 },
  { question: "Twice a number plus 7 equals 19. Find x.", answer: 6 },
  { question: "A number plus its double equals 18. Find x.", answer: 6 },
  { question: "Five times a number minus 3 equals 12. Find x.", answer: 3 },
  { question: "A number divided by 3 plus 2 equals 8. Find x.", answer: 18 },
  { question: "Six less than a number’s double equals 10. Find x.", answer: 8 },
  { question: "Three more than half a number equals 11. Find x.", answer: 16 },
  { question: "Four more than two-thirds of a number equals 10. Find x.", answer: 9 },
  { question: "A number divided by 2 minus 5 equals 9. Find x.", answer: 28 },

  // --- LEVEL 3: Word problems with context ---
  { question: "Sara is twice as old as her sister. Their total age is 18. How old is Sara?", answer: 12 },
  { question: "A pen costs $2 more than a pencil. Together they cost $8. Find the price of the pen.", answer: 5 },
  { question: "A rectangle’s length is 3 more than its width. If perimeter is 18, find the width.", answer: 3 },
  { question: "A train travels 60 miles per hour for 3 hours. How far does it go?", answer: 180 },
  { question: "The sum of two consecutive numbers is 37. Find the smaller.", answer: 18 },
  { question: "Twice a number is 4 more than 10. Find x.", answer: 7 },
  { question: "If 5 less than 3 times a number is 10, find x.", answer: 5 },
  { question: "Four less than twice a number equals 10. Find x.", answer: 7 },
  { question: "A number plus 8 equals twice the number minus 4. Find x.", answer: 12 },
  { question: "Two consecutive integers sum to 15. Find the smaller.", answer: 7 },

  // --- LEVEL 4: Multi-step word problems ---
  { question: "A number added to 5 gives the same result as twice the number minus 7. Find x.", answer: 12 },
  { question: "Three times a number plus 4 equals the number plus 16. Find x.", answer: 6 },
  { question: "The difference between twice a number and 5 is 11. Find the number.", answer: 8 },
  { question: "A number increased by 9 equals three times the number minus 15. Find x.", answer: 12 },
  { question: "A number divided by 2 plus 3 equals 7. Find x.", answer: 8 },
  { question: "Four less than three times a number equals 14. Find the number.", answer: 6 },
  { question: "When 8 is subtracted from a number, the result is twice 4. Find the number.", answer: 16 },
  { question: "A number increased by 10 equals twice the number minus 4. Find x.", answer: 14 },
  { question: "Five less than a number is equal to half the number. Find x.", answer: 10 },
  { question: "A number plus its half equals 18. Find the number.", answer: 12 },

  // --- LEVEL 5: Real-life ratios and proportions ---
  { question: "If 3 pencils cost $6, how much do 5 pencils cost?", answer: 10 },
  { question: "A car travels 120 miles in 3 hours. Find its speed.", answer: 40 },
  { question: "A map scale is 1 inch = 50 miles. How many miles are 3 inches?", answer: 150 },
  { question: "A recipe needs 2 cups of sugar for 8 servings. How many cups for 12 servings?", answer: 3 },
  { question: "If 5 apples cost $10, what’s the cost of 8 apples?", answer: 16 },
  { question: "A ratio of boys to girls is 3:5. If there are 24 girls, how many boys?", answer: 14.4 },
  { question: "A train covers 240 miles in 4 hours. Find the average speed.", answer: 60 },
  { question: "If a 12-oz drink costs $3, how much does a 20-oz drink cost?", answer: 5 },
  { question: "The scale on a map is 1 cm = 25 km. How far is 6 cm?", answer: 150 },
  { question: "If 6 workers build a wall in 8 hours, how long for 4 workers (same rate)?", answer: 12 },

  // --- LEVEL 6: Percent and discount problems ---
  { question: "What is 25% of 80?", answer: 20 },
  { question: "Increase 60 by 10%.", answer: 66 },
  { question: "A $40 shirt is discounted by 25%. Find the sale price.", answer: 30 },
  { question: "A $50 item costs $40 on sale. What percent discount is that?", answer: 20 },
  { question: "Find 15% of 120.", answer: 18 },
  { question: "A $200 phone has a 10% discount. Find new price.", answer: 180 },
  { question: "A test has 50 questions. If you answer 90%, how many correct?", answer: 45 },
  { question: "Sales tax is 8%. Find total for a $50 purchase.", answer: 54 },
  { question: "A $100 coat increases by 15% in price. Find new price.", answer: 115 },
  { question: "You scored 72 out of 80 on a test. What percent is that?", answer: 90 },

  // --- LEVEL 7: Geometry-based word problems ---
  { question: "A rectangle has length 10 and width 4. Find area.", answer: 40 },
  { question: "A triangle has base 8 and height 5. Find area.", answer: 20 },
  { question: "A circle has radius 7. Find circumference (use 3.14).", answer: 43.96 },
  { question: "A square’s perimeter is 24. Find side length.", answer: 6 },
  { question: "A circle’s area with radius 3 (π = 3.14).", answer: 28.26 },
  { question: "A rectangular field is 12 m long and 8 m wide. Find perimeter.", answer: 40 },
  { question: "A triangle has sides 5, 12, and 13. Find perimeter.", answer: 30 },
  { question: "A cube’s side is 4 cm. Find its volume.", answer: 64 },
  { question: "A rectangle has perimeter 30 and length 9. Find width.", answer: 6 },
  { question: "A circle has diameter 10. Find area (π = 3.14).", answer: 78.5 },

  // --- LEVEL 8: Real-world rate & time problems ---
  { question: "A car travels 180 miles at 60 mph. How long does it take?", answer: 3 },
  { question: "A faucet fills a tank in 5 hours. How long for 3 identical faucets?", answer: 1.67 },
  { question: "You walk 3 miles in 45 minutes. What’s your speed in mph?", answer: 4 },
  { question: "If you earn $12/hour, how much for 15 hours?", answer: 180 },
  { question: "A cyclist rides 90 km in 3 hours. Find speed.", answer: 30 },
  { question: "A car uses 10 gallons for 250 miles. Find mpg.", answer: 25 },
  { question: "If it takes 4 hours to travel 200 miles, find average speed.", answer: 50 },
  { question: "At 5 mph, how far in 2.5 hours?", answer: 12.5 },
  { question: "A plane travels 600 miles in 2 hours. Find speed.", answer: 300 },
  { question: "If a runner jogs 8 km/h for 1.5 hours, how far?", answer: 12 },

  // --- LEVEL 9: Advanced algebra-style reasoning ---
  { question: "The sum of a number and twice its square is 27. Find the number.", answer: 3 },
  { question: "Twice a number squared equals 50. Find the number.", answer: 5 },
  { question: "The product of two consecutive integers is 56. Find the smaller.", answer: 7 },
  { question: "If 5 more than 2x equals 17, find x.", answer: 6 },
  { question: "If 3x + 4 = 19, find x.", answer: 5 },
  { question: "Solve for x: 4x - 5 = 11.", answer: 4 },
  { question: "Solve for x: 2x + 7 = 15.", answer: 4 },
  { question: "If 7x - 9 = 12, find x.", answer: 3 },
  { question: "If x/3 + 5 = 8, find x.", answer: 9 },
  { question: "Solve for x: 5x - 10 = 15.", answer: 5 }
];
