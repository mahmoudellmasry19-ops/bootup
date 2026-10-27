/* =========================================================
   BootUP | بوت اب — ملف الإعدادات
   ده الملف الوحيد اللي هتعدّل فيه بعد ما ترفع الموقع.
   أي خانة فاضية '' معناها إن الخدمة دي مقفولة لحد ما تحط بياناتها.
   ========================================================= */
window.BOOTUP_CONFIG = {
  // لينك موقعك بعد الرفع (من غير / في الآخر)
  siteUrl: 'https://bootup.vercel.app',

  // Google Analytics — الكود بيبدأ بـ G-   (مثال: 'G-AB12CD34EF')
  googleAnalyticsId: '',

  // Microsoft Clarity — كود المشروع   (مثال: 'abcd1234ef')
  clarityId: '',

  // GoatCounter — اسم الكود اللي اخترته   (مثال: 'bootup' لو لوحة التحكم بتاعتك bootup.goatcounter.com)
  goatcounterCode: '',

  // Firebase — الصق هنا البيانات اللي Firebase هيديهالك (firebaseConfig)
  // مثال:
  // firebase: {
  //   apiKey: '...',
  //   authDomain: '...',
  //   projectId: '...',
  //   storageBucket: '...',
  //   messagingSenderId: '...',
  //   appId: '...'
  // }
  firebase: null
};
