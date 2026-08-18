import { Link } from "@tanstack/react-router";
import { useSite } from "@/lib/site-store";

export function Footer() {
  const { data } = useSite();
  const { contact, services } = data;

  return (
    <footer className="bg-charcoal text-beige/75">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <p className="font-display text-2xl text-background">{contact.businessName}</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{contact.footerNote}</p>
          <p className="mt-6 text-[0.65rem] uppercase tracking-[0.28em] text-brass">
            Designed • Fabricated • Installed
          </p>
        </div>

        <div>
          <h3 className="text-[0.7rem] uppercase tracking-[0.26em] text-background">Company</h3>
          <ul className="mt-6 space-y-3 text-sm">
            <li><Link to="/about" className="transition-colors hover:text-brass">About Us</Link></li>
            <li><Link to="/services" className="transition-colors hover:text-brass">Services</Link></li>
            <li><Link to="/projects" className="transition-colors hover:text-brass">Projects</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-brass">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[0.7rem] uppercase tracking-[0.26em] text-background">Services</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="transition-colors hover:text-brass"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.7rem] uppercase tracking-[0.26em] text-background">Contact</h3>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed">
            <li>
              <a href={`tel:${contact.phone}`} className="transition-colors hover:text-brass">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-brass">
                {contact.email}
              </a>
            </li>
            <li>{contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs sm:flex-row">
          <p>© 2026 {contact.businessName}. All Rights Reserved.</p>
          <Link
            to="/admin/login"
            className="uppercase tracking-[0.22em] text-beige/50 transition-colors hover:text-brass"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}