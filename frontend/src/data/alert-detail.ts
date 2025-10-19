export const alertDetailData = {
    "alert-001": {
      id: "alert-001",
      title: "CTR down 28% for FB Ad Set A",
      summary:
        "CTR drop started 2 hours ago. Top driver likely landing page error or creative fatigue.",
      score: 78,
      confidence: 72,
      kpis: ["CVR", "Revenue"],
      sources: [
        {
          id: "s1",
          type: "tweet",
          author: "@x",
          text: "...",
          link: "...",
          reach: 20000,
          trust: "medium",
          snapshotUrl: "/mocks/s1.png",
        },
        {
          id: "s2",
          type: "article",
          source: "example.com",
          title: "...",
          link: "...",
          reach: 1200,
          trust: "high",
        },
      ],
      recommendedPlaybooks: [
        {
          id: "pb-1",
          title: "Pause creative A + switch to B",
          cost: 1200,
          expectedChange: "CVR +4% (CI 1–7%)",
          confidence: 60,
        },
      ],
    },
  };