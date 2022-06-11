import type { ITip } from "@reputable/types";

export default function calculateContributions(tips: ITip[] = []) {
  const contributions: {
    tokensMatched: Record<string, number>;
    tokensTipped: number;
  } = tips.reduce(
    (prev, curr) => {
      if (prev.tokensMatched[curr.userId] !== undefined) {
        prev.tokensMatched[curr.userId] =
          prev.tokensMatched[curr.userId] + curr.amount;
      } else {
        prev.tokensMatched[curr.userId] = curr.amount;
      }
      return {
        ...prev,
        tokensTipped: (prev.tokensTipped += curr.amount),
      };
    },
    {
      tokensMatched: {},
      tokensTipped: 0,
    }
  );
  const matchedAmount = Math.pow(
    Object.values(contributions.tokensMatched).reduce(
      (prev, curr) => (prev += Math.sqrt(curr)),
      0
    ),
    2
  ).toFixed(2);
  const totalTokens = (
    parseFloat(matchedAmount) + contributions.tokensTipped
  ).toFixed(0);
  return {
    totalTokens,
    matchedAmount,
    tokensTipped: contributions.tokensTipped,
  };
}
