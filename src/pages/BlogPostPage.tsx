import { Link, useParams } from "react-router";
import * as motion from "framer-motion/m";
import LandingContainer from "@/components/UI/LandingContainer";
import { getBlogPost, getRelatedPosts } from "@/content/blog";
import { useTranslation } from "@/locale/useTranslation";
import { BlogMeta } from "./BlogListPage";

const ease = [0.16, 1, 0.3, 1] as const;

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, locale } = useTranslation();
  const lang = locale === "en" ? "en" : "fa";
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <section className="pb-24 pt-36 text-text-main">
        <LandingContainer className="max-w-3xl">
          <h1 className="text-3xl font-black">{t("blog.missing_title")}</h1>
          <p className="mt-4 text-text-muted">{t("blog.missing_body")}</p>
          <Link to="/blog" className="mt-8 inline-block text-sm text-brand-blue">
            {t("blog.back")}
          </Link>
        </LandingContainer>
      </section>
    );
  }

  const related = getRelatedPosts(post.slug);

  return (
    <article className="relative pb-24 pt-36 text-text-main max-[700px]:pb-16 max-[700px]:pt-32">
      <LandingContainer>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="text-[13px] text-text-dim transition-colors hover:text-text-main">
            {t("blog.back")}
          </Link>

          <header className="mt-8 border-b border-border-light/40 pb-8">
            <BlogMeta post={post} locale={lang} />
            <h1 className="mt-4 text-[clamp(32px,4.5vw,52px)] font-black leading-[1.3] tracking-[-0.03em]">
              {post.title[lang]}
            </h1>
            <p className="mt-5 text-[17px] font-light leading-[2] text-text-muted">
              {post.excerpt[lang]}
            </p>
          </header>

          <div className="mt-10 space-y-6">
            {post.paragraphs[lang].map((paragraph) => (
              <p
                key={paragraph}
                className="m-0 text-[16px] font-light leading-[2.15] text-text-main">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <aside className="mx-auto mt-16 max-w-3xl border-t border-border-light/40 pt-8">
          <h2 className="text-[13px] text-text-dim">{t("blog.related")}</h2>
          <ul className="m-0 mt-4 list-none p-0">
            {related.map((item) => (
              <li key={item.slug} className="border-b border-border-light/30">
                <Link
                  to={`/blog/${item.slug}`}
                  className="group block py-5">
                  <BlogMeta post={item} locale={lang} />
                  <span className="mt-2 block text-[20px] font-bold leading-snug transition-colors group-hover:text-brand-blue">
                    {item.title[lang]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </LandingContainer>
    </article>
  );
}
