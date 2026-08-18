import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {label ? (
        <span
          className={cn(
            "rule-label",
            align === "center" && "justify-center",
            tone === "light" && "text-beige",
          )}
        >
          {label}
        </span>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-3xl leading-[1.15] sm:text-4xl lg:text-5xl",
          tone === "light" ? "text-background" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            tone === "light" ? "text-beige/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}