import type { ReactNode } from "react";
import { imageOptions, resolveImage } from "@/data/images";

export const inputClass =
  "mt-2 w-full border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brass";

export function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} resize-y leading-relaxed`}
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/**
 * Image picker: choose an image from the local registry or paste a custom URL.
 * `usedElsewhere` keys are flagged so the same image is not assigned twice.
 */
export function ImageField({
  label,
  value,
  onChange,
  usedElsewhere = [],
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  usedElsewhere?: string[];
  }) {
  const taken = new Set(usedElsewhere.filter((k) => k !== value));
  const duplicate = taken.has(value);

  return (
    <div>
      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-2 flex gap-4">
        <img
          src={resolveImage(value)}
          alt=""
          className="h-20 w-28 shrink-0 border border-border object-cover"
        />
        <div className="min-w-0 flex-1 space-y-2">
          <select
            value={taken.has(value) || imageOptions.some((o) => o.id === value) ? value : "__custom"}
            onChange={(e) => e.target.value !== "__custom" && onChange(e.target.value)}
            className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brass"
          >
            <option value="__custom">Custom URL…</option>
            {imageOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.id}
                {taken.has(o.id) ? " (already used)" : ""}
              </option>
            ))}
          </select>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image key or https://…"
            className="w-full border border-border bg-background px-3 py-2 text-xs outline-none focus:border-brass"
          />
        </div>
      </div>
      {duplicate ? (
        <p className="mt-2 text-xs text-destructive">
          This image is already used elsewhere — pick a unique one.
        </p>
      ) : null}
    </div>
  );
}

export function AdminCard({
  title,
  children,
  actions,
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="border border-border bg-background">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h2 className="font-display text-xl">{title}</h2>
        {actions}
      </header>
      <div className="space-y-6 p-5">{children}</div>
    </section>
  );
}

export function AdminButton({
  children,
  onClick,
  variant = "solid",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline" | "danger";
  type?: "button" | "submit";
}) {
  const styles = {
    solid: "bg-charcoal text-background hover:opacity-90",
    outline: "border border-border text-foreground hover:border-brass hover:text-brass",
    danger: "border border-destructive/40 text-destructive hover:bg-destructive/10",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.2em] transition-all ${styles}`}
    >
      {children}
    </button>
  );
}

export function Modal({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/60 p-4 py-10">
      <div className="w-full max-w-2xl animate-fade-up border border-border bg-background">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="font-display text-xl">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-xl leading-none text-muted-foreground transition-colors hover:text-brass"
          >
            ×
          </button>
        </header>
        <div className="space-y-5 p-5">{children}</div>
        {footer ? (
          <footer className="flex justify-end gap-3 border-t border-border px-5 py-4">{footer}</footer>
        ) : null}
      </div>
    </div>
  );
}

export function ListRow({
  title,
  subtitle,
  image,
  onEdit,
  onDelete,
  extra,
}: {
  title: string;
  subtitle: string;
  image?: string;
  onEdit: () => void;
  onDelete: () => void;
  extra?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 border border-border p-4">
      {image ? (
        <img src={resolveImage(image)} alt="" className="h-14 w-20 shrink-0 object-cover" />
      ) : null}
      <div className="min-w-[10rem] flex-1">
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      </div>
      {extra}
      <div className="flex gap-2">
        <AdminButton variant="outline" onClick={onEdit}>
          Edit
        </AdminButton>
        <AdminButton variant="danger" onClick={onDelete}>
          Delete
        </AdminButton>
      </div>
    </div>
  );
}
