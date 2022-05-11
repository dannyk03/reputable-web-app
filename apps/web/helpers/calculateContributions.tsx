import type { ITip } from "@reputable/types";

export default function calculateContributions(tips: ITip[] = []) {
  const contributions: {
    tokensMatched: number;
    tokensTipped: number;
  } = tips.reduce(
    (prev, curr) => ({
      tokensMatched: (prev.tokensMatched += Math.sqrt(curr.amount)),
      tokensTipped: (prev.tokensTipped += curr.amount),
    }),
    {
      tokensMatched: 0,
      tokensTipped: 0,
    }
  );
  const matchedAmount = (
    contributions.tokensMatched * contributions.tokensMatched
  ).toFixed(2);
  const totalTokens = (
    parseFloat(matchedAmount) + contributions.tokensTipped
  ).toFixed(2);
  return {
    totalTokens,
    matchedAmount,
    tokensTipped: contributions.tokensTipped,
  };
}
