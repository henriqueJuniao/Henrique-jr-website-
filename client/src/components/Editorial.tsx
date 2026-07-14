/** Editorial Discipline: reusable primitives emphasize supplied content with restrained motion, square imagery, serif testimony, and precise rules. */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ResponsiveImage } from "@/lib/assets";
import type { Testimonial } from "@/lib/content";

export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function EditorialImage({
  image,
  alt,
  className = "",
  sizes = "(max-width: 767px) 100vw, 50vw",
  loading = "lazy",
  fetchPriority,
}: {
  image: ResponsiveImage;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={className}
    />
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

export function TextLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  const content = (
    <>
      <span>{children}</span>
      {external ? <ArrowUpRight aria-hidden="true" size={16} /> : <ArrowRight aria-hidden="true" size={17} />}
    </>
  );

  if (external) {
    return <a className="text-link" href={href}>{content}</a>;
  }

  return <Link className="text-link" href={href}>{content}</Link>;
}

export function TestimonialInterlude({ testimonial, index }: { testimonial: Testimonial; index: string }) {
  return (
    <Reveal>
      <aside className="testimonial-interlude" aria-label={`Testimonial from ${testimonial.name}`}>
        <div className="testimonial-interlude__meta">
          <span>{index}</span>
          <span>In their words</span>
        </div>
        <figure>
          <blockquote>“{testimonial.excerpt}”</blockquote>
          <figcaption>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.title}</span>
          </figcaption>
        </figure>
      </aside>
    </Reveal>
  );
}
