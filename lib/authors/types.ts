export interface CanonAuthor {
  id: string;
  slug: string;
  name: string;
  image?: string;
  birthYear?: number;
  deathYear?: number;
  region: string;
  civilization: string;
  era: string;

  briefHistory: string;
  keyFacts: string[];
  earlyLife?: string;
  riseToProminence?: string;
  religion?: string;
  challenges?: string;
  legacy: string;
  deathAndSuccession?: string;

  bookSlugs: string[];

  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
