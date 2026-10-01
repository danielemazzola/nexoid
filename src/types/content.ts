import type { IconName } from "../components/ui/Icon";

export interface LinkItem {
  id: string;
  title: string;
  path: string;
}

export interface Cta {
  text: string;
  href: string;
}

export type ConsoleStatus = "run" | "ok" | "warn";
export type RiskLevel = "risk" | "warn" | "info";

export interface SiteData {
  name: string;
  email: string;
  website: string;
  tagline: string;
  owner: { name: string; nif: string; address: string; registry?: string };
  navigation: LinkItem[];
  cta: Cta;
  clientArea: { text: string; href: string };
  legal: LinkItem[];
  stack: string[];
}

export interface IconItem {
  id: string;
  text: string;
  icon: IconName;
}

export interface ServiceItem {
  id: string;
  icon: IconName;
  tag: string;
  title: string;
  description: string;
  points: string[];
}

export interface SolutionItem {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  license: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  step: string;
  icon: IconName;
  title: string;
  description: string;
}

interface SectionCopy {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface CompanyData {
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    primaryButton: Cta;
    secondaryButton: Cta;
  };
  console: {
    title: string;
    label: string;
    lines: { status: ConsoleStatus; text: string }[];
    scoreLabel: string;
    scoreFrom: number;
    scoreTo: number;
  };
  stats: { id: string; value: string; label: string }[];
  problems: SectionCopy & { items: { id: string; text: string; level: RiskLevel }[] };
  services: SectionCopy & { button: Cta; items: ServiceItem[] };
  solutions: SectionCopy & { licenseNote: string; items: SolutionItem[] };
  target: SectionCopy & { items: IconItem[] };
  why: SectionCopy & { items: IconItem[] };
  process: SectionCopy & { items: ProcessStep[] };
  faq: SectionCopy & { items: FaqItem[] };
  cta: { title: string; description: string; button: Cta };
}
