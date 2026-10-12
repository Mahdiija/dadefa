export type BlogProduct = "dadefa" | "master" | "formula" | "cube" | "accounting";

export interface BlogPost {
  slug: string;
  product: BlogProduct;
  date: string;
  minutes: number;
  title: { fa: string; en: string };
  excerpt: { fa: string; en: string };
  paragraphs: { fa: string[]; en: string[] };
}

export const blog_posts: BlogPost[] = [
  {
    slug: "one-picture",
    product: "dadefa",
    date: "2026-09-12",
    minutes: 5,
    title: {
      fa: "از داده‌های پراکنده تا یک تصویر",
      en: "From scattered records to one picture",
    },
    excerpt: {
      fa: "فروش، مالی و عملیات هر کدام بخشی از کار را می‌بینند. داده‌فا این بخش‌ها را در یک جریان می‌آورد تا تصمیم روی تصویر کامل گرفته شود.",
      en: "Sales, finance, and operations each see part of the work. Dadefa brings those parts into one flow so a decision can rest on the whole picture.",
    },
    paragraphs: {
      fa: [
        "در بیشتر سازمان‌ها داده کم نیست. فروش عدد خودش را دارد، مالی سند خودش را، و انبار موجودی خودش را. مشکل از نبود عدد نیست؛ از این است که این عددها در یک لحظه کنار هم دیده نمی‌شوند.",
        "وقتی هر بخش فقط سهم خودش را می‌بیند، گزارش دیر به دست مدیر می‌رسد و اصلاح کار گران تمام می‌شود. یک تخفیف در صندوق، یک کسری در انبار، و یک مانده در حساب مشتری سه داستان جدا می‌مانند.",
        "داده‌فا برای همین فاصله ساخته شده است. محصولات مستقل‌اند و هر کدام کار خودش را تمام می‌کند، اما اطلاعات می‌تواند بین آن‌ها حرکت کند. تصویر کامل، حاصل جمعِ چند صفحه جدا نیست؛ حاصل یک جریان است.",
        "این یادداشت‌ها همان مسیر را از نزدیک توضیح می‌دهند: سازمان، فروشگاه، گردش کار، و حساب روز.",
      ],
      en: [
        "Most companies do not lack data. Sales has its figures, finance has its documents, and the warehouse has its stock. The gap is that those figures are not visible together at the moment a decision is made.",
        "When each team sees only its own share, the report arrives late and the correction costs more. A discount at the till, a shortage in the warehouse, and a customer balance stay three separate stories.",
        "Dadefa is built for that gap. The products stay independent, and each one finishes its own job, while information can still move between them. A complete picture is not a stack of separate pages. It is one flow.",
        "These notes follow that path up close: the company, the store, the daily workflow, and the ledger of the day.",
      ],
    },
  },
  {
    slug: "when-the-line-drops",
    product: "formula",
    date: "2026-08-28",
    minutes: 4,
    title: {
      fa: "وقتی اینترنت شعبه قطع می‌شود",
      en: "When the branch loses its connection",
    },
    excerpt: {
      fa: "صف صندوق منتظر شبکه نمی‌ماند. فرمول فروش را روی همان شعبه نگه می‌دارد و بعد، وقتی خط برگشت، با مرکز هم‌خوان می‌کند.",
      en: "The checkout line does not wait for the network. Formula keeps the sale on the branch, then reconciles with the center when the line returns.",
    },
    paragraphs: {
      fa: [
        "در فروشگاه زنجیره‌ای، قطعی کوتاه اینترنت یک حادثه فنی نیست. اگر صندوق بایستد، صف می‌ایستد و موجودی همان لحظه از واقعیت عقب می‌ماند.",
        "فرمول فروش را روی شعبه ادامه می‌دهد: کالا، قیمت، و تسویه همان‌جا ثبت می‌شود. شعبه منتظر پاسخ سرور مرکزی نمی‌ماند تا فاکتور بعدی را بزند.",
        "وقتی ارتباط برمی‌گردد، فروش‌ها، موجودی، و اختلاف صندوق با مرکز هم‌خوان می‌شوند. مدیر شعب یک عدد دیررس نمی‌بیند؛ جریان همان روز را می‌بیند.",
        "این تفاوت فروش و یک نرم‌افزار صندوق ساده است. فرمول از تأمین تا تسویه را پوشش می‌دهد، و قطعی شبکه کار شعبه را نصف نمی‌کند.",
      ],
      en: [
        "In a retail chain, a short network outage is not a technical incident. If the till stops, the queue stops, and stock falls behind what actually happened.",
        "Formula continues the sale on the branch. The item, the price, and the settlement are recorded there. The branch does not wait for the central server before the next invoice.",
        "When the connection returns, sales, stock, and till differences reconcile with the center. A branch manager does not receive a late number. They see the flow of that day.",
        "That is the distance between Formula and a basic cash register. Formula covers the path from supply to settlement, and a dropped line does not cut the branch’s work in half.",
      ],
    },
  },
  {
    slug: "master-stands-alone",
    product: "master",
    date: "2026-08-04",
    minutes: 5,
    title: {
      fa: "مستر ستون سازمان است، نه یک صندوق اضافه",
      en: "Master is the company spine, not another till",
    },
    excerpt: {
      fa: "مستر برای سازمان چندشعبه‌ای است: کالا، مالی، انبار و منابع انسانی در یک پایگاه. صندوق خودش را هم دارد و به محصول دیگری تکیه نمی‌کند.",
      en: "Master is for a multi-branch company: goods, finance, warehouse, and people in one base. It has its own point of sale and does not lean on another product.",
    },
    paragraphs: {
      fa: [
        "سازمان متوسط رو به بالا معمولاً چند نرم‌افزار را به هم وصل کرده است. فروش یک‌جا، انبار جای دیگر، و سند مالی با تأخیر از هر دو می‌آید. مستر این فاصله را داخل خود سازمان می‌بندد.",
        "جریان کالا، خزانه، اسناد، و حقوق در یک پایگاه دیده می‌شوند. مدیر لازم نیست برای یک سؤال ساده سه خروجی بگیرد و خودش آن‌ها را با هم تطبیق دهد.",
        "مستر صندوق مستقل خودش را دارد. سازمانی که فقط به فروش شعبه نیاز دارد مجبور نیست کل مجموعه داده‌فا را بخرد، و سازمانی که مستر را انتخاب می‌کند برای صندوق به محصول دیگری وابسته نمی‌شود.",
        "جای مستر در شرکت‌هایی است که چند شعبه، چند انبار، یا چند شرکت زیر یک تصمیم اداره می‌شوند.",
      ],
      en: [
        "A growing company usually has several systems tied together. Sales live in one place, the warehouse in another, and the financial document arrives late from both. Master closes that gap inside the company.",
        "Goods, treasury, documents, and payroll are visible in one base. A manager does not have to export three reports and reconcile them by hand for a simple question.",
        "Master carries its own point of sale. A company that only needs branch sales is not required to buy the whole Dadefa set, and a company that chooses Master does not depend on another product for the till.",
        "Master belongs where several branches, warehouses, or companies are run under one decision.",
      ],
    },
  },
  {
    slug: "cube-beside-the-work",
    product: "cube",
    date: "2026-07-16",
    minutes: 4,
    title: {
      fa: "مکعب کنار کار روزمره می‌نشیند",
      en: "Cube sits beside the daily work",
    },
    excerpt: {
      fa: "فرم، گردش تأیید، تیکت و دانش تیم کار سازمان‌اند، نه ضمیمه نرم‌افزار فروش. مکعب این کار را به‌تنهایی انجام می‌دهد.",
      en: "Forms, approvals, tickets, and team knowledge are the company’s own work, not an appendix to the sales system. Cube does that work on its own.",
    },
    paragraphs: {
      fa: [
        "بخش زیادی از وقت سازمان در نامه‌ها، تأییدها، و پیگیری درخواست‌ها می‌رود. اگر این جریان داخل نرم‌افزار فروش دفن شود، هم فروش شلوغ می‌شود و هم کار اداری ناتمام می‌ماند.",
        "مکعب برای همین کار ساخته شده است: ساخت فرم، مسیر تأیید، میز کار، تیکت، و پایگاه دانش تیم. این‌ها فرآیند سازمان‌اند و باید حتی وقتی فروش در جریان است هم روشن بمانند.",
        "مکعب ماژول دوم یک محصول دیگر نیست. خودش یک سامانه است و می‌تواند با سیستم‌های اطراف، از جمله مستر و فرمول، داده رد و بدل کند.",
        "نتیجه این است که درخواست مرخصی، خرابی یک شعبه، و سند یک خرید هر کدام در جای خودشان حرکت می‌کنند و در گزارش گم نمی‌شوند.",
      ],
      en: [
        "A large share of a company’s time goes into letters, approvals, and follow-up. If that flow is buried inside the sales system, sales becomes crowded and the office work stays unfinished.",
        "Cube is built for that work: forms, approval paths, a task desk, tickets, and the team’s knowledge base. These are the company’s processes, and they should stay clear while sales is moving.",
        "Cube is not a second module of another product. It is its own system, and it can exchange data with the systems around it, including Master and Formula.",
        "A leave request, a fault in a branch, and a purchase document each move in their own place, and none of them disappear inside a report.",
      ],
    },
  },
  {
    slug: "a-ledger-for-the-day",
    product: "accounting",
    date: "2026-06-30",
    minutes: 4,
    title: {
      fa: "حساب‌کتاب برای همان روز، نه برای کل سازمان",
      en: "HesabKetab is for the day, not the whole company",
    },
    excerpt: {
      fa: "همه به دفتر کل سازمانی نیاز ندارند. حساب‌کتاب دریافت، پرداخت، مانده اشخاص، و سود و زیان روز را روشن نگه می‌دارد.",
      en: "Not everyone needs a company-wide general ledger. HesabKetab keeps receipts, payments, personal balances, and the day’s profit and loss clear.",
    },
    paragraphs: {
      fa: [
        "یک تیم کوچک یا یک کسب‌وکار شخصی اغلب بین دو حالت گیر می‌کند: یا همه‌چیز در پیام و فایل پراکنده است، یا مجبور است سنگینی یک حسابداری سازمانی را تحمل کند.",
        "حساب‌کتاب برای حالت میانی است. دریافت و پرداخت، مانده مشتری و تأمین‌کننده، و گزارش سود و زیان بدون لایه‌های اضافه ثبت می‌شود.",
        "این محصول جایگزین مستر نیست. مستر ستون یک سازمان چندبخشی است. حساب‌کتاب دقت همان روز را برای کسی نگه می‌دارد که به آن ستون نیاز ندارد.",
        "روشنی مالی از همین‌جا شروع می‌شود: هر مبلغ جای خودش را دارد، و آخر روز لازم نیست کسی از حافظه‌اش گزارش بسازد.",
      ],
      en: [
        "A small team or a personal business is often stuck between two states: everything scattered across messages and files, or the weight of a full company accounting system.",
        "HesabKetab is the middle. Receipts and payments, customer and supplier balances, and a profit-and-loss view are recorded without extra layers.",
        "It does not replace Master. Master is the spine of a company with many parts. HesabKetab keeps the precision of the day for someone who does not need that spine.",
        "Financial clarity starts here. Each amount has a place, and at the end of the day nobody has to build a report from memory.",
      ],
    },
  },
];

export function getBlogPost(slug: string) {
  return blog_posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string) {
  const current = getBlogPost(slug);
  if (!current) return [];

  const others = blog_posts.filter((post) => post.slug !== slug);
  const same_product = others.filter((post) => post.product === current.product);
  const rest = others.filter((post) => post.product !== current.product);
  return [...same_product, ...rest].slice(0, 2);
}
