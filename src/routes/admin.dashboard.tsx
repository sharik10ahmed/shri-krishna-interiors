import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isSignedIn, signOut } from "@/lib/admin-auth";
import { useSite } from "@/lib/site-store";
import { PROJECT_CATEGORIES, type Faq, type Project, type Service, type Testimonial } from "@/data/site-data";
import { resolveImage } from "@/data/images";
import {
  AdminButton,
  AdminCard,
  Field,
  ImageField,
  ListRow,
  Modal,
  SelectField,
  TextArea,
} from "@/components/admin/AdminUI";

const TITLE = "Admin Dashboard | Shri Krishna Kitchen And Interior";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "Demo content management dashboard." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: "Demo content management dashboard." },
    ],
  }),
  component: AdminDashboard,
});

const SECTIONS = [
  "Dashboard",
  "Hero Section",
  "About",
  "Services",
  "Projects",
  "Testimonials",
  "FAQ",
  "Contact Information",
  "Website Settings",
] as const;

type Section = (typeof SECTIONS)[number];

const uid = () => Math.random().toString(36).slice(2, 9);

function AdminDashboard() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [section, setSection] = useState<Section>("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isSignedIn()) {
      navigate({ to: "/admin/login", replace: true });
    } else {
      setReady(true);
    }
  }, [navigate]);

  if (!ready) return null;

  function logout() {
    signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  return (
    <div className="min-h-screen bg-ivory font-sans lg:flex">
      {/* Sidebar */}
      <aside className="bg-charcoal text-beige/75 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0">
        <div className="flex items-center justify-between px-6 py-5 lg:block">
          <div>
            <p className="font-display text-lg text-background">Shri Krishna</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.26em] text-brass">
              Admin Panel · Demo
            </p>
          </div>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-[0.66rem] uppercase tracking-[0.2em] lg:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        <nav
          className={`${menuOpen ? "block" : "hidden"} border-t border-background/10 pb-6 lg:block lg:border-t-0`}
        >
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSection(s);
                setMenuOpen(false);
              }}
              className={`block w-full px-6 py-3 text-left text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${
                section === s ? "bg-background/10 text-brass" : "hover:text-background"
              }`}
            >
              {s}
            </button>
          ))}
          <button
            onClick={logout}
            className="block w-full px-6 py-3 text-left text-[0.7rem] uppercase tracking-[0.18em] text-destructive/80 transition-colors hover:text-destructive"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background px-6 py-5">
          <div>
            <h1 className="font-display text-2xl">{section}</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Changes are stored locally in your browser only — no database.
            </p>
          </div>
          <Link
            to="/"
            className="text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-brass"
          >
            View website →
          </Link>
        </header>

        <div className="space-y-8 p-6 lg:p-10">
          {section === "Dashboard" && <Overview onJump={setSection} />}
          {section === "Hero Section" && <HeroPanel />}
          {section === "About" && <AboutPanel />}
          {section === "Services" && <ServicesPanel />}
          {section === "Projects" && <ProjectsPanel />}
          {section === "Testimonials" && <TestimonialsPanel />}
          {section === "FAQ" && <FaqPanel />}
          {section === "Contact Information" && <ContactPanel />}
          {section === "Website Settings" && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Dashboard overview ---------------- */

function Overview({ onJump }: { onJump: (s: Section) => void }) {
  const { data } = useSite();
  const stats: { label: string; value: number; section: Section }[] = [
    { label: "Total Projects", value: data.projects.length, section: "Projects" },
    { label: "Total Services", value: data.services.length, section: "Services" },
    { label: "Testimonials", value: data.testimonials.length, section: "Testimonials" },
    { label: "FAQs", value: data.faqs.length, section: "FAQ" },
  ];

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => onJump(s.section)}
            className="group border border-border bg-background p-6 text-left transition-all hover:-translate-y-1 hover:border-brass"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-4 font-display text-5xl text-charcoal">{s.value}</p>
            <p className="mt-4 text-[0.62rem] uppercase tracking-[0.2em] text-brass opacity-0 transition-opacity group-hover:opacity-100">
              Manage →
            </p>
          </button>
        ))}
      </div>

      <AdminCard title="Recently added projects">
        <div className="space-y-3">
          {data.projects.slice(0, 4).map((p) => (
            <div key={p.id} className="flex items-center gap-4 border border-border p-4">
              <img src={resolveImage(p.image)} alt="" className="h-14 w-20 object-cover" />
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.category} · {p.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </>
  );
}

/* ---------------- Hero ---------------- */

function HeroPanel() {
  const { data, update } = useSite();
  const [form, setForm] = useState(data.hero);
  const set = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      <AdminCard
        title="Hero content"
        actions={
          <AdminButton
            onClick={() => {
              update({ hero: form });
              toast.success("Hero section updated");
            }}
          >
            Save changes
          </AdminButton>
        }
      >
        <Field label="Small heading" value={form.label} onChange={set("label")} />
        <Field label="Main heading" value={form.heading} onChange={set("heading")} />
        <TextArea label="Description" value={form.description} onChange={set("description")} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Primary CTA text" value={form.primaryCta} onChange={set("primaryCta")} />
          <Field label="Secondary CTA text" value={form.secondaryCta} onChange={set("secondaryCta")} />
        </div>
        <Field label="Trust line" value={form.trustLine} onChange={set("trustLine")} />
        <ImageField
          label="Banner image"
          value={form.image}
          onChange={set("image")}
          usedElsewhere={[data.about.image, data.about.pageImage, ...data.services.map((s) => s.image)]}
        />
      </AdminCard>

      <AdminCard title="Live preview">
        <div className="relative isolate flex min-h-[22rem] items-end overflow-hidden">
          <img
            src={resolveImage(form.image)}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-charcoal/70" />
          <div className="p-7">
            <p className="text-[0.6rem] uppercase tracking-[0.26em] text-brass">{form.label}</p>
            <p className="mt-4 font-display text-3xl leading-tight text-background">{form.heading}</p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-beige/85">{form.description}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-[0.62rem] uppercase tracking-[0.2em]">
              <span className="bg-brass px-4 py-2.5 text-charcoal">{form.primaryCta}</span>
              <span className="border border-background/40 px-4 py-2.5 text-background">
                {form.secondaryCta}
              </span>
            </div>
            <p className="mt-5 text-[0.6rem] uppercase tracking-[0.24em] text-beige/70">
              {form.trustLine}
            </p>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}

/* ---------------- About ---------------- */

function AboutPanel() {
  const { data, update } = useSite();
  const [form, setForm] = useState(data.about);
  const set = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <AdminCard
      title="About content"
      actions={
        <AdminButton
          onClick={() => {
            update({ about: form });
            toast.success("About section updated");
          }}
        >
          Save changes
        </AdminButton>
      }
    >
      <Field label="Home section heading" value={form.heading} onChange={set("heading")} />
      <Field label="About page heading" value={form.pageHeading} onChange={set("pageHeading")} />
      <TextArea label="Short description" value={form.description} onChange={set("description")} />
      <TextArea label="Long description" value={form.longDescription} onChange={set("longDescription")} rows={6} />
      <TextArea
        label="Features (one per line)"
        value={form.features.join("\n")}
        onChange={(v) => setForm({ ...form, features: v.split("\n").filter(Boolean) })}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <ImageField
          label="Home about image"
          value={form.image}
          onChange={set("image")}
          usedElsewhere={[data.hero.image, form.pageImage]}
        />
        <ImageField
          label="About page image"
          value={form.pageImage}
          onChange={set("pageImage")}
          usedElsewhere={[data.hero.image, form.image]}
        />
      </div>
    </AdminCard>
  );
}

/* ---------------- Services ---------------- */

const emptyService = (): Service => ({
  id: uid(),
  slug: "new-service",
  title: "New Service",
  description: "",
  image: "serviceKitchen",
  category: "Interiors",
  intro: "",
  points: [],
});

function ServicesPanel() {
  const { data, update } = useSite();
  const [editing, setEditing] = useState<Service | null>(null);
  const services = data.services;

  function save(item: Service) {
    const exists = services.some((s) => s.id === item.id);
    update({
      services: exists ? services.map((s) => (s.id === item.id ? item : s)) : [...services, item],
    });
    setEditing(null);
    toast.success(exists ? "Service updated" : "Service added");
  }

  return (
    <AdminCard
      title={`Services (${services.length})`}
      actions={<AdminButton onClick={() => setEditing(emptyService())}>Add service</AdminButton>}
    >
      <div className="space-y-3">
        {services.map((s) => (
          <ListRow
            key={s.id}
            image={s.image}
            title={s.title}
            subtitle={`${s.category} · /services/${s.slug}`}
            onEdit={() => setEditing(s)}
            onDelete={() => {
              update({ services: services.filter((x) => x.id !== s.id) });
              toast.success("Service deleted");
            }}
          />
        ))}
      </div>

      {editing ? (
        <ServiceModal
          item={editing}
          used={services.filter((s) => s.id !== editing.id).map((s) => s.image)}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      ) : null}
    </AdminCard>
  );
}

function ServiceModal({
  item,
  used,
  onClose,
  onSave,
}: {
  item: Service;
  used: string[];
  onClose: () => void;
  onSave: (s: Service) => void;
}) {
  const [form, setForm] = useState(item);
  const set = (k: keyof Service) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <Modal
      title={item.title ? `Edit — ${item.title}` : "Add service"}
      onClose={onClose}
      footer={
        <>
          <AdminButton variant="outline" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton onClick={() => onSave(form)}>Save</AdminButton>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" value={form.title} onChange={set("title")} />
        <Field label="Category" value={form.category} onChange={set("category")} />
      </div>
      <Field label="URL slug" value={form.slug} onChange={set("slug")} />
      <TextArea label="Card description" value={form.description} onChange={set("description")} />
      <TextArea label="Intro paragraph" value={form.intro} onChange={set("intro")} />
      <TextArea
        label="Highlights (one per line)"
        value={form.points.join("\n")}
        onChange={(v) => setForm({ ...form, points: v.split("\n").filter(Boolean) })}
        rows={6}
      />
      <ImageField label="Service image" value={form.image} onChange={set("image")} usedElsewhere={used} />
    </Modal>
  );
}

/* ---------------- Projects ---------------- */

const emptyProject = (): Project => ({
  id: `project-${uid()}`,
  title: "New Project",
  category: PROJECT_CATEGORIES[0],
  location: "",
  description: "",
  image: "project01",
  gallery: [],
  projectType: "",
  designStyle: "",
  materials: "",
  status: "Completed",
  features: [],
});

function ProjectsPanel() {
  const { data, update } = useSite();
  const [editing, setEditing] = useState<Project | null>(null);
  const projects = data.projects;

  function save(item: Project) {
    const exists = projects.some((p) => p.id === item.id);
    update({
      projects: exists ? projects.map((p) => (p.id === item.id ? item : p)) : [...projects, item],
    });
    setEditing(null);
    toast.success(exists ? "Project updated" : "Project added");
  }

  return (
    <AdminCard
      title={`Projects (${projects.length})`}
      actions={<AdminButton onClick={() => setEditing(emptyProject())}>Add project</AdminButton>}
    >
      <div className="space-y-3">
        {projects.map((p) => (
          <ListRow
            key={p.id}
            image={p.image}
            title={p.title}
            subtitle={`${p.category} · ${p.location || "No location"} · ${p.status}`}
            onEdit={() => setEditing(p)}
            onDelete={() => {
              update({ projects: projects.filter((x) => x.id !== p.id) });
              toast.success("Project deleted");
            }}
          />
        ))}
      </div>

      {editing ? (
        <ProjectModal
          item={editing}
          used={projects
            .filter((p) => p.id !== editing.id)
            .flatMap((p) => [p.image, ...p.gallery])}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      ) : null}
    </AdminCard>
  );
}

function ProjectModal({
  item,
  used,
  onClose,
  onSave,
}: {
  item: Project;
  used: string[];
  onClose: () => void;
  onSave: (p: Project) => void;
}) {
  const [form, setForm] = useState(item);
  const set = (k: keyof Project) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <Modal
      title={`Project — ${form.title}`}
      onClose={onClose}
      footer={
        <>
          <AdminButton variant="outline" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton onClick={() => onSave(form)}>Save</AdminButton>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Project name" value={form.title} onChange={set("title")} />
        <SelectField
          label="Category"
          value={form.category}
          onChange={set("category")}
          options={PROJECT_CATEGORIES}
        />
        <Field label="Location" value={form.location} onChange={set("location")} />
        <Field label="Project type" value={form.projectType} onChange={set("projectType")} />
        <Field label="Design style" value={form.designStyle} onChange={set("designStyle")} />
        <SelectField
          label="Completion status"
          value={form.status}
          onChange={set("status")}
          options={["Completed", "In Progress", "Planned"]}
        />
      </div>
      <TextArea label="Description" value={form.description} onChange={set("description")} />
      <TextArea label="Materials used" value={form.materials} onChange={set("materials")} rows={3} />
      <TextArea
        label="Key features (one per line)"
        value={form.features.join("\n")}
        onChange={(v) => setForm({ ...form, features: v.split("\n").filter(Boolean) })}
        rows={5}
      />
      <ImageField
        label="Main image"
        value={form.image}
        onChange={set("image")}
        usedElsewhere={[...used, ...form.gallery]}
      />

      <div className="space-y-4 border-t border-border pt-5">
        <div className="flex items-center justify-between">
          <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
            Additional images
          </p>
          <AdminButton
            variant="outline"
            onClick={() => setForm({ ...form, gallery: [...form.gallery, ""] })}
          >
            Add image
          </AdminButton>
        </div>
        {form.gallery.map((g, i) => (
          <div key={i} className="flex items-end gap-3">
            <div className="flex-1">
              <ImageField
                label={`Gallery image ${i + 1}`}
                value={g}
                onChange={(v) =>
                  setForm({ ...form, gallery: form.gallery.map((x, xi) => (xi === i ? v : x)) })
                }
                usedElsewhere={[...used, form.image, ...form.gallery.filter((_, xi) => xi !== i)]}
              />
            </div>
            <AdminButton
              variant="danger"
              onClick={() => setForm({ ...form, gallery: form.gallery.filter((_, xi) => xi !== i) })}
            >
              Remove
            </AdminButton>
          </div>
        ))}
      </div>
    </Modal>
  );
}

/* ---------------- Testimonials ---------------- */

function TestimonialsPanel() {
  const { data, update } = useSite();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const list = data.testimonials;

  function save(item: Testimonial) {
    const exists = list.some((t) => t.id === item.id);
    update({
      testimonials: exists ? list.map((t) => (t.id === item.id ? item : t)) : [...list, item],
    });
    setEditing(null);
    toast.success(exists ? "Testimonial updated" : "Testimonial added");
  }

  return (
    <AdminCard
      title={`Testimonials (${list.length})`}
      actions={
        <AdminButton
          onClick={() =>
            setEditing({ id: uid(), name: "", projectType: "", rating: 5, review: "" })
          }
        >
          Add testimonial
        </AdminButton>
      }
    >
      <div className="space-y-3">
        {list.map((t) => (
          <ListRow
            key={t.id}
            title={t.name || "Unnamed"}
            subtitle={`${t.projectType} · ${"★".repeat(t.rating)}`}
            onEdit={() => setEditing(t)}
            onDelete={() => {
              update({ testimonials: list.filter((x) => x.id !== t.id) });
              toast.success("Testimonial deleted");
            }}
          />
        ))}
      </div>

      {editing ? (
        <TestimonialModal item={editing} onClose={() => setEditing(null)} onSave={save} />
      ) : null}
    </AdminCard>
  );
}

function TestimonialModal({
  item,
  onClose,
  onSave,
}: {
  item: Testimonial;
  onClose: () => void;
  onSave: (t: Testimonial) => void;
}) {
  const [form, setForm] = useState(item);

  return (
    <Modal
      title="Testimonial (demo content)"
      onClose={onClose}
      footer={
        <>
          <AdminButton variant="outline" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton onClick={() => onSave(form)}>Save</AdminButton>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Customer name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
        />
        <Field
          label="Project type"
          value={form.projectType}
          onChange={(v) => setForm({ ...form, projectType: v })}
        />
      </div>
      <SelectField
        label="Rating"
        value={String(form.rating)}
        onChange={(v) => setForm({ ...form, rating: Number(v) })}
        options={["5", "4", "3", "2", "1"]}
      />
      <TextArea
        label="Review"
        value={form.review}
        onChange={(v) => setForm({ ...form, review: v })}
        rows={5}
      />
    </Modal>
  );
}

/* ---------------- FAQ ---------------- */

function FaqPanel() {
  const { data, update } = useSite();
  const [editing, setEditing] = useState<Faq | null>(null);
  const list = data.faqs;

  function move(index: number, dir: -1 | 1) {
    const next = [...list];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    update({ faqs: next });
  }

  function save(item: Faq) {
    const exists = list.some((f) => f.id === item.id);
    update({ faqs: exists ? list.map((f) => (f.id === item.id ? item : f)) : [...list, item] });
    setEditing(null);
    toast.success(exists ? "FAQ updated" : "FAQ added");
  }

  return (
    <AdminCard
      title={`FAQs (${list.length})`}
      actions={
        <AdminButton onClick={() => setEditing({ id: uid(), question: "", answer: "" })}>
          Add FAQ
        </AdminButton>
      }
    >
      <div className="space-y-3">
        {list.map((f, i) => (
          <ListRow
            key={f.id}
            title={f.question || "New question"}
            subtitle={f.answer.slice(0, 90) + (f.answer.length > 90 ? "…" : "")}
            onEdit={() => setEditing(f)}
            onDelete={() => {
              update({ faqs: list.filter((x) => x.id !== f.id) });
              toast.success("FAQ deleted");
            }}
            extra={
              <div className="flex gap-1">
                <button
                  onClick={() => move(i, -1)}
                  aria-label="Move up"
                  className="border border-border px-2.5 py-2 text-xs transition-colors hover:border-brass hover:text-brass"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(i, 1)}
                  aria-label="Move down"
                  className="border border-border px-2.5 py-2 text-xs transition-colors hover:border-brass hover:text-brass"
                >
                  ↓
                </button>
              </div>
            }
          />
        ))}
      </div>

      {editing ? <FaqModal item={editing} onClose={() => setEditing(null)} onSave={save} /> : null}
    </AdminCard>
  );
}

function FaqModal({
  item,
  onClose,
  onSave,
}: {
  item: Faq;
  onClose: () => void;
  onSave: (f: Faq) => void;
}) {
  const [form, setForm] = useState(item);
  return (
    <Modal
      title="FAQ"
      onClose={onClose}
      footer={
        <>
          <AdminButton variant="outline" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton onClick={() => onSave(form)}>Save</AdminButton>
        </>
      }
    >
      <Field
        label="Question"
        value={form.question}
        onChange={(v) => setForm({ ...form, question: v })}
      />
      <TextArea
        label="Answer"
        value={form.answer}
        onChange={(v) => setForm({ ...form, answer: v })}
        rows={5}
      />
    </Modal>
  );
}

/* ---------------- Contact ---------------- */

function ContactPanel() {
  const { data, update } = useSite();
  const [form, setForm] = useState(data.contact);
  const set = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <AdminCard
      title="Contact information"
      actions={
        <AdminButton
          onClick={() => {
            update({ contact: form });
            toast.success("Contact details updated across the website");
          }}
        >
          Save changes
        </AdminButton>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business name" value={form.businessName} onChange={set("businessName")} />
        <Field label="Owner name" value={form.ownerName} onChange={set("ownerName")} />
        <Field label="Phone" value={form.phone} onChange={set("phone")} />
        <Field label="Email" value={form.email} onChange={set("email")} />
      </div>
      <TextArea label="Address" value={form.address} onChange={set("address")} rows={3} />
      <Field
        label="Consultation CTA text"
        value={form.consultationCta}
        onChange={set("consultationCta")}
      />
      <TextArea label="Footer information" value={form.footerNote} onChange={set("footerNote")} rows={3} />
    </AdminCard>
  );
}

/* ---------------- Settings ---------------- */

function SettingsPanel() {
  const { data, reset } = useSite();

  return (
    <>
      <AdminCard title="Website settings">
        <dl className="grid gap-5 text-sm sm:grid-cols-2">
          {[
            ["Website", data.contact.businessName],
            ["Services published", String(data.services.length)],
            ["Projects published", String(data.projects.length)],
            ["Image library", "Local asset registry (unique per element)"],
            ["Storage", "Browser localStorage — frontend demo only"],
            ["Admin access", "Mock credentials, no database"],
          ].map(([k, v]) => (
            <div key={k} className="border border-border p-4">
              <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                {k}
              </dt>
              <dd className="mt-2">{v}</dd>
            </div>
          ))}
        </dl>
      </AdminCard>

      <AdminCard title="Reset content">
        <p className="text-sm text-muted-foreground">
          Restore all hero, about, services, projects, testimonials, FAQ and contact content back to
          the original demo data.
        </p>
        <AdminButton
          variant="danger"
          onClick={() => {
            reset();
            toast.success("All content restored to demo defaults");
          }}
        >
          Reset to default content
        </AdminButton>
      </AdminCard>
    </>
  );
}
