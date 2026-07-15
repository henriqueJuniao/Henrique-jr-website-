/** Editorial Discipline: quiet white shell, exact supplied mark at confident scale, fine rules, and a fully isolating mobile navigation layer. */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { logos } from "@/lib/assets";
import { navigation } from "@/lib/content";
import { openAnalyticsSettings } from "@/lib/analytics";

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="brand-link" aria-label="HenriqueJR home">
      <img
        src={inverse ? logos.white : logos.black}
        alt=""
        width="101"
        height="57"
        className="brand-mark"
      />
      <span className="brand-name">HenriqueJR</span>
    </Link>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const main = document.getElementById("main-content");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const previous = {
      htmlOverflow: documentElement.style.overflow,
      htmlOverscroll: documentElement.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus({ preventScroll: true }), 60);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      documentElement.style.overflow = previous.htmlOverflow;
      documentElement.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.scrollTo(0, scrollY);
      menuButtonRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
      <div className="site-header__inner">
        <Brand />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link${location === item.href ? " is-active" : ""}`}
              aria-current={location === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="header-cta">
          Request a Consultation
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.7} />
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="menu-button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open navigation"
        >
          <Menu aria-hidden="true" size={24} />
        </button>
      </div>
      </header>

      {typeof document !== "undefined" ? createPortal(
      <div
        ref={overlayRef}
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
      >
        <div className="mobile-menu__header">
          <Brand />
          <button
            ref={closeButtonRef}
            type="button"
            className="menu-button menu-button--close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            tabIndex={open ? 0 : -1}
          >
            <X aria-hidden="true" size={25} />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <span className="eyebrow">Navigate</span>
          <div className="mobile-nav__links">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav__link${location === item.href ? " is-active" : ""}`}
                aria-current={location === item.href ? "page" : undefined}
                tabIndex={open ? 0 : -1}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <Link href="/contact" className="button button--dark mobile-menu__cta" tabIndex={open ? 0 : -1}>
            Request a Consultation
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </nav>
      </div>,
      document.body,
      ) : null}
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <Link href="/" className="site-footer__brand" aria-label="HenriqueJR home">
          <img src={logos.white} alt="" width="101" height="57" />
          <span>HenriqueJR</span>
        </Link>
        <p>Technical excellence. Individual attention. Long-term development.</p>
      </div>
      <div className="site-footer__grid">
        <div>
          <span className="footer-label">Coaching</span>
          <Link href="/private-coaching">Private Coaching</Link>
          <Link href="/corporate">Corporate Programmes</Link>
          <Link href="/kids">Kids Coaching</Link>
          <Link href="/contact">Seminars</Link>
        </div>
        <div>
          <span className="footer-label">HenriqueJR</span>
          <Link href="/about">About</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="site-footer__contact">
          <span className="footer-label">Enquiries</span>
          <Link href="/contact" className="footer-enquiry">
            Request a Consultation
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} HenriqueJR</span>
        <div className="site-footer__legal">
          <Link href="/privacy">Privacy</Link>
          <button type="button" onClick={openAnalyticsSettings}>Analytics settings</button>
          <span>Brazilian Jiu-Jitsu Coaching · London</span>
        </div>
      </div>
    </footer>
  );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
