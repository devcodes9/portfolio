export type Extracurricular = {
  slug: string;
  role: string;
  org: string;
  period: string;
  summary: string;
  url?: string;
};

export const extracurriculars: readonly Extracurricular[] = [
  {
    slug: "encode-pdeu",
    role: "Tech Head",
    org: "Encode · PDEU",
    period: "Sep 2021 — May 2023",
    summary: "Led the technical team of PDEU's Computer Science club. Organized hackathons, ran workshops on web/mobile/backend, mentored juniors.",
    url: "https://pdpu.ac.in/",
  },
  {
    slug: "bullsandbears-pdpu",
    role: "Technical Team",
    org: "BullsandBears · PDPU",
    period: "Dec 2020 — May 2023",
    summary: "Technical contributor to PDPU's finance and entrepreneurship club. Built and maintained the team's web presence.",
  },
];
