export const decisionEvaluationData = {
    verdict: "run_experiment",
    confidence: 62,
    reasons: [
      "Google ROAS historically higher",
      "Competitor shifting bids",
      "Traffic seasonality favors search",
    ],
    scenarios: {
      pessimistic: { revenue: "-1%", prob: 0.2 },
      baseline: { revenue: "+5%", prob: 0.6 },
      optimistic: { revenue: "+9%", prob: 0.2 },
    },
    experimentBlueprint: {
      sampleSize: 15000,
      durationDays: 7,
      trafficSplit: "30%->Google",
    },
  };