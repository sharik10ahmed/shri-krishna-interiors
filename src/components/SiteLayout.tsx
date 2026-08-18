import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  label,
  title,
  text,
  image,
}: {
  label: string;
  title: string;
  text?: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={image}
        alt={title}
        width={1600}
        height={900}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-charcoal/75" />
      <div className="container-x pb-20 pt-40 lg:pb-28 lg:pt-48">
        <span className="rule-label">{label}</span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.1] text-background sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {text ? (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-beige/85">{text}</p>
        ) : null}
      </div>
    </section>
  );
}
