// Central image registry. Every entry is a UNIQUE asset used in exactly one
// place on the website. Replace the import to swap an image later.
import heroKitchen from "@/assets/hero-kitchen.jpg";
import aboutWorkshop from "@/assets/about-workshop.jpg";
import aboutInterior from "@/assets/about-interior.jpg";
import serviceKitchen from "@/assets/service-kitchen.jpg";
import serviceWardrobe from "@/assets/service-wardrobe.jpg";
import serviceTvUnit from "@/assets/service-tv-unit.jpg";
import serviceFurniture from "@/assets/service-furniture.jpg";
import serviceResidential from "@/assets/service-residential.jpg";
import project01 from "@/assets/project-01.jpg";
import project01b from "@/assets/project-01-b.jpg";
import project02 from "@/assets/project-02.jpg";
import project02b from "@/assets/project-02-b.jpg";
import project03 from "@/assets/project-03.jpg";
import project03b from "@/assets/project-03-b.jpg";
import project04 from "@/assets/project-04.jpg";
import project04b from "@/assets/project-04-b.jpg";
import project05 from "@/assets/project-05.jpg";
import project05b from "@/assets/project-05-b.jpg";
import project06 from "@/assets/project-06.jpg";
import project06b from "@/assets/project-06-b.jpg";
import ctaBanner from "@/assets/cta-banner.jpg";
import processPlanning from "@/assets/process-planning.jpg";

export const images = {
  heroKitchen,
  aboutWorkshop,
  aboutInterior,
  serviceKitchen,
  serviceWardrobe,
  serviceTvUnit,
  serviceFurniture,
  serviceResidential,
  project01,
  project01b,
  project02,
  project02b,
  project03,
  project03b,
  project04,
  project04b,
  project05,
  project05b,
  project06,
  project06b,
  ctaBanner,
  processPlanning,
} as const;

export type ImageKey = keyof typeof images;

/** Options for admin image pickers — id + resolved url. */
export const imageOptions = (Object.keys(images) as ImageKey[]).map((key) => ({
  id: key,
  url: images[key],
}));

/** Accepts a registry key or a raw URL and returns a usable src. */
export function resolveImage(value: string): string {
  return (images as Record<string, string>)[value] ?? value;
}