import type { BlogPost } from "@/lib/blog/types";

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
    </div>
  );
}
