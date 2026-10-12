import { Link } from "react-router";
import * as motion from "framer-motion/m";
import LandingContainer from "@/components/UI/LandingContainer";
import { blog_posts, type BlogPost, type BlogProduct } from "@/content/blog";
import { useTranslation, type TranslationKey } from "@/locale/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

const product_color: Record<BlogProduct, string> = {
  dadefa: "#3565af",
  master: "#4E148C",
  formula: "#654597",
  cube: "#0468FA",
  accounting: "#D96E7D",
};

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

const product_label: Record<BlogProduct, TranslationKey> = {
  dadefa: "blog.products.dadefa",
  master: "blog.products.master",
  formula: "blog.products.formula",
  cube: "blog.products.cube",
  accounting: "blog.products.accounting",
};

export function productLabel(
  product: BlogProduct,
  t: (key: TranslationKey) => string,
) {
  return t(product_label[product]);
}

export function BlogMeta({
  post,
  locale,
}: {
  post: BlogPost;
  locale: string;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-text-dim">
      <span
        className="font-medium"
        style={{ color: product_color[post.product] }}>
        {productLabel(post.product, t)}
      </span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-prominent" />
      <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-prominent" />
      <span>
        {post.minutes.toLocaleString(locale === "fa" ? "fa-IR" : "en-GB")}{" "}
        {t("blog.minutes")}
      </span>
    </div>
  );
}

export default function BlogListPage() {
  const { t, locale } = useTranslation();
  const [featured, ...rest] = blog_posts;
  const lang = locale === "en" ? "en" : "fa";

  return (
    <section className="relative overflow-hidden pb-24 pt-36 text-text-main max-[700px]:pb-16 max-[700px]:pt-32">
      <LandingContainer>
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="max-w-3xl border-b border-border-light/40 pb-8">
          <div className="flex items-center gap-3 text-[13px] text-text-dim">
            <span className="font-num font-bold text-brand-blue">{t("blog.kicker_num")}</span>
            <span className="h-px w-8 bg-border-prominent" />
            <span>{t("blog.kicker")}</span>
          </div>
          <h1 className="mt-4 text-[clamp(36px,5vw,60px)] font-light leading-[1.2] tracking-[-0.03em]">
            {t("blog.headline_part1")}{" "}
            <strong className="font-black">{t("blog.headline_strong")}</strong>
          </h1>
          <p className="mt-5 max-w-[46ch] text-[15px] font-light leading-[2] text-text-muted">
            {t("blog.description")}
          </p>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease }}
          className="mt-10">
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid scroll-mt-32 gap-6 rounded-[28px] border border-border-light/50 bg-app-surface/65 p-8 transition-colors duration-300 hover:border-border-prominent max-[700px]:p-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <BlogMeta post={featured} locale={lang} />
              <h2 className="mt-4 text-[clamp(28px,3vw,40px)] font-black leading-[1.35] tracking-[-0.03em] transition-colors group-hover:text-brand-blue">
                {featured.title[lang]}
              </h2>
            </div>
            <p className="m-0 text-[15px] font-light leading-[2] text-text-muted">
              {featured.excerpt[lang]}
            </p>
          </Link>
        </motion.article>

        <ul className="m-0 mt-4 list-none p-0">
          {rest.map((post, index) => (
            <motion.li
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 + index * 0.04, ease }}>
              <Link
                to={`/blog/${post.slug}`}
                className="group grid scroll-mt-32 gap-3 border-b border-border-light/40 py-7 md:grid-cols-[220px_1fr] md:items-start md:gap-10">
                <BlogMeta post={post} locale={lang} />
                <div>
                  <h2 className="text-[22px] font-bold leading-snug tracking-[-0.02em] transition-colors group-hover:text-brand-blue">
                    {post.title[lang]}
                  </h2>
                  <p className="mt-2 max-w-[62ch] text-[14px] font-light leading-[1.9] text-text-muted">
                    {post.excerpt[lang]}
                  </p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  );
}
