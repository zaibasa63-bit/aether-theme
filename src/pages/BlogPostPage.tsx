import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Seo } from "@/components/Seo";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  // Unknown slug — send back to the listing rather than rendering an
  // empty page. A dedicated 404 page is added with the dashboard shell.
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="py-20 sm:py-24">
      <Seo title={post.title} description={post.excerpt} />
      <div className="container max-w-2xl">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to blog
        </Link>

        <span className="mb-4 inline-flex w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {post.tag}
        </span>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-aether-gradient text-xs font-medium text-white">
            {post.author.initials}
          </div>
          <div className="text-sm">
            <div className="font-medium">{post.author.name}</div>
            <div className="text-muted-foreground">
              {post.date} · {post.readTime}
            </div>
          </div>
        </div>

        <div className="mt-10">
          {post.content.map((paragraph, i) => (
            <p key={i} className="mb-5 leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
