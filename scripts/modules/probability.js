// probability.js
// 8th Grade Math Portal - Probability Mission
// Exporting an array of question objects
// Each object: { question: "text", answer: number }

export const probability = [
  // Level 1: Simple one-step equations

  {
  "questions": [
    {
      "id": 1,
      "question": "A bag contains 5 red marbles and 3 blue marbles. If you pick one marble at random, what is the probability it is red?",
      "options": {"A": "5/8", "B": "3/8", "C": "1/2", "D": "5/3"},
      "answer": "A"
    },
    {
      "id": 2,
      "question": "A die is rolled. What is the probability of getting an even number?",
      "options": {"A": "1/6", "B": "1/2", "C": "1/3", "D": "2/3"},
      "answer": "B"
    },
    {
      "id": 3,
      "question": "A coin is flipped twice. What is the probability of getting two heads?",
      "options": {"A": "1/2", "B": "1/4", "C": "1/3", "D": "1/8"},
      "answer": "B"
    },
    {
      "id": 4,
      "question": "A box contains 2 green balls, 3 yellow balls, and 5 red balls. If a ball is picked at random, what is the probability that it is not red?",
      "options": {"A": "1/2", "B": "1/5", "C": "1/10", "D": "1/4"},
      "answer": "A"
    },
    {
      "id": 5,
      "question": "A spinner has 8 equal sections numbered 1 to 8. What is the probability of landing on a number greater than 5?",
      "options": {"A": "1/8", "B": "1/4", "C": "3/8", "D": "1/2"},
      "answer": "C"
    },
    {
      "id": 6,
      "question": "Two dice are rolled. What is the probability that the sum is 7?",
      "options": {"A": "1/6", "B": "1/12", "C": "1/8", "D": "1/36"},
      "answer": "A"
    },
    {
      "id": 7,
      "question": "A card is drawn from a standard deck. What is the probability of getting a heart?",
      "options": {"A": "1/2", "B": "1/4", "C": "1/3", "D": "1/13"},
      "answer": "B"
    },
    {
      "id": 8,
      "question": "A jar contains 4 red, 4 blue, and 2 green marbles. What is the probability of picking a blue marble?",
      "options": {"A": "2/5", "B": "1/5", "C": "4/10", "D": "2/10"},
      "answer": "A"
    },
    {
      "id": 9,
      "question": "A coin is flipped three times. What is the probability of getting exactly one head?",
      "options": {"A": "3/8", "B": "1/3", "C": "1/2", "D": "1/4"},
      "answer": "A"
    },
    {
      "id": 10,
      "question": "A die is rolled. What is the probability of getting a number less than 5?",
      "options": {"A": "1/6", "B": "2/3", "C": "1/2", "D": "5/6"},
      "answer": "B"
    },
    {
      "id": 11,
      "question": "A bag contains 6 black and 4 white balls. If two balls are drawn without replacement, what is the probability both are black?",
      "options": {"A": "1/3", "B": "1/2", "C": "3/5", "D": "3/10"},
      "answer": "D"
    },
    {
      "id": 12,
      "question": "A coin is flipped four times. What is the probability of getting all tails?",
      "options": {"A": "1/4", "B": "1/8", "C": "1/16", "D": "1/2"},
      "answer": "C"
    },
    {
      "id": 13,
      "question": "A die is rolled twice. What is the probability that the first roll is a 3 and the second roll is an even number?",
      "options": {"A": "1/12", "B": "1/6", "C": "1/3", "D": "1/36"},
      "answer": "A"
    },
    {
      "id": 14,
      "question": "A bag contains 3 red, 2 green, and 5 yellow balls. If one ball is picked, what is the probability it is green or yellow?",
      "options": {"A": "7/10", "B": "5/10", "C": "2/10", "D": "3/10"},
      "answer": "A"
    },
    {
      "id": 15,
      "question": "A spinner with numbers 1 to 10 is spun. What is the probability of landing on a prime number?",
      "options": {"A": "1/2", "B": "2/5", "C": "3/10", "D": "1/5"},
      "answer": "B"
    },
    {
      "id": 16,
      "question": "A card is drawn from a standard deck. What is the probability of getting a face card?",
      "options": {"A": "3/13", "B": "1/4", "C": "1/3", "D": "3/52"},
      "answer": "A"
    },
    {
      "id": 17,
      "question": "A die is rolled. What is the probability of getting a 2 or a 5?",
      "options": {"A": "1/3", "B": "1/2", "C": "1/6", "D": "2/6"},
      "answer": "D"
    },
    {
      "id": 18,
      "question": "A coin is tossed twice. What is the probability of getting at least one head?",
      "options": {"A": "1/4", "B": "3/4", "C": "1/2", "D": "1"},
      "answer": "B"
    },
    {
      "id": 19,
      "question": "A bag contains 7 red and 3 white balls. If one ball is drawn, what is the probability it is red?",
      "options": {"A": "7/10", "B": "3/10", "C": "1/2", "D": "3/7"},
      "answer": "A"
    },
    {
      "id": 20,
      "question": "Two dice are rolled. What is the probability that the sum is less than 4?",
      "options": {"A": "1/12", "B": "1/8", "C": "1/6", "D": "1/4"},
      "answer": "A"
    },
    {
      "id": 21,
      "question": "A bag contains 5 red and 2 blue marbles. Two marbles are drawn with replacement. What is the probability both are red?",
      "options": {"A": "25/49", "B": "5/7", "C": "10/49", "D": "1/2"},
      "answer": "A"
    },
    {
      "id": 22,
      "question": "A card is drawn from a deck. What is the probability of getting a black card?",
      "options": {"A": "1/4", "B": "1/2", "C": "1/3", "D": "1/52"},
      "answer": "B"
    },
    {
      "id": 23,
      "question": "A coin is flipped three times. What is the probability of getting at least one head?",
      "options": {"A": "7/8", "B": "1/8", "C": "3/8", "D": "1/2"},
      "answer": "A"
    },
    {
      "id": 24,
      "question": "A bag contains 3 red, 4 green, and 3 yellow balls. One ball is drawn. What is the probability it is green?",
      "options": {"A": "1/3", "B": "2/5", "C": "4/10", "D": "4/10"},
      "answer": "B"
    },
    {
      "id": 25,
      "question": "A spinner has 6 equal sections. What is the probability of landing on section 4?",
      "options": {"A": "1/6", "B": "1/2", "C": "1/3", "D": "1/4"},
      "answer": "A"
    },
     {
    "id": 26,
    "question": "A coin is flipped. What is the probability of getting heads?",
    "options": {"A": "0", "B": "1/4", "C": "1/2", "D": "1"},
    "answer": "C"
  },
  {
    "id": 27,
    "question": "A die is rolled. What is the probability of getting an even number?",
    "options": {"A": "1/6", "B": "1/2", "C": "1/3", "D": "2/3"},
    "answer": "B"
  },
  {
    "id": 28,
    "question": "A die is rolled. What is the probability of getting a number greater than 4?",
    "options": {"A": "1/6", "B": "1/3", "C": "1/2", "D": "2/3"},
    "answer": "B"
  },
  {
    "id": 29,
    "question": "A bag contains 3 red and 2 blue marbles. What is the probability of drawing a red marble?",
    "options": {"A": "1/5", "B": "2/5", "C": "3/5", "D": "4/5"},
    "answer": "C"
  },
  {
    "id": 30,
    "question": "A spinner has 4 equal sections: red, blue, green, yellow. What is the probability of landing on green?",
    "options": {"A": "1/2", "B": "1/4", "C": "1/3", "D": "1/5"},
    "answer": "B"
  },
  {
    "id": 31,
    "question": "A standard deck has 52 cards. What is the probability of drawing a heart?",
    "options": {"A": "1/4", "B": "1/3", "C": "1/13", "D": "1/2"},
    "answer": "A"
  },
  {
    "id": 32,
    "question": "A number is chosen from 1 to 10. What is the probability it is an odd number?",
    "options": {"A": "1/5", "B": "1/2", "C": "3/5", "D": "4/5"},
    "answer": "B"
  },
  {
    "id": 33,
    "question": "A coin is tossed twice. What is the probability of getting two heads?",
    "options": {"A": "1/4", "B": "1/2", "C": "3/4", "D": "1/8"},
    "answer": "A"
  },
  {
    "id": 34,
    "question": "A coin is tossed twice. What is the probability of getting at least one head?",
    "options": {"A": "1/4", "B": "1/2", "C": "3/4", "D": "1"},
    "answer": "C"
  },
  {
    "id": 35,
    "question": "A die is rolled. What is the probability of rolling a 1 or 6?",
    "options": {"A": "1/3", "B": "1/6", "C": "1/2", "D": "2/6"},
    "answer": "D"
  },
  {
    "id": 36,
    "question": "A bag contains 2 red, 3 blue, and 5 green balls. What is the probability of drawing a green ball?",
    "options": {"A": "1/5", "B": "1/2", "C": "1/3", "D": "5/10"},
    "answer": "B"
  },
  {
    "id": 37,
    "question": "If a die is rolled, what is the probability of not getting a 3?",
    "options": {"A": "1/6", "B": "2/6", "C": "5/6", "D": "1/3"},
    "answer": "C"
  },
  {
    "id": 38,
    "question": "What is the probability of getting tails on a fair coin?",
    "options": {"A": "1", "B": "1/2", "C": "1/3", "D": "0"},
    "answer": "B"
  },
  {
    "id": 39,
    "question": "A spinner has 8 equal sections numbered 1–8. What is the probability of spinning a number less than 5?",
    "options": {"A": "1/2", "B": "1/3", "C": "3/8", "D": "5/8"},
    "answer": "A"
  },
  {
    "id": 40,
    "question": "A bag has 4 red, 4 blue, and 2 green marbles. Probability of drawing a red or green?",
    "options": {"A": "3/5", "B": "1/2", "C": "4/10", "D": "2/5"},
    "answer": "A"
  },
  {
    "id": 41,
    "question": "If you pick a letter from 'MATH', what is the probability of picking a vowel?",
    "options": {"A": "1/2", "B": "1/3", "C": "1/4", "D": "2/3"},
    "answer": "A"
  },
  {
    "id": 42,
    "question": "A box has 6 pens: 2 black, 3 blue, 1 red. What is the probability of a blue pen?",
    "options": {"A": "1/3", "B": "1/2", "C": "3/6", "D": "2/6"},
    "answer": "C"
  },
  {
    "id": 43,
    "question": "A coin is flipped three times. Probability of getting all heads?",
    "options": {"A": "1/4", "B": "1/8", "C": "1/2", "D": "3/8"},
    "answer": "B"
  },
  {
    "id": 44,
    "question": "A card is drawn from a deck. Probability it is a face card (J, Q, K)?",
    "options": {"A": "3/13", "B": "1/4", "C": "1/3", "D": "1/2"},
    "answer": "A"
  },
  {
    "id": 45,
    "question": "A die is rolled twice. Probability of getting a sum of 7?",
    "options": {"A": "1/6", "B": "1/12", "C": "5/36", "D": "6/36"},
    "answer": "D"
  },
  {
    "id": 46,
    "question": "You pick a random day of the week. Probability it is a weekend?",
    "options": {"A": "1/5", "B": "1/7", "C": "2/7", "D": "3/7"},
    "answer": "C"
  },
  {
    "id": 47,
    "question": "A bag has 10 balls: 6 red, 2 blue, 2 green. Probability of not red?",
    "options": {"A": "2/5", "B": "1/5", "C": "3/5", "D": "4/5"},
    "answer": "A"
  },
  {
    "id": 48,
    "question": "Rolling a die: Probability of a number between 2 and 5?",
    "options": {"A": "1/3", "B": "2/6", "C": "1/2", "D": "4/6"},
    "answer": "C"
  },
  {
    "id": 49,
    "question": "If two coins are tossed, the probability of exactly one head?",
    "options": {"A": "1/4", "B": "1/2", "C": "3/4", "D": "2/3"},
    "answer": "B"
  },
  {
    "id": 50,
    "question": "A number is chosen from 1–20. Probability it’s a multiple of 5?",
    "options": {"A": "1/5", "B": "1/4", "C": "1/3", "D": "2/5"},
    "answer": "A"
  },
  {
    "id": 51,
    "question": "A jar has 5 red and 5 blue marbles. What is the probability of red?",
    "options": {"A": "1/2", "B": "1/3", "C": "1/5", "D": "2/5"},
    "answer": "A"
  },
  {
    "id": 52,
    "question": "You roll a die. Probability of getting a prime number?",
    "options": {"A": "1/2", "B": "1/3", "C": "2/3", "D": "3/6"},
    "answer": "A"
  },
  {
    "id": 53,
    "question": "A bag contains 2 red, 3 green, and 5 blue. Probability of green?",
    "options": {"A": "1/3", "B": "3/10", "C": "1/2", "D": "2/5"},
    "answer": "B"
  },
  {
    "id": 54,
    "question": "If a card is drawn, probability of an ace?",
    "options": {"A": "1/13", "B": "1/52", "C": "1/4", "D": "4/52"},
    "answer": "A"
  },
  {
    "id": 55,
    "question": "Rolling two dice: probability both show even?",
    "options": {"A": "1/4", "B": "1/2", "C": "1/3", "D": "1/6"},
    "answer": "A"
  },
  {
    "id": 56,
    "question": "A bag has 4 red and 6 black marbles. Probability of black?",
    "options": {"A": "3/5", "B": "1/2", "C": "2/5", "D": "4/5"},
    "answer": "A"
  },
  {
    "id": 57,
    "question": "A die is rolled. Probability of an odd number greater than 3?",
    "options": {"A": "1/6", "B": "1/3", "C": "1/2", "D": "2/3"},
    "answer": "B"
  },
  {
    "id": 58,
    "question": "Drawing one card: probability it’s not a spade?",
    "options": {"A": "1/4", "B": "3/4", "C": "1/3", "D": "2/3"},
    "answer": "B"
  },
  {
    "id": 59,
    "question": "Flipping 3 coins: probability of 2 heads?",
    "options": {"A": "1/4", "B": "1/2", "C": "3/8", "D": "3/4"},
    "answer": "C"
  },
  {
    "id": 60,
    "question": "A number is chosen from 1–9. Probability it’s less than 4?",
    "options": {"A": "1/3", "B": "1/2", "C": "2/3", "D": "1/4"},
    "answer": "A"
  },
  {
    "id": 61,
    "question": "Spinner has 5 sections: 2 red, 1 blue, 1 green, 1 yellow. P(red)?",
    "options": {"A": "1/5", "B": "2/5", "C": "3/5", "D": "4/5"},
    "answer": "B"
  },
  {
    "id": 62,
    "question": "You draw 1 marble from a bag with 3 red, 3 green, and 4 blue. P(green)?",
    "options": {"A": "1/4", "B": "3/10", "C": "1/2", "D": "2/5"},
    "answer": "B"
  },
  {
    "id": 63,
    "question": "If a month is chosen at random, P(it has 31 days)?",
    "options": {"A": "5/12", "B": "7/12", "C": "1/2", "D": "1/3"},
    "answer": "A"
  },
  {
    "id": 64,
    "question": "Flipping two coins: probability both tails?",
    "options": {"A": "1/4", "B": "1/2", "C": "3/4", "D": "1/8"},
    "answer": "A"
  },
  {
    "id": 65,
    "question": "Picking a letter from 'PROBABILITY'. Probability of P?",
    "options": {"A": "1/10", "B": "2/11", "C": "1/11", "D": "2/10"},
    "answer": "B"
  },
  {
    "id": 66,
    "question": "A bag has 10 marbles: 3 red, 3 green, 4 blue. P(not blue)?",
    "options": {"A": "1/2", "B": "6/10", "C": "3/10", "D": "2/5"},
    "answer": "B"
  },
  {
    "id": 67,
    "question": "You pick a number from 1–12. P(multiple of 3)?",
    "options": {"A": "1/4", "B": "1/3", "C": "1/2", "D": "2/3"},
    "answer": "B"
  },
  {
    "id": 68,
    "question": "A spinner has 6 sections, numbered 1–6. P(number > 2)?",
    "options": {"A": "1/3", "B": "2/3", "C": "1/2", "D": "5/6"},
    "answer": "B"
  },
  {
    "id": 69,
    "question": "If two dice are rolled, the probability that both show 1?",
    "options": {"A": "1/36", "B": "1/6", "C": "1/12", "D": "1/18"},
    "answer": "A"
  },
  {
    "id": 70,
    "question": "A bag has 4 yellow, 3 red, 3 blue marbles. P(red or blue)?",
    "options": {"A": "1/2", "B": "3/5", "C": "2/3", "D": "1/3"},
    "answer": "B"
  },
  {
    "id": 71,
    "question": "Drawing a card: P(black card)?",
    "options": {"A": "1/2", "B": "1/4", "C": "1/13", "D": "3/4"},
    "answer": "A"
  },
  {
    "id": 72,
    "question": "A die is rolled. P(a number less than or equal to 4)?",
    "options": {"A": "1/3", "B": "2/3", "C": "1/2", "D": "4/6"},
    "answer": "D"
  },
  {
    "id": 73,
    "question": "Two dice are rolled. P(sum equals 11)?",
    "options": {"A": "1/6", "B": "1/12", "C": "1/18", "D": "1/36"},
    "answer": "B"
  },
  {
    "id": 74,
    "question": "A spinner has 5 equal sections labeled 1–5. P(spinning 5)?",
    "options": {"A": "1/2", "B": "1/5", "C": "1/3", "D": "1/4"},
    "answer": "B"
  },
  {
    "id": 75,
    "question": "A card is drawn. P(king or queen)?",
    "options": {"A": "1/13", "B": "1/26", "C": "2/13", "D": "1/6"},
    "answer": "C"
  },
    {
    "id": 76,
    "question": "Two coins are tossed. What is the probability of getting at least one tail?",
    "options": {"A": "1/4", "B": "1/2", "C": "3/4", "D": "1"},
    "answer": "C"
  },
  {
    "id": 77,
    "question": "A die is rolled twice. What is the probability that both rolls show even numbers?",
    "options": {"A": "1/4", "B": "1/3", "C": "1/9", "D": "1/2"},
    "answer": "A"
  },
  {
    "id": 78,
    "question": "A bag has 3 red and 2 blue marbles. Two marbles are drawn without replacement. What is the probability both are red?",
    "options": {"A": "3/10", "B": "2/5", "C": "3/5", "D": "1/2"},
    "answer": "A"
  },
  {
    "id": 79,
    "question": "A number is chosen from 1–20. What is the probability that it is both even and greater than 10?",
    "options": {"A": "1/4", "B": "1/5", "C": "1/2", "D": "2/5"},
    "answer": "A"
  },
  {
    "id": 80,
    "question": "A jar has 5 green, 4 red, and 1 yellow marble. If one is drawn, what is the probability it is not green?",
    "options": {"A": "1/2", "B": "1/5", "C": "2/5", "D": "1/3"},
    "answer": "C"
  },
  {
    "id": 81,
    "question": "You roll a die and flip a coin. What is the probability of getting a 6 and heads?",
    "options": {"A": "1/6", "B": "1/12", "C": "1/2", "D": "1/3"},
    "answer": "B"
  },
  {
    "id": 82,
    "question": "Two dice are rolled. What is the probability that the sum is less than 5?",
    "options": {"A": "1/6", "B": "1/9", "C": "1/4", "D": "2/9"},
    "answer": "A"
  },
  {
    "id": 83,
    "question": "A bag has 6 red and 4 blue marbles. Two marbles are drawn with replacement. What is the probability both are red?",
    "options": {"A": "9/25", "B": "3/10", "C": "36/100", "D": "1/2"},
    "answer": "C"
  },
  {
    "id": 84,
    "question": "A card is drawn from a deck. What is the probability it is a black queen?",
    "options": {"A": "1/26", "B": "1/13", "C": "1/52", "D": "1/4"},
    "answer": "A"
  },
  {
    "id": 85,
    "question": "You roll one die. What is the probability of getting a number that is both even and prime?",
    "options": {"A": "1/6", "B": "1/3", "C": "1/2", "D": "0"},
    "answer": "A"
  },
  {
    "id": 86,
    "question": "A spinner has 6 equal sections numbered 1–6. If spun twice, what is the probability the product is even?",
    "options": {"A": "1/4", "B": "1/2", "C": "3/4", "D": "5/6"},
    "answer": "C"
  },
  {
    "id": 87,
    "question": "From numbers 1–12, what is the probability of choosing a number divisible by 2 or 3?",
    "options": {"A": "1/2", "B": "2/3", "C": "3/4", "D": "5/12"},
    "answer": "B"
  },
  {
    "id": 88,
    "question": "Two cards are drawn without replacement from a 52-card deck. What is the probability that both are hearts?",
    "options": {"A": "1/16", "B": "1/17", "C": "1/17.3", "D": "1/17.7"},
    "answer": "D"
  },
  {
    "id": 89,
    "question": "A coin is flipped 3 times. What is the probability of getting exactly 2 heads?",
    "options": {"A": "1/4", "B": "3/8", "C": "1/2", "D": "1/8"},
    "answer": "B"
  },
  {
    "id": 90,
    "question": "A bag has 4 red, 5 blue, and 1 green marble. What is the probability of not getting blue?",
    "options": {"A": "1/2", "B": "1/5", "C": "1/2", "D": "1/2"},
    "answer": "A"
  },
  {
    "id": 91,
    "question": "Two dice are rolled. What is the probability that both numbers are the same?",
    "options": {"A": "1/6", "B": "1/12", "C": "1/36", "D": "1/3"},
    "answer": "A"
  },
  {
    "id": 92,
    "question": "A jar has 3 red, 2 blue, 5 green marbles. Two are drawn without replacement. P(one red and one blue)?",
    "options": {"A": "3/45", "B": "6/45", "C": "3/20", "D": "1/5"},
    "answer": "C"
  },
  {
    "id": 93,
    "question": "A deck of cards is used. What is the probability of drawing a card that is not a face card?",
    "options": {"A": "9/13", "B": "10/13", "C": "3/13", "D": "1/4"},
    "answer": "A"
  },
  {
    "id": 94,
    "question": "If three coins are tossed, what is the probability of all tails or all heads?",
    "options": {"A": "1/2", "B": "1/4", "C": "1/8", "D": "1/6"},
    "answer": "B"
  },
  {
    "id": 95,
    "question": "A die is rolled and a card drawn. What is the probability of getting a 6 and a heart?",
    "options": {"A": "1/12", "B": "1/24", "C": "1/26", "D": "1/52"},
    "answer": "B"
  },
  {
    "id": 96,
    "question": "A bag has 4 white, 3 red, and 3 blue marbles. Two are drawn without replacement. P(both same color)?",
    "options": {"A": "10/45", "B": "19/45", "C": "20/45", "D": "9/45"},
    "answer": "B"
  },
  {
    "id": 97,
    "question": "From digits 1–9, what is the probability of randomly choosing a prime number?",
    "options": {"A": "4/9", "B": "1/3", "C": "5/9", "D": "2/9"},
    "answer": "C"
  },
  {
    "id": 98,
    "question": "You roll two dice. What is the probability that the sum is a multiple of 4?",
    "options": {"A": "1/4", "B": "1/3", "C": "5/18", "D": "1/2"},
    "answer": "C"
  },
  {
    "id": 99,
    "question": "If a letter is picked from 'STATISTICS', what is the probability of choosing 'S'?",
    "options": {"A": "2/10", "B": "3/10", "C": "4/10", "D": "5/10"},
    "answer": "B"
  },
  {
    "id": 100,
    "question": "A bag has 2 red, 2 green, and 1 blue marble. If two marbles are drawn without replacement, P(one red and one green)?",
    "options": {"A": "4/10", "B": "2/5", "C": "1/2", "D": "3/10"},
    "answer": "B"
  }
]    
  
}
