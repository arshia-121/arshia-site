/* Content data — edit products and articles here.
   Every text is stored as { fa, en } so the language switch can swap it. */
window.PRODUCTS = [
  {
    id: "python-14-lessons",
    art: 1,
    symbol: "14",
    price: 0,
    badge: { fa: "رایگان", en: "Free" },
    tags: [
      { fa: "پایتون", en: "Python" },
      { fa: "آموزش", en: "Course" }
    ],
    name: { fa: "پک آموزش ۱۴ درسی پایتون", en: "14-Lesson Python Course Pack" },
    tagline: {
      fa: "۱۴ درس پایتون؛ از صفر تا ساختن اولین برنامه",
      en: "14 Python lessons, from zero to your first program"
    },
    desc: {
      fa: "پک کامل آموزش پایتون در ۱۴ درس، از نصب و متغیرها شروع می‌شود و تا حلقه‌ها، توابع و ساختن اولین برنامه ادامه دارد. فایل قابل دانلود است و می‌توانید همین حالا آن را دریافت کنید.",
      en: "A complete 14-lesson Python course pack. It starts with installation and variables and continues through loops, functions and building your first program. The file is ready to download right now."
    },
    features: {
      fa: [
        "۱۴ درس از مقدماتی تا اولین پروژه",
        "فایل‌های تمرین و کدهای همراه",
        "حجم فایل: ۲۸٬۱۴۰ کیلوبایت",
        "دانلود رایگان و بدون ثبت‌نام"
      ],
      en: [
        "14 lessons from basics to a first project",
        "Exercise and code files",
        "File size: 28,140 KB",
        "Free download, no sign-up"
      ]
    },
    download: "assets/downloads/Learn-Python.exe",
    downloadName: "Learn Python.exe"
  },
  {
    id: "python-advanced",
    art: 2,
    symbol: "Py+",
    price: 0,
    comingSoon: true,
    badge: { fa: "به زودی", en: "Coming soon" },
    tags: [
      { fa: "پایتون", en: "Python" },
      { fa: "پیشرفته", en: "Advanced" }
    ],
    name: { fa: "دوره‌ی پیشرفته پایتون", en: "Advanced Python Course" },
    tagline: {
      fa: "شیءگرایی، پروژه و کار با API",
      en: "OOP, projects and working with APIs"
    },
    desc: {
      fa: "دوره‌ی بعدی در حال آماده‌سازی است: شیءگرایی، کار با APIها و چند پروژه‌ی واقعی. به‌زودی برای دانلود قرار می‌گیرد.",
      en: "The next course is in preparation: object-oriented programming, APIs and a few real projects. It will be available soon."
    },
    features: {
      fa: ["تمرین‌های پروژه‌محور", "کار با API", "به‌زودی"],
      en: ["Project-based exercises", "Working with APIs", "Coming soon"]
    }
  },
  {
    id: "school-projects",
    art: 3,
    symbol: "101",
    price: 0,
    comingSoon: true,
    badge: { fa: "به زودی", en: "Coming soon" },
    tags: [
      { fa: "مدرسه", en: "School" },
      { fa: "پروژه", en: "Project" }
    ],
    name: { fa: "پک پروژه‌های مدرسه", en: "School Projects Pack" },
    tagline: {
      fa: "چند نمونه‌ی آماده برای پروژه‌های کلاسی",
      en: "Ready-to-use samples for class projects"
    },
    desc: {
      fa: "مجموعه‌ای از پروژه‌های کوچک پایتون برای مدرسه، همراه با توضیح و مستندات. این پک هم به‌زودی اضافه می‌شود.",
      en: "A set of small Python projects for school, with explanations and documentation. This pack is coming soon too."
    },
    features: {
      fa: ["پروژه‌های قابل ویرایش", "مستندات و راهنمای ارائه", "به‌زودی"],
      en: ["Editable projects", "Documentation and presentation guide", "Coming soon"]
    }
  }
];

/* Blog is "coming soon"; articles will be added here later.
   Each post needs: slug, date, minutes, tags, title, excerpt and body. */
window.POSTS = [];
