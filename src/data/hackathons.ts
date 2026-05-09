export type Hackathon = {
  slug: string;
  name: string;
  org: string;
  period: string;
  outcome: "Winner" | "Finalist" | "Participant";
  summary: string;
  pitchUrl?: string;
};

export const hackathons: readonly Hackathon[] = [
  {
    slug: "dotslash-7",
    name: "DotSlash 7.0",
    org: "PDEU",
    period: "2024",
    outcome: "Winner",
    summary: "Won one of Gujarat's largest hackathons. 36-hour build, judged on craft and impact.",
    pitchUrl: "https://www.youtube.com/watch?v=Rek1IgqjLfw&t=253s",
  },
  {
    slug: "shipmnts-internal",
    name: "Shipmnts Internal Hackathon",
    org: "Shipmnts",
    period: "2024",
    outcome: "Winner",
    summary: "Won the internal team hackathon at Shipmnts. Built and shipped in a single sprint with the platform team.",
    pitchUrl: "https://youtu.be/cQOSwSpTh9Q",
  },
];
