import { useState, type FormEvent } from "react";
import { useSite } from "@/lib/site-store";

const EMPTY = { name: "", phone: "", email: "", service: "", message: "" };

export function ContactForm() {
  const { data } = useSite();
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);

  const field =
    "w-full border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-brass";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm(EMPTY);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`mt-2 ${field}`}
            placeholder="Your full name"
          />
        </label>
        <label className="block">
          <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Phone</span>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`mt-2 ${field}`}
            placeholder="10-digit mobile number"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Email</span>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={`mt-2 ${field}`}
          placeholder="you@example.com"
        />
      </label>
      <label className="block">
        <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
          Service Required
        </span>
        <select
          required
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className={`mt-2 ${field}`}
        >
          <option value="">Select a service</option>
          {data.services.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Message</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`mt-2 ${field} resize-none`}
          placeholder="Tell us about your space and requirement"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-charcoal px-8 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-background transition-colors hover:bg-walnut"
      >
        Send Enquiry
      </button>

      {sent ? (
        <p className="animate-fade-up border border-brass/40 bg-brass/10 px-5 py-4 text-sm text-foreground">
          Thank you — your enquiry has been received. This is a demo form, so no data is stored or
          sent. Please call {data.contact.phone} for an immediate response.
        </p>
      ) : null}
    </form>
  );
}