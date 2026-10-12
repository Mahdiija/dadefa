// src/pages/NotFoundPage.tsx
import { Link, useRouteError } from "react-router";
import * as motion from "framer-motion/m";

function NotFoundPage() {
  const err = useRouteError() as any;
  const status = err?.status ?? err?.response?.status ?? 404;

  const title =
    status === 404 ? "صفحه موردنظر پیدا نشد" : "مشکلی در بارگذاری صفحه رخ داد";

  const message =
    err?.statusText ||
    err?.message ||
    "ممکن است آدرس صفحه تغییر کرده باشد یا این صفحه دیگر در دسترس نباشد.";

  return (
    <div className="min-h-screen font-brand-persian w-full bg-[var(--color-brand-paper)] px-4">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="rounded-3xl border border-[var(--color-line-on-light)] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="text-right">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.12, duration: 0.35 }}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-cream)] px-3 py-1 text-sm text-[var(--color-brand-indigo)]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-product-accounting)]" />
                  خطا {status}
                </motion.div>

                <h1 className="mt-4 text-2xl font-semibold text-[var(--color-brand-indigo)] sm:text-3xl">
                  {title}
                </h1>

                <p className="mt-3 max-w-xl leading-7 text-[var(--color-brand-slate)]">
                  {message}
                </p>
              </div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue text-lg font-bold text-white shadow-md sm:flex"
                aria-hidden="true">
                404
              </motion.div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -1 }}
                onClick={() => window.history.back()}
                className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--color-line-on-light)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-brand-indigo)] transition hover:bg-[var(--color-brand-cream)] sm:w-auto">
                بازگشت به صفحه قبل
              </motion.button>

              <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }}>
                <Link
                  to="/"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-purple)] sm:w-auto">
                  بازگشت به خانه
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="mt-6 border-t border-[var(--color-line-on-light)] pt-4 text-xs leading-6 text-[var(--color-brand-slate)]">
              اگر آدرس را دستی وارد کرده‌اید، آن را دوباره بررسی کنید یا از منوی
              سایت به بخش موردنظر بروید.
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFoundPage;
