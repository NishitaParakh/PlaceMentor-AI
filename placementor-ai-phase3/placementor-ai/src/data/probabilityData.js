// Dummy historical trend behind the Placement Probability card.
// This is sample data for the UI only — see the "Demo AI Prediction"
// label wherever it's shown, and README.md for how a real prediction
// endpoint will replace it later.

export const probabilityTrend = [
  { month: "Jan", probability: 62 },
  { month: "Feb", probability: 65 },
  { month: "Mar", probability: 67 },
  { month: "Apr", probability: 70 },
  { month: "May", probability: 73 },
  { month: "Jun", probability: 78 },
];

export const probabilityMeta = {
  current: 78,
  previous: 72,
  changePercent: 8.4,
  note: "Based on current profile, skills and preparation progress.",
};
