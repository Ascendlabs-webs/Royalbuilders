import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/RichText";
import { getPostBySlug, getPosts } from "@/lib/sanity.queries";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts().catch(() => []);
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `${SITE.url}/blog/${slug}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      ...(post.coverImageUrl ? { images: [{ url: post.coverImageUrl }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  return (
    <>
      <PageHero
        kicker="Blog"
        title={post.title}
        subtitle={post.excerpt}
        image={post.coverImageUrl || "/images/hero-construction.jpg"}
      />

      <article className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.25em] text-crimson-600 uppercase">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                : ""}
              {post.author ? ` · By ${post.author}` : ""}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="border border-navy-900/15 px-3 py-1 text-[11px] tracking-[0.15em] text-graphite uppercase">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-4 border-t border-navy-900/10 pt-8">
              <RichText value={post.body} />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/blog"
              className="mt-12 inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] text-crimson-600 uppercase hover:text-crimson-500"
            >
              ← All Articles
            </Link>
          </Reveal>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.publishedAt,
                author: post.author ? { "@type": "Person", name: post.author } : undefined,
                publisher: { "@type": "Organization", name: "Royal Builders", url: SITE.url },
              }),
            }}
          />
        </div>
      </article>
    </>
  );
}
