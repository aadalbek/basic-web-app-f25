export default function QueryProcessor(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.includes("largest")) {
    const matches = query.match(/-?\d+/g);
    if (!matches) return "";
    const numbers = matches.map(Number);
    const largest = Math.max(...numbers);
    return String(largest);
  }

  if (query.toLowerCase().includes("plus")) {
    const nums = query.match(/\d+/g);
    if (!nums || nums.length < 2) {
      return "Could not find two numbers to add.";
   }

    const numbers = nums.map(Number);
    const result = numbers.reduce((sum, n) => sum + n, 0);

    return result.toString();
  }

  if (query.toLowerCase().includes("both a square and a cube")) {
    const matches = query.match(/\d+/g);
    if (!matches) return "";

    const numbers = matches.map(Number);
    const results = numbers.filter((n) => {
      const root = Math.round(Math.pow(n, 1 / 6)); // 6th root
      return Math.pow(root, 6) === n;
    });

    return results.length > 0
      ? results.join(", ")
      : "No numbers are both a square and a cube.";
  }


  if (query.includes("times") || query.includes("multiplied by")) {
    const nums = query.match(/\d+/g);
    if (!nums || nums.length < 2) return "";
    return String(Number(nums[0]) * Number(nums[1]));
  }

  if (query.toLowerCase().includes("power of")) {
    const nums = query.match(/\d+/g);
    if (!nums || nums.length < 2) {
      return "Could not find base and exponent.";
    }

    const [base, exponent] = nums.map(Number);
    const result = Math.pow(base, exponent);

  // Handle very large numbers safely (to avoid 'Infinity')
    if (!isFinite(result)) {
      return "Result is too large to represent.";
    }

    return result.toString();
  }


  if (query.toLowerCase().includes("scrabble score")) {
    const wordMatch = query.match(/[a-zA-Z]+/g);
    if (!wordMatch) return "No word found.";

  // Find the last word (e.g. "september")
    const word = wordMatch[wordMatch.length - 1].toLowerCase();

    const scores: Record<string, number> = {
      a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, s: 1, t: 1, r: 1,
      d: 2, g: 2,
      b: 3, c: 3, m: 3, p: 3,
      f: 4, h: 4, v: 4, w: 4, y: 4,
      k: 5,
      j: 8, x: 8,
      q: 10, z: 10,
    };

    let total = 0;
    for (const letter of word) {
      total += scores[letter] || 0;
    }

    return total.toString();
  }

  if (
    query.toLowerCase().includes("plus") ||
    query.toLowerCase().includes("minus") ||
    query.toLowerCase().includes("multiplied") ||
    query.toLowerCase().includes("times") ||
    query.toLowerCase().includes("divided")
  ) {
  // Replace words with math operators
    let expr = query
      .toLowerCase()
      .replace(/[^0-9+\-*/(). ]/g, " ") // remove extra words
      .replace(/\bplus\b/g, "+")
      .replace(/\bminus\b/g, "-")
      .replace(/\bmultiplied by\b/g, "*")
      .replace(/\btimes\b/g, "*")
      .replace(/\bdivided by\b/g, "/");

    try {
      // Safely evaluate the expression
      const result = Function(`"use strict"; return (${expr});`)();
      return String(result);
    } catch {
      return "Could not calculate expression.";
    }
  }

  if (query.toLowerCase().includes("anagram of")) {
  // Extract the target word (after "anagram of")
    const targetMatch = query.match(/anagram of (\w+)/i);
    if (!targetMatch) return "No target word found.";
    const target = targetMatch[1].toLowerCase();

  // Extract the candidate words (after the colon)
    const listMatch = query.split(":")[1];
    if (!listMatch) return "No candidate words found.";
    const candidates = listMatch.split(",").map(w => w.trim().toLowerCase());

  // Function to sort letters
    const sortLetters = (word: string) => word.split("").sort().join("");

    const anagrams = candidates.filter(word => sortLetters(word) === sortLetters(target));

    return anagrams.length > 0 ? anagrams.join(", ") : "No anagrams found.";
  }





  return "";
}
