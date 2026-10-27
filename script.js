/* =========================================================
   BootUP | بوت اب — by elmasry.dev
   ========================================================= */
(() => {
  'use strict';

  /* ---------- Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  const CFG = window.BOOTUP_CONFIG || {};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  // escape HTML, and keep "C++" readable inside Arabic text
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC_MAP[c]).replace(/C\+\+/g, '\u2066C++\u2069');
  const siteUrl = () => (CFG.siteUrl && !/bootup\.vercel\.app/.test(CFG.siteUrl) ? CFG.siteUrl : location.origin + location.pathname.replace(/index\.html$/, ''));

  const PHONE_INTL = '201276615502';
  const COLORS = { turq: '#2ad4bf', purple: '#9372e8', cyan: '#8de4ee' };
  const STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/></svg>';

  /* ---------- Social links ---------- */
  const SOCIALS = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mahmoud-elmasry-960a9b359',
      svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><circle cx="6.5" cy="6.6" r="1.8"/><rect x="5" y="9.4" width="3" height="9.6" rx=".6"/><path d="M10.4 9.4h2.9v1.3c.5-.9 1.6-1.5 3-1.5 2.3 0 3.6 1.5 3.6 4.2V19h-3v-5.1c0-1.3-.5-2-1.6-2s-1.9.8-1.9 2.1v5h-3z"/></svg>' },
    { label: 'Facebook', url: 'https://www.facebook.com/share/1FUSiHdrbS/',
      svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M14.2 8.2h2.6V4.6h-3c-3 0-4.4 1.9-4.4 4.6v2.1H7v3.6h2.4V22h3.8v-7.1h2.9l.5-3.6h-3.4V9.6c0-.9.4-1.4 1-1.4z"/></svg>' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@eelmasrye',
      svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M16.2 3c.4 2.4 1.9 4 4.2 4.3v3.3c-1.5 0-2.9-.4-4.1-1.2v6.1A5.6 5.6 0 1 1 10.7 10v3.4a2.3 2.3 0 1 0 2.2 2.3V3z"/></svg>' },
    { label: 'Instagram', url: 'https://www.instagram.com/iam_elmasryy',
      svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.9"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>' }
  ];

  /* =========================================================
     Language data — written for complete beginners
     ========================================================= */
  const LANGS = [
    {
      id: 'html', name: 'HTML', short: 'HTML', color: COLORS.turq, fields: ['frontend'], difficulty: 1, demand: 4,
      tagline: { en: 'The skeleton of every web page.', ar: 'الهيكل الأساسي لأي صفحة ويب.' },
      simple: {
        en: 'Imagine a website is a house: HTML is the walls and rooms. It tells the browser what is on the page — a title, a paragraph, an image, a button.',
        ar: 'تخيّل الموقع كأنه بيت: HTML هي الجدران والغرف. هي التي تخبر المتصفح بما في الصفحة: عنوان، فقرة، صورة، زر.'
      },
      startIf: { en: 'you want to build websites — it is always step one.', ar: 'كنت تريد بناء مواقع — فهي دائمًا الخطوة الأولى.' },
      note: { en: '<b>HTML</b> is a markup language: it describes content but has no logic, so it is not a full programming language.', ar: '<b>HTML</b> لغة توصيف (Markup): تصف المحتوى فقط ولا تحتوي على منطق، لذلك ليست لغة برمجة بالمعنى الكامل.' },
      uses: { en: ['Building the structure of any website', 'Simple pages & portfolios', 'Email templates', 'The base you need before any web framework'],
              ar: ['بناء هيكل أي موقع', 'الصفحات البسيطة والبورتفوليو', 'قوالب رسائل البريد', 'الأساس قبل أي إطار عمل للويب'] },
      time: { basics: { en: '1–2 weeks', ar: '1–2 أسبوع' }, pro: { en: '1–2 months', ar: '1–2 شهر' } },
      demandNote: { en: 'Not a job on its own, but required in every web job.', ar: 'ليست وظيفة وحدها، لكنها مطلوبة في كل وظائف الويب.' },
      companiesAll: true,
      companies: ['Google', 'YouTube', 'Facebook', 'Amazon', 'Wikipedia'],
      pros: { en: ['The easiest place to start', 'Works in any browser — nothing to install', 'You see your result immediately'],
              ar: ['أسهل نقطة بداية', 'تعمل في أي متصفح بدون تثبيت أي شيء', 'ترى النتيجة فورًا'] },
      cons: { en: ['Cannot do calculations or logic', 'Needs CSS for design and JavaScript for interaction'],
              ar: ['لا تستطيع عمل حسابات أو منطق', 'تحتاج CSS للتصميم و JavaScript للتفاعل'] },
      resources: [
        { name: 'MDN Web Docs — HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'docs' },
        { name: 'W3Schools — HTML', url: 'https://www.w3schools.com/html/', type: 'tutorial' },
        { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/', type: 'course' },
        { name: 'Elzero Web School', url: 'https://www.youtube.com/@ElzeroWebSchool', type: 'youtubeAr' }
      ]
    },
    {
      id: 'css', name: 'CSS', short: 'CSS', color: COLORS.purple, fields: ['frontend'], difficulty: 2, demand: 4,
      tagline: { en: 'The designer of the web: colors, layout and motion.', ar: 'مصمم الويب: الألوان وترتيب العناصر والحركة.' },
      simple: {
        en: 'If HTML is the walls, CSS is the paint, furniture and decoration. It controls colors, fonts, spacing, and how the page looks on phones and computers.',
        ar: 'لو HTML هي الجدران، فإن CSS هي الدهان والأثاث والديكور. تتحكم في الألوان والخطوط والمسافات، وفي شكل الصفحة على الموبايل والكمبيوتر.'
      },
      startIf: { en: 'you learned HTML basics and want your pages to look good.', ar: 'تعلمت أساسيات HTML وتريد أن تبدو صفحاتك جميلة.' },
      uses: { en: ['Designing how websites look', 'Making pages fit phones and computers', 'Animations & effects', 'Dark mode and themes'],
              ar: ['تصميم شكل المواقع', 'جعل الصفحات تناسب الموبايل والكمبيوتر', 'الحركات والتأثيرات', 'الوضع الداكن والثيمات'] },
      time: { basics: { en: '2–4 weeks', ar: '2–4 أسابيع' }, pro: { en: '3–6 months', ar: '3–6 شهور' } },
      demandNote: { en: 'Required in every frontend job, together with HTML and JavaScript.', ar: 'مطلوبة في كل وظائف الفرونت إند، مع HTML و JavaScript.' },
      companiesAll: true,
      companies: ['Apple', 'Airbnb', 'Netflix', 'Spotify', 'Stripe'],
      pros: { en: ['Instant visual results — fun to learn', 'Flexbox & Grid make layouts easy', 'Animations without any JavaScript'],
              ar: ['نتائج مرئية فورية — ممتعة في التعلم', 'Flexbox و Grid يسهّلان ترتيب العناصر', 'حركات بدون أي JavaScript'] },
      cons: { en: ['Placing elements can be confusing at first', 'Big projects get messy without organization'],
              ar: ['ترتيب العناصر قد يكون مربكًا في البداية', 'المشاريع الكبيرة تصبح فوضوية بدون تنظيم'] },
      resources: [
        { name: 'MDN Web Docs — CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', type: 'docs' },
        { name: 'web.dev — Learn CSS', url: 'https://web.dev/learn/css', type: 'course' },
        { name: 'CSS-Tricks — Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'tutorial' },
        { name: 'Elzero Web School', url: 'https://www.youtube.com/@ElzeroWebSchool', type: 'youtubeAr' }
      ]
    },
    {
      id: 'python', name: 'Python', short: 'PY', color: COLORS.cyan, fields: ['backend', 'data'], difficulty: 2, demand: 5,
      tagline: { en: 'Easy to read and very powerful — the top choice for AI and data.', ar: 'سهلة القراءة وقوية جدًا — الاختيار الأول للذكاء الاصطناعي والبيانات.' },
      simple: {
        en: 'A language that reads almost like plain English, which makes it a great first language. You can use it to analyze data, build AI, run the server side of websites, or automate boring tasks.',
        ar: 'لغة تُقرأ تقريبًا مثل الإنجليزية العادية، لذلك هي ممتازة كأول لغة. تستخدمها لتحليل البيانات، وبناء الذكاء الاصطناعي، وتشغيل الجزء الخلفي للمواقع، وأتمتة المهام المملة.'
      },
      startIf: { en: 'you want an easy first language, or you are interested in AI and data.', ar: 'كنت تريد لغة أولى سهلة، أو تهتم بالذكاء الاصطناعي والبيانات.' },
      uses: { en: ['Artificial intelligence & machine learning', 'Data analysis', 'The server side of websites (Django, Flask)', 'Automating repetitive tasks'],
              ar: ['الذكاء الاصطناعي وتعلم الآلة', 'تحليل البيانات', 'الجزء الخلفي للمواقع (Django و Flask)', 'أتمتة المهام المتكررة'] },
      time: { basics: { en: '1–2 months', ar: '1–2 شهر' }, pro: { en: '1–2 years', ar: '1–2 سنة' } },
      demandNote: { en: 'One of the most popular and requested languages in the world, especially in AI and data.', ar: 'من أكثر اللغات انتشارًا وطلبًا في العالم، خاصة في الذكاء الاصطناعي والبيانات.' },
      companies: ['Google', 'Instagram', 'Netflix', 'Spotify', 'NASA'],
      pros: { en: ['Clean, readable code — great for beginners', 'Ready-made libraries for almost everything', 'The leader in AI and data science'],
              ar: ['كود واضح وسهل القراءة — ممتازة للمبتدئين', 'مكتبات جاهزة لكل شيء تقريبًا', 'الرائدة في الذكاء الاصطناعي وعلم البيانات'] },
      cons: { en: ['Runs slower than C++ and Java', 'Not the usual choice for mobile apps', 'Some mistakes only appear while the program runs'],
              ar: ['أبطأ في التنفيذ من C++ و Java', 'ليست الاختيار المعتاد لتطبيقات الموبايل', 'بعض الأخطاء لا تظهر إلا أثناء تشغيل البرنامج'] },
      resources: [
        { name: 'Official Python Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'docs' },
        { name: 'Harvard CS50P', url: 'https://cs50.harvard.edu/python/', type: 'course' },
        { name: 'W3Schools — Python', url: 'https://www.w3schools.com/python/', type: 'tutorial' },
        { name: 'Elzero Web School', url: 'https://www.youtube.com/@ElzeroWebSchool', type: 'youtubeAr' }
      ]
    },
    {
      id: 'cpp', name: 'C++', short: 'C++', color: COLORS.purple, fields: ['systems'], difficulty: 5, demand: 4,
      tagline: { en: 'Raw speed and full control — it powers games and systems.', ar: 'سرعة عالية جدًا وتحكم كامل — تشغّل الألعاب والأنظمة.' },
      simple: {
        en: 'A very fast and powerful language that works close to the computer’s hardware. Big games, browsers and operating systems are built with it — but it makes you handle many details yourself, like memory.',
        ar: 'لغة سريعة وقوية جدًا تعمل قريبًا من مكونات الكمبيوتر. تُبنى بها الألعاب الكبيرة والمتصفحات وأنظمة التشغيل — لكنها تجعلك مسؤولًا عن تفاصيل كثيرة بنفسك، مثل إدارة الذاكرة.'
      },
      startIf: { en: 'you love challenges, want to make games, or want to understand how computers really work.', ar: 'كنت تحب التحدي، أو تريد صناعة ألعاب، أو فهم طريقة عمل الكمبيوتر من الداخل.' },
      uses: { en: ['Game engines & big games', 'Operating systems & browsers', 'Devices & hardware (embedded systems)', 'Competitive programming'],
              ar: ['محركات الألعاب والألعاب الكبيرة', 'أنظمة التشغيل والمتصفحات', 'برمجة الأجهزة والهاردوير', 'البرمجة التنافسية'] },
      time: { basics: { en: '2–3 months', ar: '2–3 شهور' }, pro: { en: '2–3 years', ar: '2–3 سنوات' } },
      demandNote: { en: 'Strong demand in games, devices and high-performance software, but fewer beginner jobs.', ar: 'طلب قوي في الألعاب والأجهزة والبرامج عالية الأداء، لكن وظائف المبتدئين أقل.' },
      companies: ['Microsoft', 'Adobe', 'Epic Games', 'Google Chrome', 'NVIDIA'],
      pros: { en: ['Extremely fast programs', 'Full control over memory and hardware', 'Builds strong problem-solving skills'],
              ar: ['برامج سريعة للغاية', 'تحكم كامل في الذاكرة والهاردوير', 'تبني مهارات قوية في حل المشكلات'] },
      cons: { en: ['Hard for beginners', 'Memory mistakes are easy to make and hard to find', 'Building things takes longer'],
              ar: ['صعبة على المبتدئين', 'أخطاء الذاكرة سهلة الحدوث وصعبة الاكتشاف', 'بناء البرامج يأخذ وقتًا أطول'] },
      resources: [
        { name: 'LearnCpp.com', url: 'https://www.learncpp.com/', type: 'tutorial' },
        { name: 'W3Schools — C++', url: 'https://www.w3schools.com/cpp/', type: 'tutorial' },
        { name: 'cppreference', url: 'https://en.cppreference.com/', type: 'docs' },
        { name: 'Microsoft Learn — C++', url: 'https://learn.microsoft.com/en-us/cpp/cpp/', type: 'docs' }
      ]
    },
    {
      id: 'java', name: 'Java', short: 'JV', color: COLORS.turq, fields: ['backend', 'mobile'], difficulty: 3, demand: 5,
      tagline: { en: 'Solid and everywhere — the backbone of big company systems.', ar: 'قوية ومنتشرة — العمود الفقري لأنظمة الشركات الكبرى.' },
      simple: {
        en: 'A solid, well-organized language used to build big systems that must keep running without stopping, like banking apps and company servers. Code you write once can run on many kinds of devices.',
        ar: 'لغة قوية ومنظمة تُستخدم لبناء أنظمة كبيرة يجب أن تعمل بدون توقف، مثل تطبيقات البنوك وخوادم الشركات. الكود الذي تكتبه مرة يعمل على أنواع كثيرة من الأجهزة.'
      },
      startIf: { en: 'you want to work in big companies or banks, or build the server side of apps.', ar: 'كنت تريد العمل في شركات كبرى أو بنوك، أو بناء الجزء الخلفي للتطبيقات.' },
      uses: { en: ['The server side of big systems (Spring)', 'Android apps (alongside Kotlin)', 'Banking & financial systems', 'Large company software'],
              ar: ['الجزء الخلفي للأنظمة الكبيرة (Spring)', 'تطبيقات أندرويد (بجانب Kotlin)', 'الأنظمة البنكية والمالية', 'برامج الشركات الكبرى'] },
      time: { basics: { en: '2–3 months', ar: '2–3 شهور' }, pro: { en: '1–2 years', ar: '1–2 سنة' } },
      demandNote: { en: 'Highly requested in big companies, banks and enterprise systems.', ar: 'مطلوبة بشدة في الشركات الكبرى والبنوك وأنظمة المؤسسات.' },
      companies: ['Amazon', 'Netflix', 'LinkedIn', 'Uber', 'Spotify'],
      pros: { en: ['Runs on almost any device (thanks to the JVM)', 'Teaches you to write organized code', 'Huge job market in big companies'],
              ar: ['تعمل على أي جهاز تقريبًا (بفضل JVM)', 'تعلمك كتابة كود منظم', 'سوق عمل ضخم في الشركات الكبرى'] },
      cons: { en: ['You write more code for simple things', 'Uses more memory', 'For new Android apps, Google now recommends Kotlin'],
              ar: ['تكتب كودًا أكثر لأشياء بسيطة', 'تستهلك ذاكرة أكثر', 'في تطبيقات أندرويد الجديدة، Google تفضل Kotlin الآن'] },
      resources: [
        { name: 'dev.java — Learn Java', url: 'https://dev.java/learn/', type: 'docs' },
        { name: 'MOOC.fi — Java Programming', url: 'https://java-programming.mooc.fi/', type: 'course' },
        { name: 'W3Schools — Java', url: 'https://www.w3schools.com/java/', type: 'tutorial' }
      ]
    },
    {
      id: 'flutter', name: 'Flutter', short: 'FL', color: COLORS.cyan, fields: ['mobile'], difficulty: 3, demand: 4,
      tagline: { en: 'Build one app that runs on both Android and iPhone.', ar: 'اصنع تطبيقًا واحدًا يعمل على أندرويد وآيفون معًا.' },
      simple: {
        en: 'A toolkit from Google that lets you write one app and run it on both Android and iPhone. You write it in a language called Dart, and you see your changes instantly while building.',
        ar: 'مجموعة أدوات من Google تتيح لك كتابة تطبيق واحد يعمل على أندرويد وآيفون معًا. تكتبه بلغة اسمها Dart، وترى تعديلاتك فورًا أثناء البناء.'
      },
      startIf: { en: 'your goal is to build mobile apps quickly for Android and iPhone.', ar: 'كان هدفك بناء تطبيقات موبايل بسرعة لأندرويد وآيفون.' },
      note: { en: '<b>Flutter</b> is a framework (a set of ready tools), not a language — you write it in <b>Dart</b>.', ar: '<b>Flutter</b> إطار عمل (مجموعة أدوات جاهزة) وليس لغة — وتكتب به بلغة <b>Dart</b>.' },
      uses: { en: ['Android & iPhone apps from one code', 'Web apps', 'Desktop apps', 'Beautiful custom app designs'],
              ar: ['تطبيقات أندرويد وآيفون بكود واحد', 'تطبيقات الويب', 'برامج الكمبيوتر', 'تصميمات تطبيقات جميلة ومخصصة'] },
      time: { basics: { en: '1–2 months', ar: '1–2 شهر' }, pro: { en: '6–12 months', ar: '6–12 شهر' } },
      demandNote: { en: 'Growing fast, especially in startups and freelance app projects.', ar: 'ينمو بسرعة، خاصة في الشركات الناشئة ومشاريع الفريلانس.' },
      companies: ['Google Pay', 'BMW', 'Alibaba', 'eBay Motors', 'Toyota'],
      pros: { en: ['One code for Android and iPhone', 'Fast and beautiful designs', 'Hot Reload — see changes instantly'],
              ar: ['كود واحد لأندرويد وآيفون', 'تصميمات سريعة وجميلة', 'Hot Reload — ترى التغيير فورًا'] },
      cons: { en: ['You need to learn Dart first', 'App size is a bit larger', 'Some phone features need extra work'],
              ar: ['تحتاج تعلم Dart أولًا', 'حجم التطبيق أكبر قليلًا', 'بعض خصائص الهاتف تحتاج مجهودًا إضافيًا'] },
      resources: [
        { name: 'Flutter Docs', url: 'https://docs.flutter.dev/', type: 'docs' },
        { name: 'Dart Language Tour', url: 'https://dart.dev/language', type: 'docs' },
        { name: 'Flutter Codelabs', url: 'https://docs.flutter.dev/codelabs', type: 'course' },
        { name: 'Flutter YouTube', url: 'https://www.youtube.com/@flutterdev', type: 'youtube' }
      ]
    }
  ];
  const byId = Object.fromEntries(LANGS.map((l) => [l.id, l]));
  const FIELDS = ['all', 'frontend', 'backend', 'mobile', 'data', 'systems'];

  /* ---------- Quiz ---------- */
  const QUIZ = [
    { q: { en: 'What do you want to build first?', ar: 'ما أول شيء تريد بناءه؟' },
      o: [
        { en: 'Websites and how they look', ar: 'مواقع ويب وشكلها', s: { html: 3, css: 3 } },
        { en: 'Mobile apps', ar: 'تطبيقات موبايل', s: { flutter: 4, java: 1 } },
        { en: 'AI and data projects', ar: 'مشاريع ذكاء اصطناعي وبيانات', s: { python: 4 } },
        { en: 'Games and very fast programs', ar: 'ألعاب وبرامج سريعة جدًا', s: { cpp: 4 } },
        { en: 'Servers and big company systems', ar: 'خوادم وأنظمة شركات كبيرة', s: { java: 3, python: 2 } }
      ] },
    { q: { en: 'How much programming experience do you have?', ar: 'ما خبرتك في البرمجة؟' },
      o: [
        { en: 'None — I am starting from zero', ar: 'لا شيء — أبدأ من الصفر', s: { html: 2, python: 2, css: 1 } },
        { en: 'A little', ar: 'قليلة', s: { css: 2, python: 1, flutter: 2, java: 1 } },
        { en: 'I am comfortable with code', ar: 'متمكن من الكود', s: { cpp: 3, java: 2 } }
      ] },
    { q: { en: 'What do you enjoy more?', ar: 'ما الذي تستمتع به أكثر؟' },
      o: [
        { en: 'Design, colors and visuals', ar: 'التصميم والألوان والشكل', s: { css: 3, html: 1, flutter: 2 } },
        { en: 'Solving logic puzzles', ar: 'حل الألغاز المنطقية', s: { cpp: 3, python: 2 } },
        { en: 'Building big, organized systems', ar: 'بناء أنظمة كبيرة ومنظمة', s: { java: 3 } },
        { en: 'Automating tasks and playing with data', ar: 'أتمتة المهام واللعب بالبيانات', s: { python: 3 } }
      ] },
    { q: { en: 'How fast do you want to see results?', ar: 'متى تريد أن ترى نتائج؟' },
      o: [
        { en: 'Right away', ar: 'فورًا', s: { html: 3, css: 2 } },
        { en: 'In a few weeks', ar: 'خلال أسابيع', s: { python: 2, flutter: 2 } },
        { en: 'I am patient — I want deep skills', ar: 'عندي صبر — أريد مهارات عميقة', s: { cpp: 2, java: 2 } }
      ] },
    { q: { en: 'Where would you like to work?', ar: 'أين تحب أن تعمل؟' },
      o: [
        { en: 'Freelance or startups', ar: 'فريلانس أو شركات ناشئة', s: { flutter: 2, html: 1, css: 2, python: 1 } },
        { en: 'Big companies and banks', ar: 'شركات كبرى وبنوك', s: { java: 3 } },
        { en: 'AI and research', ar: 'الذكاء الاصطناعي والأبحاث', s: { python: 3 } },
        { en: 'Game studios and tech giants', ar: 'استوديوهات ألعاب وعمالقة التقنية', s: { cpp: 3 } }
      ] }
  ];

  /* ---------- Translations ---------- */
  const I18N = {
    en: {
      langToggle: 'Switch to Arabic', themeToggle: 'Toggle dark / light mode', openMenu: 'Open languages menu', close: 'Close', backTop: 'Back to top', searchBtn: 'Search languages',
      menuTitle: 'All Languages', menuHint: 'Pick a language to jump to it in the orbit.',
      heroKicker: 'BootUP — your starting point',
      heroTitle: 'Boot up your journey into programming',
      heroSub: 'Not sure where to start? Here are six technologies explained simply: what each one does, how hard it is, how long it takes, and where it can take you.',
      heroExplore: 'Explore Languages', heroQuiz: 'Take the Quiz',
      proofVisits: 'visits', proofRating: 'from', proofReviews: 'ratings',
      langsTitle: 'The Language Orbit', langsSub: 'Hover to pause, click a circle to open it, or drag to spin the orbit.', langsSubTouch: 'Tap any circle to open it, or swipe sideways to spin the orbit.',
      searchPh: 'Search a language or a field...',
      f_all: 'All', f_frontend: 'Frontend', f_backend: 'Backend', f_mobile: 'Mobile', f_data: 'Data / AI', f_systems: 'Games / Systems',
      d_all: 'Any difficulty', d_easy: 'Easy', d_medium: 'Medium', d_hard: 'Hard',
      noResults: 'No language matches your search.',
      glTitle: 'Words you will meet:',
      gl: [
        ['Frontend', 'The part of a website or app you see and touch.'],
        ['Backend', 'The hidden part behind the scenes: servers, data and logic.'],
        ['Framework', 'Ready-made tools that save you from starting from zero.'],
        ['Data / AI', 'Teaching computers to learn from data and make decisions.']
      ],
      simpleTitle: 'In simple words', startIf: 'Start with it if', difficulty: 'Difficulty', usedFor: 'What it is used for', learningTime: 'Learning time',
      timeNote: 'Approximate, studying 1–2 hours a day.', basics: 'Basics', pro: 'Professional',
      demand: 'Job market demand', companies: 'Who uses it', companiesAll: 'Almost every website on the internet, for example:', pros: 'Pros', cons: 'Cons', resources: 'Free learning resources',
      favAdd: 'Add to favorites', favRemove: 'Saved in favorites',
      lvl: ['', 'Very easy', 'Easy', 'Medium', 'Hard', 'Very hard'],
      dem: ['', 'Low', 'Low', 'Medium', 'High', 'Very high'],
      rt: { docs: 'Docs', course: 'Course', tutorial: 'Tutorial', youtube: 'YouTube', youtubeAr: 'YouTube · Arabic' },
      favTitle: 'Your Favorites', favSub: 'Languages you saved to learn — kept on this device.',
      favEmpty: 'No favorites yet. Open any language and tap the heart.', favRemoveShort: 'Remove',
      cmpTitle: 'Compare Two Languages', cmpSub: 'Pick any two and see them side by side.',
      rmTitle: 'Learning Roadmaps', rmSub: 'A clear order to follow. Tick each step when you finish it — your progress is saved.',
      rmFront: 'Frontend', rmFrontDesc: 'Build what users see and interact with.',
      rmBack: 'Backend', rmBackDesc: 'Build the logic, servers and data behind apps.',
      rmOptional: 'Optional', rmNext: 'Next step', rmDone: 'done', rmMark: 'Mark as done',
      rmSteps: {
        front: [
          { n: 'HTML', d: 'Build the structure of your first pages.' },
          { n: 'CSS', d: 'Style them and make them fit every screen.' },
          { n: 'JavaScript', d: 'Add interaction — your next step after this site.', tag: 'next' }
        ],
        back: [
          { n: 'C++', d: 'Build strong problem-solving foundations.', tag: 'opt' },
          { n: 'Python / Java', d: 'Pick one and learn it deeply.' },
          { n: 'Databases & APIs', d: 'Store data and connect your app to the world.', tag: 'next' }
        ]
      },
      rateTitle: 'Rate BootUP', rateSub: 'Your opinion helps make the site better for everyone.',
      rateAvgOf: 'out of 5', rateCountOne: 'rating', rateCountMany: 'ratings', rateNone: 'No ratings yet — be the first!', rateSoon: 'Ratings will open soon.',
      rateAsk: 'How useful was the site for you?', rateLabels: ['', 'Not useful', 'Could be better', 'Good', 'Very good', 'Excellent!'],
      rateName: 'Your name (optional)', rateComment: 'Your comment (optional)', rateSend: 'Send rating', ratePick: 'Choose the number of stars first.',
      rateThanks: 'Thank you! Your rating was received.', rateFail: 'Something went wrong. Please try again.', rateDone: 'You already rated BootUP — thank you!', rateAnon: 'Visitor',
      quizTitle: 'Which Language Fits You?', quizSub: '5 quick questions, one recommendation.',
      quizIntro: 'Answer honestly — there are no wrong answers. We will match you with the best place to start.',
      quizStart: 'Start the Quiz', quizQ: 'Question', quizOf: 'of',
      quizResult: 'Your best match is', quizRetry: 'Retake quiz', quizShow: 'Show it in the orbit', quizShare: 'Share my result',
      quizShareText: (n) => `My result on the BootUP quiz is ${n} 🚀 Find out which programming language fits you:`,
      ctTitle: 'Contact Us', ctSub: 'Have a question or an idea? Reach out anytime.',
      ctPhone: 'Call me', ctWa: 'Chat on WhatsApp', ctFollow: 'Follow me',
      ctName: 'Your name', ctMsg: 'Your message', ctSend: 'Send via WhatsApp', ctErr: 'Please fill in your name and message.',
      waHello: 'Hello, I am',
      shareSite: 'Share the site', shareText: 'BootUP — find the right programming language for you and start the right way 🚀',
      copied: 'Link copied — paste it anywhere!', install: 'Install the app',
      iosInstall: 'On iPhone: tap the Share button, then “Add to Home Screen”.',
      madeBy: 'made by'
    },
    ar: {
      langToggle: 'التبديل إلى الإنجليزية', themeToggle: 'تبديل الوضع الداكن / الفاتح', openMenu: 'فتح قائمة اللغات', close: 'إغلاق', backTop: 'العودة للأعلى', searchBtn: 'ابحث عن لغة',
      menuTitle: 'كل اللغات', menuHint: 'اختر لغة للانتقال إليها في المدار.',
      heroKicker: 'BootUP — نقطة انطلاقك',
      heroTitle: 'شغّل رحلتك في عالم البرمجة',
      heroSub: 'مش عارف تبدأ منين؟ هنا ست تقنيات مشروحة ببساطة: كل واحدة بتعمل إيه، صعوبتها، تاخد وقت قد إيه، وممكن توصلك لفين.',
      heroExplore: 'تصفح اللغات', heroQuiz: 'ابدأ الاختبار',
      proofVisits: 'زيارة للموقع', proofRating: 'من', proofReviews: 'تقييم',
      langsTitle: 'مدار اللغات', langsSub: 'مرّر المؤشر لإيقاف الحركة، واضغط على أي دائرة لفتحها، أو اسحب لتدوير المدار.', langsSubTouch: 'اضغط على أي دائرة لفتحها، أو اسحب يمينًا ويسارًا لتدوير المدار.',
      searchPh: 'ابحث عن لغة أو مجال...',
      f_all: 'الكل', f_frontend: 'فرونت إند', f_backend: 'باك إند', f_mobile: 'موبايل', f_data: 'بيانات وذكاء اصطناعي', f_systems: 'ألعاب وأنظمة',
      d_all: 'كل المستويات', d_easy: 'سهل', d_medium: 'متوسط', d_hard: 'صعب',
      noResults: 'لا توجد لغة تطابق بحثك.',
      glTitle: 'مصطلحات هتقابلك:',
      gl: [
        ['Frontend', 'الجزء اللي بتشوفه وبتتعامل معاه في الموقع أو التطبيق.'],
        ['Backend', 'الجزء اللي ورا الكواليس: السيرفر والبيانات والمنطق.'],
        ['Framework', 'أدوات جاهزة بتوفر عليك إنك تبدأ من الصفر.'],
        ['Data / AI', 'إنك تعلّم الكمبيوتر يتعلم من البيانات ويتخذ قرارات.']
      ],
      simpleTitle: 'ببساطة', startIf: 'ابدأ بها إذا', difficulty: 'مستوى الصعوبة', usedFor: 'تُستخدم في', learningTime: 'وقت التعلم',
      timeNote: 'تقريبًا، مع مذاكرة ساعة إلى ساعتين يوميًا.', basics: 'الأساسيات', pro: 'الاحتراف',
      demand: 'الطلب في سوق العمل', companies: 'شركات ومواقع تستخدمها', companiesAll: 'تقريبًا كل موقع على الإنترنت، مثل:', pros: 'المميزات', cons: 'العيوب', resources: 'مصادر تعلم مجانية',
      favAdd: 'أضف للمفضلة', favRemove: 'محفوظة في المفضلة',
      lvl: ['', 'سهل جدًا', 'سهل', 'متوسط', 'صعب', 'صعب جدًا'],
      dem: ['', 'منخفض', 'منخفض', 'متوسط', 'مرتفع', 'مرتفع جدًا'],
      rt: { docs: 'توثيق', course: 'كورس', tutorial: 'شرح', youtube: 'يوتيوب', youtubeAr: 'يوتيوب · عربي' },
      favTitle: 'مفضلتك', favSub: 'اللغات التي حفظتها لتتعلمها — محفوظة على هذا الجهاز.',
      favEmpty: 'لا توجد لغات مفضلة بعد. افتح أي لغة واضغط على القلب.', favRemoveShort: 'إزالة',
      cmpTitle: 'قارن بين لغتين', cmpSub: 'اختر أي لغتين وشاهدهما جنبًا إلى جنب.',
      rmTitle: 'خرائط التعلم', rmSub: 'ترتيب واضح تمشي عليه. علّم على كل خطوة لما تخلّصها — وتقدمك هيتحفظ.',
      rmFront: 'الفرونت إند', rmFrontDesc: 'ابنِ ما يراه المستخدم ويتفاعل معه.',
      rmBack: 'الباك إند', rmBackDesc: 'ابنِ المنطق والخوادم والبيانات خلف التطبيقات.',
      rmOptional: 'اختياري', rmNext: 'الخطوة التالية', rmDone: 'مكتمل', rmMark: 'علّم كمكتمل',
      rmSteps: {
        front: [
          { n: 'HTML', d: 'ابنِ هيكل صفحاتك الأولى.' },
          { n: 'CSS', d: 'نسّقها واجعلها مناسبة لكل الشاشات.' },
          { n: 'JavaScript', d: 'أضف التفاعل — خطوتك التالية بعد هذا الموقع.', tag: 'next' }
        ],
        back: [
          { n: 'C++', d: 'ابنِ أساسًا قويًا في حل المشكلات.', tag: 'opt' },
          { n: 'Python / Java', d: 'اختر واحدة وتعمّق فيها.' },
          { n: 'Databases & APIs', d: 'خزّن البيانات واربط تطبيقك بالعالم.', tag: 'next' }
        ]
      },
      rateTitle: 'قيّم BootUP', rateSub: 'رأيك بيساعدنا نخلي الموقع أحسن للكل.',
      rateAvgOf: 'من 5', rateCountOne: 'تقييم', rateCountMany: 'تقييم', rateNone: 'لسه مفيش تقييمات — كن أول واحد!', rateSoon: 'التقييمات هتفتح قريب.',
      rateAsk: 'الموقع فادك قد إيه؟', rateLabels: ['', 'مش مفيد', 'محتاج يتحسن', 'كويس', 'كويس جدًا', 'ممتاز!'],
      rateName: 'اسمك (اختياري)', rateComment: 'تعليقك (اختياري)', rateSend: 'إرسال التقييم', ratePick: 'اختار عدد النجوم الأول.',
      rateThanks: 'شكرًا ليك! تقييمك وصل.', rateFail: 'حصلت مشكلة، جرّب تاني.', rateDone: 'إنت قيّمت BootUP قبل كده — شكرًا ليك!', rateAnon: 'زائر',
      quizTitle: 'أي لغة تناسبك؟', quizSub: '5 أسئلة سريعة وترشيح واحد.',
      quizIntro: 'جاوب بصراحة — مفيش إجابة غلط. هنرشحلك أحسن نقطة تبدأ منها.',
      quizStart: 'ابدأ الاختبار', quizQ: 'سؤال', quizOf: 'من',
      quizResult: 'أنسب اختيار ليك هو', quizRetry: 'أعد الاختبار', quizShow: 'اعرضها في المدار', quizShare: 'شارك نتيجتك',
      quizShareText: (n) => `نتيجتي في اختبار BootUP طلعت ${n} 🚀 اعرف إنت كمان أنهي لغة برمجة تناسبك:`,
      ctTitle: 'تواصل معنا', ctSub: 'عندك سؤال أو فكرة؟ تواصل معي في أي وقت.',
      ctPhone: 'اتصل بي', ctWa: 'تحدث على واتساب', ctFollow: 'تابعني',
      ctName: 'اسمك', ctMsg: 'رسالتك', ctSend: 'إرسال عبر واتساب', ctErr: 'من فضلك اكتب اسمك ورسالتك.',
      waHello: 'مرحبًا، أنا',
      shareSite: 'شارك الموقع', shareText: 'BootUP | بوت اب — اعرف أنسب لغة برمجة ليك وابدأ صح 🚀',
      copied: 'اتنسخ اللينك — ابعته لأي حد!', install: 'ثبّت التطبيق',
      iosInstall: 'على الآيفون: اضغط زرار المشاركة، وبعدين "إضافة إلى الشاشة الرئيسية".',
      madeBy: 'صُنع بواسطة'
    }
  };

  /* ---------- State ---------- */
  let lang = store.get('lang', 'ar');
  if (!I18N[lang]) lang = 'ar';
  let theme = store.get('theme', 'dark');
  let favs = store.get('favs', []).filter((id) => byId[id]);
  let rmDone = store.get('rmDone', { front: [], back: [] });
  const filter = { q: '', field: 'all', diff: 'all' };
  const t = (k) => I18N[lang][k];
  const L = (o) => (o && typeof o === 'object' && !Array.isArray(o) && 'en' in o ? o[lang] : o);
  let openId = null;

  /* =========================================================
     Toast & share
     ========================================================= */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  }
  async function share(text) {
    const url = siteUrl();
    const data = { title: 'BootUP | بوت اب', text, url };
    if (navigator.share) {
      try { await navigator.share(data); return; } catch (e) { if (e && e.name === 'AbortError') return; }
    }
    const full = `${text} ${url}`;
    try { await navigator.clipboard.writeText(full); toast(t('copied')); }
    catch (e) { window.open(`https://wa.me/?text=${encodeURIComponent(full)}`, '_blank', 'noopener'); }
  }

  /* =========================================================
     Theme & language
     ========================================================= */
  function applyTheme() {
    document.documentElement.dataset.theme = theme;
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#04050c' : '#1a3466');
  }

  function applyLang() {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar' ? 'BootUP | بوت اب — ابدأ رحلتك في البرمجة' : 'BootUP — Boot up your programming journey';
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $('#langBtn').textContent = lang === 'ar' ? 'EN' : 'ع';
    renderSideList();
    renderFilters();
    renderGlossary();
    renderFavs();
    renderCompareSelects();
    renderCompare();
    renderRoadmaps();
    renderQuiz();
    renderRating();
    renderProof();
    if (openId) renderModal(openId);
  }

  /* =========================================================
     Typing effect
     ========================================================= */
  let typeToken = 0;
  function typeText(el, text, speed = 55) {
    const token = ++typeToken;
    el.textContent = '';
    if (reduceMotion) { el.textContent = text; return; }
    const chars = [...text];
    let i = 0;
    (function step() {
      if (token !== typeToken) return;
      el.textContent = chars.slice(0, ++i).join('');
      if (i < chars.length) setTimeout(step, speed + Math.random() * 40);
    })();
  }
  let heroStarted = false;
  function startHero() { heroStarted = true; typeText($('#heroTitle'), t('heroTitle')); }

  /* =========================================================
     Loader
     ========================================================= */
  function runLoader() {
    const loader = $('#loader');
    const nameEl = $('#loaderName');
    const bar = $('#loadFill').parentElement;
    const pctEl = $('#loadPct');
    const name = 'BootUP';
    let n = 0;
    (function typeName() {
      nameEl.textContent = name.slice(0, ++n);
      if (n < name.length) setTimeout(typeName, reduceMotion ? 0 : 150);
    })();
    const dur = reduceMotion ? 500 : 2600;
    const start = performance.now();
    const ease = (x) => 1 - Math.pow(1 - x, 2.4);
    function frame(now) {
      const p = Math.min(1, (now - start) / dur);
      const v = ease(p);
      bar.style.setProperty('--p', v.toFixed(4));
      pctEl.textContent = Math.round(v * 100) + '%';
      if (p < 1) requestAnimationFrame(frame);
      else setTimeout(finish, 350);
    }
    function finish() {
      loader.classList.add('done');
      document.body.classList.remove('locked');
      setTimeout(() => loader.remove(), 900);
      setTimeout(startHero, 250);
    }
    document.body.classList.add('locked');
    requestAnimationFrame(frame);
  }

  /* =========================================================
     Animated background (stars + soft links)
     ========================================================= */
  function initBackground() {
    const cv = $('#bg');
    const ctx = cv.getContext('2d');
    let w, h, dpr, stars = [], running = true;
    const palette = [[42, 212, 191], [147, 114, 232], [141, 228, 238]];
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, Math.max(40, (w * h) / 16000)));
      stars = Array.from({ length: count }, () => {
        const c = Math.random() < 0.1 ? palette[2] : palette[Math.random() < 0.55 ? 0 : 1];
        return {
          x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.4,
          vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18 - 0.05,
          c, tw: Math.random() * Math.PI * 2, ts: 0.01 + Math.random() * 0.02, py: 0
        };
      });
    }
    let scrollShift = 0;
    window.addEventListener('scroll', () => { scrollShift = window.scrollY * 0.04; }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(draw);
    });
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!reduceMotion) {
          s.x += s.vx; s.y += s.vy; s.tw += s.ts;
          if (s.x < -5) s.x = w + 5; if (s.x > w + 5) s.x = -5;
          if (s.y < -5) s.y = h + 5; if (s.y > h + 5) s.y = -5;
        }
        s.py = (((s.y - scrollShift) % h) + h) % h;
      }
      ctx.lineWidth = 0.6;
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          const dx = a.x - b.x, dy = a.py - b.py;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            ctx.strokeStyle = `rgba(147,114,232,${(1 - d2 / 9000) * 0.14})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.py); ctx.lineTo(b.x, b.py); ctx.stroke();
          }
        }
      }
      for (const s of stars) {
        const alpha = 0.35 + Math.sin(s.tw) * 0.3;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.c[0]},${s.c[1]},${s.c[2]},${alpha})`;
        ctx.arc(s.x, s.py, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.4) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${s.c[0]},${s.c[1]},${s.c[2]},${alpha * 0.18})`;
          ctx.arc(s.x, s.py, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
  }

  /* =========================================================
     Cursor: glowing dot + circuit-board trail (desktop)
     Touch: glowing ripple
     ========================================================= */
  function initCursor() {
    const fx = $('#fx');
    document.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;
      const r = document.createElement('span');
      r.className = 'ripple';
      r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
      fx.appendChild(r);
      setTimeout(() => r.remove(), 800);
    }, { passive: true });

    if (!finePointer) return;
    document.documentElement.classList.add('custom-cursor');
    const dot = $('#cursorDot');
    const cv = $('#circuit');
    const ctx = cv.getContext('2d');
    let w, h, dpr;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const LIFE = 650;           // how long a trace stays (ms)
    const STEP = 30;            // distance between corners (px) — keeps the trail light
    const segs = [];            // { x1, y1, x2, y2, t }
    const pads = [];            // { x, y, t }
    let last = null, active = false, mx = -100, my = -100;

    function addTrace(ax, ay, bx, by, now) {
      // circuit style: diagonal 45° part, then a straight part
      const dx = bx - ax, dy = by - ay;
      const d = Math.min(Math.abs(dx), Math.abs(dy));
      const mx2 = ax + Math.sign(dx) * d, my2 = ay + Math.sign(dy) * d;
      if (d > 2) segs.push({ x1: ax, y1: ay, x2: mx2, y2: my2, t: now });
      segs.push({ x1: mx2, y1: my2, x2: bx, y2: by, t: now });
      if (Math.random() < 0.45) pads.push({ x: bx, y: by, t: now });
      if (Math.random() < 0.18) { // small side branch ending with a pad
        const horiz = Math.abs(dx) > Math.abs(dy);
        const len = 10 + Math.random() * 12;
        const sgn = Math.random() < 0.5 ? -1 : 1;
        const ex = horiz ? bx + len * 0.7 * sgn : bx + len * sgn;
        const ey = horiz ? by + len * sgn : by + len * 0.7 * sgn;
        segs.push({ x1: bx, y1: by, x2: ex, y2: ey, t: now });
        pads.push({ x: ex, y: ey, t: now });
      }
    }

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (reduceMotion) return;
      const now = performance.now();
      if (!last || now - last.t > 200) { last = { x: mx, y: my, t: now }; return; }
      if (Math.hypot(mx - last.x, my - last.y) >= STEP) {
        addTrace(last.x, last.y, mx, my, now);
        last = { x: mx, y: my, t: now };
        if (!active) { active = true; requestAnimationFrame(render); }
      }
    }, { passive: true });

    function render(now) {
      ctx.clearRect(0, 0, w, h);
      while (segs.length && now - segs[0].t > LIFE) segs.shift();
      while (pads.length && now - pads[0].t > LIFE) pads.shift();
      ctx.lineCap = 'round';
      for (const s of segs) {
        const k = 1 - (now - s.t) / LIFE;
        ctx.strokeStyle = k > 0.5 ? `rgba(42,212,191,${k})` : `rgba(147,114,232,${k * 1.4})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
      }
      for (const p of pads) {
        const k = 1 - (now - p.t) / LIFE;
        ctx.strokeStyle = `rgba(147,114,232,${k})`;
        ctx.fillStyle = `rgba(4,5,12,${k})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      if (segs.length || pads.length) requestAnimationFrame(render);
      else { active = false; ctx.clearRect(0, 0, w, h); }
    }

    document.addEventListener('mouseover', (e) => {
      dot.classList.toggle('hover', !!e.target.closest('a, button, input, textarea, select, label, .node'));
    });
    document.addEventListener('mousedown', () => dot.classList.add('press'));
    document.addEventListener('mouseup', () => dot.classList.remove('press'));
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = ''; });
  }

  /* =========================================================
     Scroll: progress, header, back-to-top, reveal, pause off-screen
     ========================================================= */
  function initScroll() {
    const bar = $('#progress');
    const top = $('#toTop');
    const header = $('#topbar');
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${p})`;
      top.classList.toggle('show', window.scrollY > 600);
      header.classList.toggle('scrolled', window.scrollY > 30);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    window.__reveal = (el) => io.observe(el);
    $$('.reveal').forEach((el) => io.observe(el));

    // Pause CSS animations inside sections that are not on screen
    const pauseIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => en.target.classList.toggle('offscreen', !en.isIntersecting));
    }, { rootMargin: '120px 0px' });
    $$('.hero, .section, .footer').forEach((el) => pauseIO.observe(el));
  }

  /* =========================================================
     Side menu
     ========================================================= */
  function renderSideList() {
    $('#sideList').innerHTML = LANGS.map((l, i) => `
      <li><button type="button" data-go="${l.id}" style="--c:${l.color};transition-delay:${0.05 * i + 0.1}s">
        <span class="side-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="side-dot">${esc(l.short)}</span>
        <span class="side-txt"><strong>${esc(l.name)}</strong><small>${esc(L(l.tagline))}</small></span>
        ${favs.includes(l.id) ? '<span class="side-fav" aria-hidden="true">♥</span>' : ''}
      </button></li>`).join('');
  }
  let closeMenu = () => {};
  function initMenu() {
    const menu = $('#sideMenu'), scrim = $('#scrim'), btn = $('#menuBtn');
    const open = () => { menu.classList.add('open'); scrim.classList.add('show'); menu.setAttribute('aria-hidden', 'false'); btn.setAttribute('aria-expanded', 'true'); };
    closeMenu = () => { menu.classList.remove('open'); scrim.classList.remove('show'); menu.setAttribute('aria-hidden', 'true'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', open);
    $('#menuClose').addEventListener('click', closeMenu);
    scrim.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    $('#sideList').addEventListener('click', (e) => {
      const b = e.target.closest('[data-go]');
      if (!b) return;
      closeMenu();
      goToLanguage(b.dataset.go, true);
    });
  }

  /* =========================================================
     Orbit
     ========================================================= */
  const orbit = { angle: -Math.PI / 2, target: null, hover: 0, dragging: false, size: 0, node: 0, nodes: [], last: 0, suppressClick: false, visible: true, running: false };

  function buildOrbit() {
    const wrap = $('#orbit');
    const syms = [['{ }', '</>', ';'], ['#', '( )', '{ }'], ['=>', ';', '</>'], ['&&', '{ }', '#'], ['( )', '</>', '=>'], ['//', ';', '{ }']];
    LANGS.forEach((l, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'node';
      b.dataset.id = l.id;
      b.setAttribute('aria-label', l.name);
      b.style.setProperty('--c', l.color);
      b.style.setProperty('--spin', (3.5 + i * 0.6) + 's');
      b.style.setProperty('--orb', (6 + (i % 3) * 1.5) + 's');
      b.style.setProperty('--delay', (-i * 0.5) + 's');
      b.innerHTML = `
        <span class="node-body">
          <span class="node-spin"></span>
          <span class="node-core"><span class="node-name">${esc(l.name)}</span></span>
          <span class="node-orbs">${syms[i % syms.length].map((s) => `<i>${esc(s)}</i>`).join('')}</span>
        </span>`;
      b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') orbit.hover++; });
      b.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') orbit.hover = Math.max(0, orbit.hover - 1); });
      b.addEventListener('click', () => { if (!orbit.suppressClick) openModal(l.id); });
      wrap.appendChild(b);
      orbit.nodes.push(b);
    });

    function measure() {
      orbit.size = wrap.clientWidth;
      orbit.node = orbit.nodes[0] ? orbit.nodes[0].offsetWidth : 90;
      place();
    }

    // Drag / swipe to rotate
    let down = false, startX = 0, lastX = 0, moved = false, pid = null;
    wrap.addEventListener('pointerdown', (e) => { down = true; moved = false; startX = lastX = e.clientX; pid = e.pointerId; });
    wrap.addEventListener('pointermove', (e) => {
      if (!down || e.pointerId !== pid) return;
      if (!moved && Math.abs(e.clientX - startX) > 8) {
        moved = true; orbit.dragging = true; orbit.target = null;
        try { wrap.setPointerCapture(pid); } catch (err) { /* ignore */ }
      }
      if (moved) { orbit.angle += (e.clientX - lastX) * 0.009; lastX = e.clientX; place(); }
    });
    const end = () => {
      if (!down) return;
      down = false;
      if (moved) { orbit.suppressClick = true; setTimeout(() => { orbit.suppressClick = false; }, 60); }
      orbit.dragging = false;
    };
    wrap.addEventListener('pointerup', end);
    wrap.addEventListener('pointercancel', end);

    function place() {
      const n = orbit.nodes.length;
      const r = orbit.size / 2 - orbit.node / 2 - 6;
      const c = orbit.size / 2 - orbit.node / 2;
      for (let i = 0; i < n; i++) {
        const a = orbit.angle + (i * Math.PI * 2) / n;
        orbit.nodes[i].style.transform = `translate3d(${(c + r * Math.cos(a)).toFixed(2)}px, ${(c + r * Math.sin(a)).toFixed(2)}px, 0)`;
      }
    }

    function loop(now) {
      if (!orbit.visible) { orbit.running = false; return; }  // stop completely when off-screen
      const dt = Math.min(50, now - (orbit.last || now));
      orbit.last = now;
      const paused = orbit.hover > 0 || openId !== null || orbit.dragging;
      if (orbit.target !== null) {
        let diff = orbit.target - orbit.angle;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        orbit.angle += diff * 0.08;
        if (Math.abs(diff) < 0.002) orbit.target = null;
        place();
      } else if (!paused && !reduceMotion) {
        orbit.angle += dt * 0.00012;
        place();
      }
      requestAnimationFrame(loop);
    }
    function start() {
      if (orbit.running) return;
      orbit.running = true; orbit.last = 0;
      requestAnimationFrame(loop);
    }
    new IntersectionObserver((entries) => {
      orbit.visible = entries[0].isIntersecting;
      if (orbit.visible) start();
    }, { rootMargin: '100px 0px' }).observe(wrap);

    measure();
    window.addEventListener('resize', measure);
    start();
  }

  function focusNode(id) {
    const i = LANGS.findIndex((l) => l.id === id);
    if (i < 0) return;
    orbit.target = -Math.PI / 2 - (i * Math.PI * 2) / LANGS.length;
    const node = orbit.nodes[i];
    orbit.nodes.forEach((n) => n.classList.remove('flash', 'focus'));
    node.classList.add('flash', 'focus');
    setTimeout(() => node.classList.remove('flash', 'focus'), 2600);
  }

  function resetFilters() {
    filter.q = ''; filter.field = 'all'; filter.diff = 'all';
    $('#searchInput').value = '';
    renderFilters();
    applyFilter();
  }

  function goToLanguage(id, open) {
    resetFilters();
    const sec = $('#orbit');
    const y = sec.getBoundingClientRect().top + window.scrollY - (window.innerHeight - sec.offsetHeight) / 2;
    window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion ? 'auto' : 'smooth' });
    setTimeout(() => focusNode(id), 450);
    if (open) setTimeout(() => openModal(id), 1300);
  }

  function goToSearch() {
    closeMenu();
    const tb = $('#toolbar');
    const y = tb.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion ? 'auto' : 'smooth' });
    setTimeout(() => $('#searchInput').focus({ preventScroll: true }), reduceMotion ? 0 : 650);
  }

  /* =========================================================
     Search, filter & glossary
     ========================================================= */
  function renderFilters() {
    $('#fieldChips').innerHTML = FIELDS.map((f) =>
      `<button type="button" class="chip${filter.field === f ? ' active' : ''}" data-field="${f}">${esc(t('f_' + f))}</button>`).join('');
    $('#diffSelect').innerHTML = ['all', 'easy', 'medium', 'hard'].map((d) =>
      `<option value="${d}"${filter.diff === d ? ' selected' : ''}>${esc(t('d_' + d))}</option>`).join('');
  }
  function renderGlossary() {
    $('#glossary').innerHTML = `<div class="gl-title">${esc(t('glTitle'))}</div>` +
      t('gl').map(([k, v]) => `<div class="gl-item"><b dir="ltr">${esc(k)}</b><span>${esc(v)}</span></div>`).join('');
  }
  function matches(l) {
    if (filter.field !== 'all' && !l.fields.includes(filter.field)) return false;
    if (filter.diff === 'easy' && l.difficulty > 2) return false;
    if (filter.diff === 'medium' && l.difficulty !== 3) return false;
    if (filter.diff === 'hard' && l.difficulty < 4) return false;
    const q = filter.q.trim().toLowerCase();
    if (q) {
      const hay = [l.name, l.tagline.en, l.tagline.ar, ...l.uses.en, ...l.uses.ar,
        ...l.fields.map((f) => I18N.en['f_' + f] + ' ' + I18N.ar['f_' + f])].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }
  function applyFilter() {
    const active = filter.q.trim() || filter.field !== 'all' || filter.diff !== 'all';
    let count = 0;
    orbit.nodes.forEach((n) => {
      const ok = matches(byId[n.dataset.id]);
      if (ok) count++;
      n.classList.toggle('dim', active && !ok);
      n.classList.toggle('match', active && ok);
      n.tabIndex = active && !ok ? -1 : 0;
    });
    $('#noResults').hidden = !(active && count === 0);
  }
  function initFilters() {
    $('#searchInput').addEventListener('input', (e) => { filter.q = e.target.value; applyFilter(); });
    $('#fieldChips').addEventListener('click', (e) => {
      const b = e.target.closest('[data-field]');
      if (!b) return;
      filter.field = b.dataset.field;
      $$('.chip', $('#fieldChips')).forEach((c) => c.classList.toggle('active', c === b));
      applyFilter();
    });
    $('#diffSelect').addEventListener('change', (e) => { filter.diff = e.target.value; applyFilter(); });
    $('#searchBtn').addEventListener('click', goToSearch);
  }

  /* =========================================================
     Details modal
     ========================================================= */
  const dots = (n) => `<div class="dots">${[1, 2, 3, 4, 5].map((i) => `<span class="${i <= n ? 'on' : ''}"></span>`).join('')}</div>`;
  const heart = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-9.4-9.3C1.3 7.9 3.4 4.5 6.9 4.5c2.1 0 3.6 1.1 5.1 3 1.5-1.9 3-3 5.1-3 3.5 0 5.6 3.4 4.3 6.7-1.9 4.7-9.4 9.3-9.4 9.3z"/></svg>';

  function renderModal(id) {
    const l = byId[id];
    const isFav = favs.includes(id);
    let k = 0;
    const box = (cls, title, inner) => `<div class="m-box ${cls}" style="animation-delay:${0.06 * k++ + 0.1}s"><h4>${esc(title)}</h4>${inner}</div>`;
    $('#modalBody').innerHTML = `
      <div class="m-head">
        <div class="m-badge" style="--c:${l.color}">${esc(l.short)}</div>
        <div><h3 id="mTitle">${esc(l.name)}</h3><p>${esc(L(l.tagline))}</p></div>
      </div>
      <div class="m-simple">
        <h4>${esc(t('simpleTitle'))}</h4>
        ${esc(L(l.simple))}
        <div class="m-start"><b>${esc(t('startIf'))}</b> ${esc(L(l.startIf))}</div>
      </div>
      ${l.note ? `<div class="m-note"><span aria-hidden="true">💡</span><span>${L(l.note)}</span></div>` : ''}
      <button type="button" class="fav-btn${isFav ? ' on' : ''}" data-fav="${id}">${heart}<span>${esc(isFav ? t('favRemove') : t('favAdd'))}</span></button>
      <div class="m-grid">
        ${box('wide', t('usedFor'), `<div class="tags">${L(l.uses).map((u) => `<span class="tag">${esc(u)}</span>`).join('')}</div>`)}
        ${box('', t('difficulty'), `${dots(l.difficulty)}<span class="lvl">${esc(t('lvl')[l.difficulty])}</span>`)}
        ${box('', t('demand'), `<div class="meter"><span data-w="${l.demand * 20}"></span></div><span class="lvl">${esc(t('dem')[l.demand])}</span><span class="m-sub">${esc(L(l.demandNote))}</span>`)}
        ${box('wide', t('learningTime'), `<div class="time-row"><div><small>${esc(t('basics'))}</small><strong>${esc(L(l.time.basics))}</strong></div><div><small>${esc(t('pro'))}</small><strong>${esc(L(l.time.pro))}</strong></div></div><span class="m-sub">${esc(t('timeNote'))}</span>`)}
        ${box('wide', t('companies'), `${l.companiesAll ? `<span class="m-sub" style="margin:0 0 8px">${esc(t('companiesAll'))}</span>` : ''}<div class="tags">${l.companies.map((c) => `<span class="tag" dir="ltr">${esc(c)}</span>`).join('')}</div>`)}
        ${box('pros', t('pros'), `<ul>${L(l.pros).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`)}
        ${box('cons', t('cons'), `<ul>${L(l.cons).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`)}
        ${box('wide', t('resources'), `<div class="res-list">${l.resources.map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener"><span dir="ltr">${esc(r.name)}</span><small>${esc(t('rt')[r.type])}</small></a>`).join('')}</div>`)}
      </div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      $$('.meter span[data-w]', $('#modalBody')).forEach((s) => { s.style.width = s.dataset.w + '%'; });
    }));
  }

  let lastFocus = null;
  function openModal(id) {
    openId = id;
    lastFocus = document.activeElement;
    renderModal(id);
    const m = $('#modal');
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
    $('.modal-panel', m).scrollTop = 0;
    setTimeout(() => $('.modal-close', m).focus({ preventScroll: true }), 50);
  }
  function closeModal() {
    if (!openId) return;
    openId = null;
    const m = $('#modal');
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function initModal() {
    $('#modal').addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) closeModal();
      const f = e.target.closest('[data-fav]');
      if (f) toggleFav(f.dataset.fav);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  /* =========================================================
     Favorites
     ========================================================= */
  function toggleFav(id) {
    favs = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
    store.set('favs', favs);
    renderFavs();
    renderSideList();
    if (openId === id) {
      const b = $('.fav-btn');
      const on = favs.includes(id);
      b.classList.toggle('on', on);
      $('span', b).textContent = on ? t('favRemove') : t('favAdd');
    }
  }
  function renderFavs() {
    const box = $('#favBox');
    const badge = $('#favBadge');
    badge.textContent = favs.length;
    badge.hidden = !favs.length;
    if (!favs.length) { box.innerHTML = ''; return; }
    box.innerHTML = `<span class="fav-label">♥ ${esc(t('favTitle'))}</span>` + favs.map((id) => {
      const l = byId[id];
      return `<span class="fav-chip" style="--c:${l.color}">${esc(l.name)}<button type="button" data-unfav="${id}" aria-label="${esc(t('favRemoveShort'))} ${esc(l.name)}">&times;</button></span>`;
    }).join('');
  }
  function initFavs() {
    $('#favBox').addEventListener('click', (e) => {
      const b = e.target.closest('[data-unfav]');
      if (b) toggleFav(b.dataset.unfav);
    });
  }

  /* =========================================================
     Compare
     ========================================================= */
  const cmp = { a: 'html', b: 'python' };
  function renderCompareSelects() {
    const opts = (sel) => LANGS.map((l) => `<option value="${l.id}"${sel === l.id ? ' selected' : ''}>${esc(l.name)}</option>`).join('');
    $('#cmpA').innerHTML = opts(cmp.a);
    $('#cmpB').innerHTML = opts(cmp.b);
  }
  function renderCompare() {
    const A = byId[cmp.a], B = byId[cmp.b];
    let k = 0;
    const cell = (cls, html) => `<div class="cmp-cell ${cls}" style="animation-delay:${0.04 * k++}s">${html}</div>`;
    const row = (label, fn, cls = '') => `<div class="cmp-row"><div class="cmp-label">${esc(label)}</div>${cell(cls, fn(A))}${cell(cls, fn(B))}</div>`;
    $('#cmpGrid').innerHTML = `
      <div class="cmp-head">
        ${[A, B].map((l) => `<div class="cmp-name" style="--c:${l.color}"><strong>${esc(l.name)}</strong><small>${esc(L(l.tagline))}</small></div>`).join('')}
      </div>
      ${row(t('simpleTitle'), (l) => esc(L(l.simple)))}
      ${row(t('difficulty'), (l) => `${dots(l.difficulty)}<span class="lvl">${esc(t('lvl')[l.difficulty])}</span>`)}
      ${row(t('demand'), (l) => `<div class="meter"><span data-w="${l.demand * 20}"></span></div><span class="lvl">${esc(t('dem')[l.demand])}</span>`)}
      ${row(t('basics'), (l) => `<strong>${esc(L(l.time.basics))}</strong>`)}
      ${row(t('pro'), (l) => `<strong>${esc(L(l.time.pro))}</strong>`)}
      ${row(t('usedFor'), (l) => `<div class="tags">${L(l.uses).map((u) => `<span class="tag">${esc(u)}</span>`).join('')}</div>`)}
      ${row(t('pros'), (l) => `<ul>${L(l.pros).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`)}
      ${row(t('cons'), (l) => `<ul>${L(l.cons).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`, 'cons')}`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      $$('.meter span[data-w]', $('#cmpGrid')).forEach((s) => { s.style.width = s.dataset.w + '%'; });
    }));
  }
  function initCompare() {
    $('#cmpA').addEventListener('change', (e) => { cmp.a = e.target.value; renderCompare(); });
    $('#cmpB').addEventListener('change', (e) => { cmp.b = e.target.value; renderCompare(); });
  }

  /* =========================================================
     Roadmaps (with saved progress)
     ========================================================= */
  const CHECK = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  function renderRoadmaps() {
    const s = t('rmSteps');
    const block = (key, title, desc, ico, steps) => {
      const done = (rmDone[key] || []).filter((i) => i < steps.length);
      const pct = Math.round((done.length / steps.length) * 100);
      return `
      <div class="rm glass" data-rm="${key}">
        <div class="rm-top"><div class="rm-ico">${ico}</div><div><h3>${esc(title)}</h3><p>${esc(desc)}</p></div></div>
        <div class="rm-progress"><div class="meter"><span style="width:${pct}%"></span></div><span dir="ltr">${done.length}/${steps.length}</span><span>${esc(t('rmDone'))}</span></div>
        <ol class="steps">
          ${steps.map((st, i) => `
            <li class="step${done.includes(i) ? ' done' : ''}" style="transition-delay:${0.25 + i * 0.3}s">
              <span class="step-num">${String(i + 1).padStart(2, '0')}</span>
              <div class="step-txt">
                <strong>${esc(st.n)}</strong>${st.tag ? `<span class="step-tag">${esc(st.tag === 'opt' ? t('rmOptional') : t('rmNext'))}</span>` : ''}
                <p>${esc(st.d)}</p>
              </div>
              <button type="button" class="step-check" data-check="${key}:${i}" aria-pressed="${done.includes(i)}" aria-label="${esc(t('rmMark'))}: ${esc(st.n)}">${CHECK}</button>
            </li>`).join('')}
        </ol>
      </div>`;
    };
    const wrap = $('#roadmaps');
    const wasIn = $$('.rm.in', wrap).map((el) => el.dataset.rm);
    wrap.innerHTML = block('front', t('rmFront'), t('rmFrontDesc'), '&lt;/&gt;', s.front) + block('back', t('rmBack'), t('rmBackDesc'), '{ }', s.back);
    $$('.rm', wrap).forEach((el) => {
      if (wasIn.includes(el.dataset.rm)) el.classList.add('in');
      else if (window.__reveal) window.__reveal(el);
    });
  }
  function initRoadmaps() {
    $('#roadmaps').addEventListener('click', (e) => {
      const b = e.target.closest('[data-check]');
      if (!b) return;
      const [key, idx] = b.dataset.check.split(':');
      const i = +idx;
      const list = rmDone[key] || [];
      rmDone[key] = list.includes(i) ? list.filter((x) => x !== i) : [...list, i];
      store.set('rmDone', rmDone);
      renderRoadmaps();
    });
  }

  /* =========================================================
     Quiz
     ========================================================= */
  const quiz = { step: -1, scores: {}, result: null };
  function renderQuiz() {
    const card = $('#quizCard');
    if (quiz.step === -1) {
      card.innerHTML = `
        <div class="quiz-intro">
          <div class="quiz-orb" aria-hidden="true">?</div>
          <p>${esc(t('quizIntro'))}</p>
          <button type="button" class="btn btn-primary" data-quiz="start">${esc(t('quizStart'))}</button>
        </div>`;
      return;
    }
    if (quiz.result) {
      const l = byId[quiz.result];
      card.innerHTML = `
        <div class="quiz-result">
          <small>${esc(t('quizResult'))}</small>
          <div class="res-orb" style="--c:${l.color}">${esc(l.name)}</div>
          <p>${esc(L(l.simple))}</p>
          <div class="hero-btns">
            <button type="button" class="btn btn-primary" data-quiz="show">${esc(t('quizShow'))}</button>
            <button type="button" class="btn btn-ghost" data-quiz="share">${esc(t('quizShare'))}</button>
            <button type="button" class="btn btn-ghost" data-quiz="retry">${esc(t('quizRetry'))}</button>
          </div>
        </div>`;
      return;
    }
    const q = QUIZ[quiz.step];
    const keys = ['A', 'B', 'C', 'D', 'E'];
    const pct = (quiz.step / QUIZ.length) * 100;
    card.innerHTML = `
      <div class="q-top"><span>${esc(t('quizQ'))} ${quiz.step + 1} ${esc(t('quizOf'))} ${QUIZ.length}</span><span dir="ltr">${Math.round(pct)}%</span></div>
      <div class="q-bar"><span style="width:${pct}%"></span></div>
      <h3 class="q-text">${esc(L(q.q))}</h3>
      <div class="q-opts">
        ${q.o.map((o, i) => `<button type="button" class="q-opt" data-opt="${i}" style="animation-delay:${0.06 * i}s"><span class="q-key">${keys[i]}</span><span>${esc(o[lang])}</span></button>`).join('')}
      </div>`;
  }
  function initQuiz() {
    $('#quizCard').addEventListener('click', (e) => {
      const act = e.target.closest('[data-quiz]');
      if (act) {
        const a = act.dataset.quiz;
        if (a === 'start' || a === 'retry') { quiz.step = 0; quiz.scores = {}; quiz.result = null; renderQuiz(); }
        if (a === 'show') goToLanguage(quiz.result, false);
        if (a === 'share') share(t('quizShareText')(byId[quiz.result].name));
        return;
      }
      const opt = e.target.closest('[data-opt]');
      if (!opt || quiz.result) return;
      $$('.q-opt', $('#quizCard')).forEach((b) => { b.disabled = true; });
      opt.classList.add('picked');
      const o = QUIZ[quiz.step].o[+opt.dataset.opt];
      Object.entries(o.s).forEach(([k, v]) => { quiz.scores[k] = (quiz.scores[k] || 0) + v; });
      const bar = $('.q-bar span', $('#quizCard'));
      if (bar) bar.style.width = ((quiz.step + 1) / QUIZ.length) * 100 + '%';
      setTimeout(() => {
        quiz.step++;
        if (quiz.step >= QUIZ.length) {
          quiz.result = LANGS.map((l) => l.id).reduce((best, id) => ((quiz.scores[id] || 0) > (quiz.scores[best] || 0) ? id : best), LANGS[0].id);
        }
        renderQuiz();
      }, 420);
    });
  }

  /* =========================================================
     Ratings (Firebase Firestore) & social proof
     ========================================================= */
  const rating = { ready: false, enabled: !!(CFG.firebase && CFG.firebase.apiKey && CFG.firebase.projectId), avg: null, count: 0, reviews: [], pick: 0, sending: false };
  let fb = null;
  const visits = { count: null };

  async function initFirebase() {
    if (!rating.enabled) return;
    try {
      const V = '10.12.2';
      const appMod = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
      const fs = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`);
      const app = appMod.initializeApp(CFG.firebase);
      fb = { fs, db: fs.getFirestore(app) };
      rating.ready = true;
      await loadRatings();
    } catch (e) {
      console.warn('BootUP: Firebase could not load', e);
      rating.enabled = false;
      renderRating();
    }
  }
  async function loadRatings() {
    if (!fb) return;
    const { fs, db } = fb;
    const col = fs.collection(db, 'ratings');
    try {
      const agg = await fs.getAggregateFromServer(col, { avg: fs.average('stars'), n: fs.count() });
      const d = agg.data();
      rating.count = d.n || 0;
      rating.avg = d.avg || null;
    } catch (e) {
      const all = await fs.getDocs(fs.query(col, fs.limit(1000)));
      const arr = all.docs.map((x) => x.data().stars).filter((n) => typeof n === 'number');
      rating.count = arr.length;
      rating.avg = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
    }
    try {
      const latest = await fs.getDocs(fs.query(col, fs.orderBy('createdAt', 'desc'), fs.limit(8)));
      rating.reviews = latest.docs.map((x) => x.data()).filter((r) => (r.comment || '').trim());
    } catch (e) { rating.reviews = []; }
    renderRating();
    renderProof();
  }
  const starsView = (v) => `<div class="stars-view">${[1, 2, 3, 4, 5].map((i) => `<span style="color:${i <= Math.round(v) ? 'var(--turq)' : 'rgba(233,247,249,.18)'}">${STAR}</span>`).join('')}</div>`;

  function renderRating() {
    const sum = $('#rateSummary'), form = $('#rateForm'), list = $('#reviews');
    const fmtAvg = rating.avg ? rating.avg.toFixed(1) : '–';
    sum.innerHTML = `
      <div class="rate-avg" dir="ltr">${fmtAvg}</div>
      ${starsView(rating.avg || 0)}
      <div class="rate-count">${rating.count ? `<span dir="ltr">${rating.count.toLocaleString('en-US')}</span> ${esc(rating.count === 1 ? t('rateCountOne') : t('rateCountMany'))}` : esc(rating.enabled ? t('rateNone') : t('rateSoon'))}</div>`;

    if (store.get('rated', false)) {
      form.innerHTML = `<div class="rate-thanks"><div class="big" aria-hidden="true">💜</div><strong>${esc(t('rateDone'))}</strong></div>`;
    } else {
      form.innerHTML = `
        <h3>${esc(t('rateAsk'))}</h3>
        <div class="star-input" role="radiogroup">
          ${[1, 2, 3, 4, 5].map((i) => `<button type="button" role="radio" aria-checked="${rating.pick === i}" aria-label="${i}" data-star="${i}" class="${i <= rating.pick ? 'on' : ''}">${STAR}</button>`).join('')}
        </div>
        <div class="star-label" id="starLabel">${rating.pick ? esc(t('rateLabels')[rating.pick]) : ''}</div>
        <label class="field"><span>${esc(t('rateName'))}</span><input type="text" id="rName" maxlength="40" autocomplete="name"></label>
        <label class="field"><span>${esc(t('rateComment'))}</span><textarea id="rComment" rows="3" maxlength="300"></textarea></label>
        <button type="button" class="btn btn-primary" id="rSend"${rating.enabled ? '' : ' disabled style="opacity:.55"'}>${esc(t('rateSend'))}</button>
        ${rating.enabled ? '' : `<p class="rate-note">${esc(t('rateSoon'))}</p>`}`;
    }
    list.innerHTML = rating.reviews.slice(0, 8).map((r, i) => `
      <div class="review" style="animation-delay:${i * 0.07}s">
        ${starsView(r.stars || 0)}
        <p>${esc(r.comment || '')}</p>
        <small>— ${esc((r.name || '').trim() || t('rateAnon'))}</small>
      </div>`).join('');
    list.hidden = !rating.reviews.length;
  }
  function initRating() {
    const form = $('#rateForm');
    form.addEventListener('click', async (e) => {
      const st = e.target.closest('[data-star]');
      if (st) {
        rating.pick = +st.dataset.star;
        $$('[data-star]', form).forEach((b) => {
          const on = +b.dataset.star <= rating.pick;
          b.classList.toggle('on', on);
          b.setAttribute('aria-checked', String(+b.dataset.star === rating.pick));
        });
        st.classList.remove('pop'); void st.offsetWidth; st.classList.add('pop');
        $('#starLabel').textContent = t('rateLabels')[rating.pick];
        return;
      }
      if (e.target.closest('#rSend')) {
        if (!rating.enabled || rating.sending) return;
        if (!rating.pick) { toast(t('ratePick')); return; }
        if (!fb) { toast(t('rateFail')); return; }
        rating.sending = true;
        const name = $('#rName').value.trim().slice(0, 40);
        const comment = $('#rComment').value.trim().slice(0, 300);
        try {
          await fb.fs.addDoc(fb.fs.collection(fb.db, 'ratings'), { stars: rating.pick, name, comment, createdAt: fb.fs.serverTimestamp() });
          store.set('rated', true);
          toast(t('rateThanks'));
          await loadRatings();
        } catch (err) {
          console.warn(err);
          toast(t('rateFail'));
        } finally {
          rating.sending = false;
        }
      }
    });
  }

  async function loadVisits() {
    const code = (CFG.goatcounterCode || '').trim();
    if (!code) return;
    try {
      const res = await fetch(`https://${encodeURIComponent(code)}.goatcounter.com/counter/TOTAL.json`);
      if (!res.ok) return;
      const data = await res.json();
      visits.count = data.count || null;
      renderProof();
    } catch (e) { /* counter not available */ }
  }
  function renderProof() {
    const el = $('#proof');
    const parts = [];
    if (visits.count) parts.push(`<span><i class="live"></i><b dir="ltr">${esc(visits.count)}</b> ${esc(t('proofVisits'))}</span>`);
    if (rating.count && rating.avg) parts.push(`<span>⭐ <b dir="ltr">${rating.avg.toFixed(1)}</b> ${esc(t('proofRating'))} <b dir="ltr">${rating.count}</b> ${esc(t('proofReviews'))}</span>`);
    el.innerHTML = parts.join('');
    el.hidden = !parts.length;
  }

  /* =========================================================
     Analytics (only if IDs are set in config.js)
     ========================================================= */
  function loadScript(src, attrs = {}) {
    const s = document.createElement('script');
    s.async = true; s.src = src;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    document.head.appendChild(s);
  }
  function initAnalytics() {
    const ga = (CFG.googleAnalyticsId || '').trim();
    if (ga) {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', ga);
    }
    const cl = (CFG.clarityId || '').trim();
    if (cl) {
      window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
      loadScript(`https://www.clarity.ms/tag/${encodeURIComponent(cl)}`);
    }
    const gc = (CFG.goatcounterCode || '').trim();
    if (gc) loadScript('https://gc.zgo.at/count.js', { 'data-goatcounter': `https://${gc}.goatcounter.com/count` });
  }

  /* =========================================================
     Install as app (PWA)
     ========================================================= */
  function initPWA() {
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
    const btn = $('#installBtn');
    let deferred = null;
    const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; btn.hidden = false; });
    window.addEventListener('appinstalled', () => { btn.hidden = true; });
    if (isIOS && !standalone) btn.hidden = false;
    btn.addEventListener('click', async () => {
      if (deferred) { deferred.prompt(); await deferred.userChoice; deferred = null; btn.hidden = true; }
      else if (isIOS) toast(t('iosInstall'));
    });
  }

  /* =========================================================
     Contact
     ========================================================= */
  function renderSocials() {
    const html = SOCIALS.map((s) => `<a class="social" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${s.svg}</a>`).join('');
    $$('[data-socials]').forEach((el) => { el.innerHTML = html; });
  }
  function initContact() {
    const form = $('#contactForm');
    const name = $('#cName'), msg = $('#cMsg'), err = $('#formErr');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const n = name.value.trim(), m = msg.value.trim();
      name.parentElement.classList.toggle('err', !n);
      msg.parentElement.classList.toggle('err', !m);
      if (!n || !m) { err.hidden = false; return; }
      err.hidden = true;
      const text = `${t('waHello')} ${n}\n\n${m}`;
      window.open(`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      form.reset();
    });
    [name, msg].forEach((el) => el.addEventListener('input', () => { el.parentElement.classList.remove('err'); }));
  }

  /* =========================================================
     Init
     ========================================================= */
  function init() {
    if (!finePointer) { const el = $('[data-i18n="langsSub"]'); if (el) el.dataset.i18n = 'langsSubTouch'; }
    applyTheme();
    renderSocials();
    buildOrbit();
    initScroll();
    applyLang();
    initBackground();
    initCursor();
    initMenu();
    initFilters();
    initModal();
    initFavs();
    initCompare();
    initRoadmaps();
    initQuiz();
    initRating();
    initContact();
    initPWA();
    $('#year').textContent = new Date().getFullYear();
    const wm = $('#wm');
    let wmTimer;
    wm.addEventListener('click', () => {
      wm.classList.remove('active'); void wm.offsetWidth; wm.classList.add('active');
      clearTimeout(wmTimer); wmTimer = setTimeout(() => wm.classList.remove('active'), 1300);
    });
    $$('[data-share]').forEach((b) => b.addEventListener('click', () => { closeMenu(); share(t('shareText')); }));

    $('#themeBtn').addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      store.set('theme', theme);
      applyTheme();
    });
    $('#langBtn').addEventListener('click', () => {
      lang = lang === 'ar' ? 'en' : 'ar';
      store.set('lang', lang);
      applyLang();
      applyFilter();
      if (heroStarted) typeText($('#heroTitle'), t('heroTitle'), 35);
    });

    runLoader();
    window.addEventListener('load', () => {
      initAnalytics();
      loadVisits();
      initFirebase();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
