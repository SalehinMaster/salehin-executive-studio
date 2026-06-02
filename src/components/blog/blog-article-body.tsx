import type { BlogPost } from "@/lib/blog/types";
import { TextLink } from "@/components/ui/text-link";

type BlogArticleBodyProps = {
  post: BlogPost;
};

export function BlogArticleBody({ post }: BlogArticleBodyProps) {
  return (
    <div className="blog-prose">
      {post.sections.map((section) => (
        <section key={section.heading} className="not-first:mt-12 md:not-first:mt-14">
          <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {section.heading}
          </h2>
          <div className="mt-5 space-y-5">
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-body-fluid text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {post.internalLinks?.length ? (
        <section className="mt-12 rounded-2xl border border-border/70 bg-surface/40 p-6 md:mt-14 md:p-8">
          <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Strategic next reads
          </h2>
          <p className="mt-4 text-body-fluid text-muted">
            Continue building topical authority with linked resources designed to compound trust and
            search visibility.
          </p>
          <ul className="mt-5 space-y-3">
            {post.internalLinks.map((link) => (
              <li key={link.href}>
                <TextLink href={link.href}>{link.label}</TextLink>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {post.faqs?.length ? (
        <section className="mt-12 md:mt-14">
          <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-5">
            {post.faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-border/70 bg-surface/30 p-5">
                <h3 className="text-lg font-medium text-foreground">{faq.question}</h3>
                <p className="mt-3 text-body-fluid text-muted">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
