import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Seo } from "@/components/Seo";

export default function BlogListPage() {
  return (
    <div className="py-20 sm:py-24">
      <Seo
        title="Blog"
        description="Notes on building AI product interfaces — design decisions, engineering trade-offs, and what we learned shipping Aether."
      />
      <div className="container">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight">
            From the Aether blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Notes on building AI product interfaces — design decisions,
            engineering trade-offs, and what we learned shipping this theme.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {post.tag}
              </span>
              <h2 className="font-display text-lg font-semibold leading-snug">
                <Link to={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {post.author.name} · {post.date}
                </span>
                <span>{post.readTime}</span>
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                Read post
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
