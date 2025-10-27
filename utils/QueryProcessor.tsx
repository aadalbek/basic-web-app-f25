export default function QueryProcessor(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (lower.includes("plus")) {
    // Extract numbers from the query
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const sum = Number(numbers[0]) + Number(numbers[1]);
      return sum.toString();
    }
    return "Could not find two numbers to add.";
  }

  if (lower.includes("largest")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const largest = Math.max(...numbers.map(Number));
      return largest.toString();
    }
    return "Could not find any numbers to compare.";
  }

  return "";
}
