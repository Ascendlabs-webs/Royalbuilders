import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { getPosts } from "@/lib/sanity.queries";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Guides on house construction costs, interior design, land buying and building maintenance in Chennai from Royal Builders.",
  alternates: { canonical: `${SITE.url}/blog` },
};

export const revalidate = 3600;

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function BlogPage() {
  const posts = await getPosts().catch(() => []);

  return (
    <>
      <PageHero
        kicker="Blog"
        title={
          <>
            Insights & <span className="text-gradient-crimson">Guides</span>
          </>
        }
        subtitle="Construction costs, interior ideas, land-buying checklists and maintenance tips — from 15+ years of building in Chennai."
        image="/images/hero-construction.jpg"
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeading
            kicker="All Articles"
            title={
              <>
                Latest <span className="text-gradient-crimson">Articles</span>
              </>
            }
          />
          {posts.length === 0 ? (
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-sm leading-relaxed text-graphite">
                Our editors are preparing the first articles. Meanwhile, call us for a free
                consultation — or publish your first post from the CMS Studio at{" "}
                <Link href="/studio" className="text-crimson-600 underline underline-offset-4">
                  /studio
                </Link>
                .
              </p>
            </Reveal>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p._id} delay={0.06 * (i % 3)} className="h-full">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col border border-navy-900/10 bg-white transition-all duration-500 hover:border-crimson-500/60 hover:shadow-crimson"
                  >
                    {p.coverImageUrl && (
                      <div className="relative h-52 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.coverImageUrl}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-7">
                      <p className="text-[11px] font-bold tracking-[0.25em] text-crimson-600 uppercase">
                        {formatDate(p.publishedAt)}
                        {p.tags?.[0] ? ` · ${p.tags[0]}` : ""}
                      </p>
                      <h2 className="font-display mt-3 text-xl leading-snug font-bold text-navy-900">{p.title}</h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-graphite">{p.excerpt}</p>
                      <span className="mt-5 text-[11px] font-bold tracking-[0.25em] text-crimson-600 uppercase">
                        Read Article →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
