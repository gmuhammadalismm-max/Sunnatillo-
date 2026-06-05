import { PortfolioData, ThemePreset } from './types';

export const themePresets: ThemePreset[] = [
  {
    id: 'natural-tones',
    name: 'Natural Tones (Tabiiy)',
    bg: 'bg-[#F9F7F2]',
    text: 'text-[#3C3A33]',
    accent: 'bg-[#827F6A] text-[#F9F7F2] hover:bg-[#686552]',
    accentHover: 'hover:text-[#827F6A]',
    cardBg: 'bg-[#EAE7DD]/60 border-[#DCD9D0]',
    borderColor: 'border-[#DCD9D0]',
    mutedText: 'text-[#6B685E]'
  },
  {
    id: 'dark-nordic',
    name: 'Nordic Slate (Toq)',
    bg: 'bg-zinc-950',
    text: 'text-zinc-100',
    accent: 'bg-indigo-500 text-white hover:bg-indigo-600',
    accentHover: 'hover:text-indigo-400',
    cardBg: 'bg-zinc-900/80 border-zinc-800/80',
    borderColor: 'border-zinc-800',
    mutedText: 'text-zinc-400'
  },
  {
    id: 'cyber-brutalist',
    name: 'Neo Brutalist (Neon)',
    bg: 'bg-black',
    text: 'text-zinc-100',
    accent: 'bg-lime-400 text-black hover:bg-lime-500 font-bold border-2 border-black',
    accentHover: 'hover:text-lime-400',
    cardBg: 'bg-zinc-900 border-2 border-zinc-700 hover:border-lime-400 transition-colors',
    borderColor: 'border-zinc-700',
    mutedText: 'text-zinc-400'
  },
  {
    id: 'light-minimal',
    name: 'Clean Studio (Yorug\')',
    bg: 'bg-zinc-50',
    text: 'text-zinc-900',
    accent: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800',
    accentHover: 'hover:text-zinc-600',
    cardBg: 'bg-white border-zinc-200/80 shadow-xs',
    borderColor: 'border-zinc-200',
    mutedText: 'text-zinc-500'
  },
  {
    id: 'warm-editorial',
    name: 'Creamy Muse (Issiq)',
    bg: 'bg-[#FAF6EE]',
    text: 'text-stone-900',
    accent: 'bg-orange-800 text-stone-100 hover:bg-orange-900',
    accentHover: 'hover:text-orange-800',
    cardBg: 'bg-stone-100/60 border-stone-200',
    borderColor: 'border-stone-200',
    mutedText: 'text-stone-600'
  }
];

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Muhammadali G'ofurov",
    title: "Mustaqil Grafik Dizayner",
    subTitle: "Brending, vizual identika va zamonaviy qadoqlash dizayni bo'yicha mutaxassis",
    bio: "Salom! Men professional grafik dizaynerman. 5 yildan ortiq vaqt davomida brendlar uchun unikal vizual tillar, logotiplar va qadoq dizaynlarini yaratib kelmoqdaman. Mening maqsadim — biznesingiz g'oyasini go'zal, xaridorgir va unutilmas dizayn orqali mijozlarga yetkazish.",
    location: "Toshkent, O'zbekiston",
    email: "gmuhammadalismm@gmail.com",
    phone: "+998 90 123 45 67",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    socials: {
      telegram: "https://t.me/muhammadali_design",
      instagram: "https://instagram.com/muhammadali_designer",
      behance: "https://behance.net/muhammadalidesign",
      dribbble: "https://dribbble.com/muhammadali",
      linkedin: "https://linkedin.com/in/muhammadali"
    }
  },
  projects: [
    {
      id: "proj-1",
      title: "Elixir Premium Choylari Brendingi",
      description: "Yuqori sifatli tabiiy choylar seriyasi uchun ekologik qadoq va minimalist brend dizayni. Sharq madaniyati va skandinav minimalizmini birlashtirgan vizual identika.",
      content: "Ushbu loyihada asosiy maqsad tabiiylik va hashamatni ifodalash edi. Shuning uchun tabiiy qog'oz teksturasi va oltin rangli minimalist chiziqlardan foydalandik. Sharqona choy simvollari zamonaviy geometrik shakllar ko'rinishida qayta chizildi. Loyiha mijoz tomonidan yuqori baholandi va sotuvlar 35% ga oshdi.",
      category: "Brending & Identika",
      tags: ["Logo", "Brending", "Qadoqlash", "Illustratsiya"],
      imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
      client: "Elixir Tea Co.",
      year: "2025",
      link: "https://behance.net",
      isFeatured: true
    },
    {
      id: "proj-2",
      title: "Urgut Milliy Restorani Vizual Tili",
      description: "O'zbek an'anaviy naqshlarini zamonaviy uslubda taqdim etuvchi restoran brendingi va menyu dizayni. Tarixiy madaniyatni yangi avlodga taqdim etish loyihasi.",
      content: "Urgut milliy restorani uchun naqshlar geometriyasini soddalashtirib, zamonaviy 'flat' uslubga o'tkazdik. To'q feruza va issiq oltin ranglar simbiozi restoranning oliyjanob muhitini yaratib berdi.",
      category: "Brending & Identika",
      tags: ["Vizual Identika", "Menyu Dizayn", "Logotip"],
      imageUrl: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&q=80&w=800",
      client: "Urgut Group LLC",
      year: "2024",
      link: "https://behance.net",
      isFeatured: true
    },
    {
      id: "proj-3",
      title: "Cosmos Kosmetika Qadog'i",
      description: "Organik terini parvarish qilish vositalari brendi uchun barqaror va ekologik toza shisha qutilari va qog'oz korobkalari dizayni. Kosmik tozalik tuyg'usi.",
      content: "Ushbu mahsulotlar uchun 100% qayta ishlanadigan shisha idishlar va kraft qog'oz ishlatildi. Tipografik minimalist dizayn asosan mahsulot tarkibi va uning foydalariga e'tibor qaratdi.",
      category: "Qadoqlash",
      tags: ["Qadoqlash dizayni", "3D Mockup", "Ekologik dizayn"],
      imageUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800",
      client: "Cosmos Organic",
      year: "2025",
      isFeatured: false
    },
    {
      id: "proj-4",
      title: "Modernizm & Shriflar Ko'rgazmasi Posterlari",
      description: "Toshkent zamonaviy san'at galereyasi uchun tipografik posterlar turkumi. Shriftlar plastikasi va vizual illuziyalardan foydalanib yasalgan afishalar.",
      content: "Shrift san'atiga bag'ishlangan ushbu loyihada an'anaviy harflar grafik arxitektura elementlariga aylantirildi. Qat'iy qora va oq kontrast hamda yorqin qizil urg'u dizaynga dahlizlilik hissini beradi.",
      category: "Plakatlar & Grafika",
      tags: ["Poster dizayni", "Tipografiya", "Badiiy San'at"],
      imageUrl: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=800",
      client: "ArtGallery Tashkent",
      year: "2024",
      link: "https://behance.net",
      isFeatured: false
    }
  ],
  skills: [
    { id: "s-1", name: "Adobe Illustrator", category: "tools", level: 95 },
    { id: "s-2", name: "Adobe Photoshop", category: "tools", level: 90 },
    { id: "s-3", name: "Adobe InDesign", category: "tools", level: 80 },
    { id: "s-4", name: "Figma (UI/UX & Identity)", category: "tools", level: 85 },
    { id: "s-5", name: "Logotip Yaratish", category: "graphics", level: 98 },
    { id: "s-6", name: "Brend Buk (Guideline)", category: "graphics", level: 92 },
    { id: "s-7", name: "Qadoqlash Konseptlari", category: "graphics", level: 88 },
    { id: "s-8", name: "Tipografiya", category: "concepts", level: 90 },
    { id: "s-9", name: "Rang Teoriyasi va Kompozitsiya", category: "concepts", level: 95 },
    { id: "s-10", name: "Mijozlar bilan ishlash va Breffing", category: "concepts", level: 90 }
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Etakchi Brand Dizayner",
      company: "Apex Creative Agency",
      duration: "2023 - Hozirgacha",
      description: "Yirik kompaniyalar uchun brending konsepsiyalarini ishlab chiqish, dizaynerlar komandasiga rahbarlik qilish va art-direktorlik. 40 dan ortiq muvaffaqiyatli brending loyihalari."
    },
    {
      id: "exp-2",
      role: "Grafik va Qadoqlash Dizayneri",
      company: "PrintArt Nashriyoti",
      duration: "2021 - 2023",
      description: "Oziq-ovqat va kosmetika brendlari uchun qadoqlash konstruksiyalari bilan ishlash. Poligrafiya jarayonlariga tayyorlov (Pre-press), rang mosligi va bosma materiallar bilan tajriba."
    },
    {
      id: "exp-3",
      role: "Frilanser / Grafik Dizayner",
      company: "Mustaqil Faoliyat",
      duration: "2020 - 2021",
      description: "Kichik va o'rta bizneslar uchun brending, ijtimoiy tarmoqlar vizual bezagi (SMM dizayn) va logotiplar yaratish xizmatlari."
    }
  ],
  testimonials: [
    {
      id: "test-1",
      author: "Dilshod Karimov",
      position: "Marketing Bo'limi Boshlig'i",
      company: "Elixir Premium",
      text: "Muhammadali bilan ishlash ajoyib tajriba bo'ldi. U choy qadoqlari uchun shunday ajoyib brending yaratdiki, mahsulotimiz javonlarda darhol ko'zga tashlandi va sotuvlarimiz keskin oshdi. Dizaynni his qilish qobiliyati juda yuqori!",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "test-2",
      author: "Shaxnoza Rahimova",
      position: "Asoschi & Kreativ Direktor",
      company: "Cosmos Organic",
      text: "Kosmetika liniyamiz qadoqlash dizayni uchun bergan g'oyalari ham arzon, ham ekologik toza ishlab chiqarish imkonini berdi. Tafsilotlarga juda e'tiborli va professional dizayner.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    }
  ],
  messages: [
    {
      id: "msg-123",
      name: "Akmal Fayzullayev",
      email: "akmal.f@test.com",
      subject: "Yangi Startap uchun Brending",
      message: "Salom Muhammadali, biz yangi milliy kiyimlar do'koni ochyapmiz, shunga brending, logotip va paketlar dizayni kerak edi. Shartlar va narxlaringizni bilsak bo'ladimi?",
      date: "2026-06-05",
      read: false
    }
  ],
  currentTheme: "natural-tones"
};
