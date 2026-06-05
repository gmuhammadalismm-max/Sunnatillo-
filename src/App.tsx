import React, { useState, useEffect, useRef } from 'react';
import { PortfolioData, Project, ThemePreset, ClientMessage } from './types';
import { defaultPortfolioData, themePresets } from './defaultData';
import { db, handleFirestoreError, OperationType } from './firebase';
import { doc, onSnapshot, setDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { getThemeClasses } from './utils';
import ProjectModal from './components/ProjectModal';
import EditDialogs from './components/EditDialogs';
import MessageInboxModal from './components/MessageInboxModal';
import {
  Settings,
  Mail,
  Globe,
  Phone,
  ExternalLink,
  Check,
  MapPin,
  Plus,
  Trash2,
  FolderGit2,
  Eye,
  EyeOff,
  User,
  Heart,
  Send,
  Sparkles,
  Github,
  Linkedin,
  Instagram,
  FileDown,
  Briefcase,
  Lock,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function BrandLabSandbox({ isDark, headingFont }: { isDark: boolean; headingFont: string }) {
  const [brandTitle, setBrandTitle] = useState('NEXUS');
  const [brandTypemark, setBrandTypemark] = useState('ECO'); // ECO, BOLD, TECH, NEO
  const [brandColor, setBrandColor] = useState('#827F6A'); // Default natural tone
  const [brandLayout, setBrandLayout] = useState('swiss'); // swiss, brutalist, minimal, kinetic

  const pairingColors = [
    { name: 'Oltin Zaytun (Natural)', hex: '#827F6A', bg: 'bg-[#827F6A]' },
    { name: 'Akva Feruza', hex: '#0ea5e9', bg: 'bg-sky-500' },
    { name: 'Brutalist Neon', hex: '#a3e635', bg: 'bg-lime-400' },
    { name: 'Toq Crimson', hex: '#9a3412', bg: 'bg-orange-850' },
    { name: 'Siyohrang Kosmik', hex: '#6366f1', bg: 'bg-indigo-500' }
  ];

  return (
    <section id="brand-sandbox" className={`p-6 md:p-8 rounded-3xl ${isDark ? 'bg-zinc-950/80 border-zinc-900' : 'bg-white border-[#DCD9D0]'} border text-left space-y-6 mt-12`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dashed pb-6 border-zinc-800/60">
        <div className="space-y-1">
          <span className={`text-[10px] font-mono tracking-widest uppercase py-0.5 px-2 rounded bg-zinc-800 text-zinc-300 font-bold border border-zinc-700/50`}>
            DIZAYN LABORATORIYASI (SANDBOX)
          </span>
          <h2 className={`text-2xl font-black tracking-tight ${headingFont} ${isDark ? 'text-white' : 'text-[#3C3A33]'}`}>
            Interaktiv Brend Konstruktori
          </h2>
          <p className="text-xs opacity-65">Men yaratadigan vizual muvozanat va tipografiya estetikasini bevosita sinab ko'ring:</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] opacity-50 font-mono">
          <span>Haqiqiy Vaqt Ssenariysi</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Editor parameters */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase opacity-75 block">Logotip Sarlavha Matni</label>
              <input
                type="text"
                maxLength={10}
                value={brandTitle}
                onChange={(e) => setBrandTitle(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-805 text-sm focus:outline-none focus:border-indigo-400 text-white font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase opacity-75 block">Brend Konsepti (Vibe)</label>
              <div className="grid grid-cols-4 gap-1.5">
                {['ECO', 'BOLD', 'TECH', 'NEO'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setBrandTypemark(type)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${brandTypemark === type ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-zinc-900/50 border-zinc-850 text-zinc-400 hover:bg-zinc-800'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase opacity-75 block">Urg'u rangi (Palitra)</label>
              <div className="flex flex-wrap gap-2">
                {pairingColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setBrandColor(color.hex)}
                    className={`w-6 h-6 rounded-full ${color.bg} border-2 transition-all cursor-pointer ${brandColor === color.hex ? 'border-white scale-110 ring-2 ring-indigo-550/50' : 'border-zinc-800/80 hover:scale-105'}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase opacity-75 block">Grafik maket uslubi</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'swiss', label: 'Shveytsariya Tizimi' },
                  { id: 'brutalist', label: 'Neo Brutalist' },
                  { id: 'minimal', label: 'Primitiv Minimal' },
                  { id: 'kinetic', label: 'Kinetik Optika' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setBrandLayout(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${brandLayout === item.id ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-850/55'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-zinc-800">
            <p className="text-[11px] opacity-65 italic leading-relaxed">
              💡 Ushbu interaktiv o'yin orqali rang kompozitsiyasi, mutanosib salmoq va geometrik ritmning qadoqlash hamda logotip dizaynidagi ahamiyatini guvohi bo'lasiz.
            </p>
          </div>
        </div>

        {/* Dynamic preview canvas */}
        <div className="lg:col-span-7 flex items-center justify-center p-4 rounded-2xl bg-zinc-950/90 border border-zinc-900 relative overflow-hidden min-h-[300px]">
          
          {/* Subtle background coordinates/axis lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-zinc-700" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-zinc-700" />
            <div className="absolute top-4 left-4 text-[9px] font-mono text-zinc-600 opacity-40">GRID: 10MM AXIS ACTIVE</div>
          </div>

          {/* Real time visual card */}
          <div className="relative w-full max-w-[340px] aspect-[3/4] bg-zinc-900 border border-zinc-850 rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-2xl transition-all">
            
            {/* Dynamic visual ornaments based on selected layout */}
            {brandLayout === 'swiss' && (
              <div className="absolute inset-0 p-5 pointer-events-none opacity-25 flex flex-col justify-between">
                <div className="w-full flex justify-between text-[9px] font-mono whitespace-nowrap overflow-hidden">
                  <span>SCALE: 1:1</span>
                  <span>TYPO: SWISS SANS</span>
                </div>
                <div className="w-full h-0.5" style={{ backgroundColor: brandColor }} />
              </div>
            )}

            {brandLayout === 'brutalist' && (
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] [background-position:center]" />
            )}

            {brandLayout === 'kinetic' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed rounded-full animate-spin-slow pointer-events-none opacity-20" style={{ borderColor: brandColor }} />
            )}

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">[ CONCEPT PREVIEW ]</span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColor }} />
            </div>

            {/* Middle decorative shapes */}
            <div className="relative z-10 my-auto flex items-center justify-center">
              {brandLayout === 'swiss' && (
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="aspect-square rounded-xl transition-all duration-300" style={{ backgroundColor: brandColor }} />
                  <div className="aspect-square bg-zinc-800 rounded-xl" />
                </div>
              )}

              {brandLayout === 'brutalist' && (
                <div className="border-[3px] p-6 w-full text-center font-black text-2xl uppercase tracking-tighter" style={{ borderColor: brandColor, color: brandColor }}>
                  {brandTitle || 'LOGOTIP'}
                </div>
              )}

              {brandLayout === 'minimal' && (
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ border: `2px solid ${brandColor}` }}>
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: brandColor }} />
                </div>
              )}

              {brandLayout === 'kinetic' && (
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 animate-pulse opacity-30" style={{ borderColor: brandColor }} />
                  <div className="absolute inset-4 rounded-full border-2 border-dashed" style={{ borderColor: brandColor }} />
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: brandColor }} />
                </div>
              )}
            </div>

            {/* Bottom typography and metrics */}
            <div className="relative z-10 flex items-end justify-between border-t border-zinc-800/80 pt-4">
              <div className="text-left space-y-0.5">
                <h1 className="text-xl font-black tracking-tighter leading-none font-display text-white truncate max-w-[200px]" style={{ color: brandColor }}>
                  {brandTitle || 'NEXUS'}
                </h1>
                <p className="text-[9px] font-mono uppercase opacity-55 tracking-wider">EST. 2026 / BRANDING BY {brandTypemark}</p>
              </div>
              <span className="text-base font-black opacity-30">01</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default function App() {
  // Load initial portfolio data from localStorage or fallback to template presets
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('muhammadali_graphic_portfolio');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.currentTheme === 'dark-nordic') {
          parsed.currentTheme = 'natural-tones';
        }
        return parsed;
      } catch (e) {
        console.error("Storage parse error, using default presets", e);
      }
    }
    return defaultPortfolioData;
  });

  const [realtimeMessages, setRealtimeMessages] = useState<ClientMessage[]>([]);

  // Load studio session status
  const [isStudioLoggedIn, setIsStudioLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('studio_logged_in') === 'true';
  });

  // Editor vs Preview States (defaults to false for visitors so they enjoy a pristine portfolio)
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    return localStorage.getItem('studio_logged_in') === 'true';
  }); 
  const [activeEditTab, setActiveEditTab] = useState<'profile' | 'projects' | 'skills' | 'experience' | 'testimonials' | 'backup'>('profile');
  const [isDialogsOpen, setIsDialogsOpen] = useState<boolean>(false);
  const [isInboxOpen, setIsInboxOpen] = useState<boolean>(false);

  // Studio Gate Pass Modal passcode properties
  const [isAdminGateOpen, setIsAdminGateOpen] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<boolean>(false);

  // Real-time synchronization of Portfolio Data from Firestore
  useEffect(() => {
    const docRef = doc(db, 'portfolio', 'shared');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const remoteData = snapshot.data() as PortfolioData;
        setData(remoteData);
      } else {
        // First boot: seed DB with fallback presets
        setDoc(docRef, defaultPortfolioData).catch((err) => {
          console.error("Firestore database seed error:", err);
        });
      }
    }, (error) => {
      console.error("Firestore loading error:", error);
    });
    return () => unsubscribe();
  }, []);

  // Real-time synchronization of submitted messages
  useEffect(() => {
    const q = collection(db, 'messages');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ClientMessage[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        msgs.push({
          id: docSnap.id,
          name: d.name || '',
          email: d.email || '',
          subject: d.subject || '',
          message: d.message || '',
          date: d.date || '',
          read: d.read || false
        });
      });
      // Sort messages from newest to oldest by sorting lexicographically by doc id (contains timestamp)
      msgs.sort((a, b) => b.id.localeCompare(a.id));
      setRealtimeMessages(msgs);
    }, (error) => {
      console.error("Firestore messages loading error:", error);
    });
    return () => unsubscribe();
  }, []);

  // Synchronize edit mode when studio logged out
  useEffect(() => {
    if (!isStudioLoggedIn) {
      setIsEditMode(false);
    }
  }, [isStudioLoggedIn]);

  // Viewer states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>("Barchasi");

  // Lead submissions (Contact brief creator Form)
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientSubject, setClientSubject] = useState('Brending loyihasi');
  const [clientMsg, setClientMsg] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Sync state back to local cache safely (as a fast-paint copy)
  useEffect(() => {
    try {
      localStorage.setItem('muhammadali_graphic_portfolio', JSON.stringify(data));
    } catch (e) {
      console.warn("Local storage update warning:", e);
    }
  }, [data]);

  // Helper function to update state and push real-time changes to Firestore
  const handlePortfolioDataUpdate = async (updatedData: PortfolioData) => {
    setData(updatedData);
    try {
      await setDoc(doc(db, 'portfolio', 'shared'), updatedData);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'portfolio/shared');
    }
  };

  // Set selected theme attributes
  const currentThemePreset = themePresets.find(t => t.id === data.currentTheme) || themePresets[0];
  const style = getThemeClasses(currentThemePreset);

  const isDark = currentThemePreset.id === 'dark-nordic' || currentThemePreset.id === 'cyber-brutalist';
  const headingFont = currentThemePreset.id === 'natural-tones' ? 'font-serif' : 'font-display';
  const accentBgClass = currentThemePreset.accent.split(' ')[0];
  const textAccentClass = currentThemePreset.id === 'natural-tones' ? 'text-[#827F6A]' : 
                          currentThemePreset.id === 'cyber-brutalist' ? 'text-lime-400' :
                          currentThemePreset.id === 'warm-editorial' ? 'text-orange-850' : 'text-indigo-400';

  // Dynamic portfolio stats (project category distribution for the SVG showcase)
  const categoryCounts = data.projects.reduce((acc: { [key: string]: number }, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + 1;
    return acc;
  }, {});

  const totalProjCount = data.projects.length;

  // Contact form submission directly to Firestore messages collection (leaving portfolio settings untouched!)
  const handleSubmitBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientMsg) {
      alert("Iltimos barcha bo'shliqlarni to'ldiring!");
      return;
    }

    const messageId = `msg-${Date.now()}`;
    const newIncomingMsg = {
      name: clientName,
      email: clientEmail,
      subject: clientSubject,
      message: clientMsg,
      date: new Date().toISOString().split('T')[0],
      read: false,
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'messages', messageId), newIncomingMsg);

      // Reset fields
      setClientName('');
      setClientEmail('');
      setClientMsg('');

      // Trigger visual toast
      setFeedbackToast("Ajoyib! Loyiha taklifingiz bulutli ma'lumotlar bazasida (Firestore) xavfsiz saqlandi va dizaynerga yuborildi!");
      setTimeout(() => {
        setFeedbackToast(null);
      }, 7000);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `messages/${messageId}`);
    }
  };

  // Inbox operations on real-time sub-documents in Firestore messages collection
  const handleMarkMessageRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'messages', id), { read: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `messages/${id}`);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `messages/${id}`);
    }
  };

  // Theme presets click
  const handleThemeChange = (themeId: string) => {
    handlePortfolioDataUpdate({
      ...data,
      currentTheme: themeId
    });
  };

  // Reset helper
  const handleResetToDefaults = () => {
    if (confirm("Portfolio aslidagiga qaytarilsinmi?")) {
      handlePortfolioDataUpdate(defaultPortfolioData);
    }
  };

  // Passcode submission handler
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPasscode = data.adminPasscode || 'admin';
    if (passcode === currentPasscode) {
      setIsStudioLoggedIn(true);
      setIsEditMode(true);
      localStorage.setItem('studio_logged_in', 'true');
      setIsAdminGateOpen(false);
      setPasscode('');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  // Set editing shortcuts directly from sections
  const openEditorAtTab = (tab: typeof activeEditTab) => {
    setActiveEditTab(tab);
    setIsDialogsOpen(true);
  };

  // Filter unique categories for view selectors
  const uniqueCategories = ["Barchasi", ...Array.from(new Set(data.projects.map(p => p.category)))];

  // Unread messages counts (loaded live from Firestore!)
  const unreadCount = realtimeMessages.filter(m => !m.read).length;

  return (
    <div className={`min-h-screen ${style.bg} ${style.text} font-sans transition-colors duration-300 relative pb-20`}>
      
      {/* 2. TOP MANAGEMENT ADMIN CONTROLS HEADER (VISIBLE ONLY FOR LOGGED IN ADMINS IN EDIT MODE) */}
      {isStudioLoggedIn && isEditMode && (
        <nav id="admin-sticky-header" className="sticky top-0 z-40 bg-zinc-950/90 text-white border-b border-zinc-900 backdrop-blur-md px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold font-display text-white">
                🎨
              </div>
              <div>
                <h1 className="text-sm font-bold font-sans tracking-tight text-white">Studio Boshqaruv</h1>
                <p className="text-[10px] text-zinc-400">Muhammadali G'ofurov • Boshqaruv Seansi Faol</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Theme picker bubble */}
              <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                {themePresets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    title={t.name}
                    className={`w-5 h-5 rounded-full border transition-all ${data.currentTheme === t.id ? 'border-white scale-110 ring-2 ring-indigo-500/40' : 'border-zinc-800 hover:scale-105'}`}
                    style={{
                      backgroundColor: t.id === 'natural-tones' ? '#F9F7F2' :
                                      t.id === 'dark-nordic' ? '#18181b' :
                                      t.id === 'cyber-brutalist' ? '#000000' :
                                      t.id === 'light-minimal' ? '#f4f4f5' : '#faf6ee'
                    }}
                  />
                ))}
              </div>

              {/* Mode switch button */}
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${isEditMode ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                id="mode-toggle-btn"
              >
                {isEditMode ? (
                  <>
                    <EyeOff size={14} />
                    TAHRIR REJIMI 🛠️
                  </>
                ) : (
                  <>
                    <Eye size={14} />
                    MIJOZ KO'RISHI 👀
                  </>
                )}
              </button>

              {/* Lead inbox tracker */}
              <button
                onClick={() => setIsInboxOpen(true)}
                className="relative p-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all text-zinc-300 hover:text-white cursor-pointer"
                id="inbox-tracker-btn"
                title="Kelgan loyiha so'rovlari"
              >
                <Mail size={16} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-[9px] text-white font-bold flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Change Passcode & Backup quick link */}
              <button
                onClick={() => {
                  setActiveEditTab('backup');
                  setIsDialogsOpen(true);
                }}
                className="p-1.5 bg-zinc-900 border border-zinc-800 text-amber-400 hover:text-amber-300 hover:border-zinc-700 hover:bg-zinc-800 rounded-xl transition-all cursor-pointer"
                title="Parolni o'zgartirish & Zaxira sozlamalari"
              >
                <Key size={16} />
              </button>

              {/* General quick config panel */}
              <button
                onClick={() => {
                  setActiveEditTab('profile');
                  setIsDialogsOpen(true);
                }}
                className="p-1.5 bg-indigo-500 text-white hover:bg-indigo-600 rounded-xl transition-all shadow-md cursor-pointer"
                title="Asosiy sozlash paneli"
              >
                <Settings size={16} />
              </button>
            </div>

          </div>
        </nav>
      )}

      {/* 2.5 VECTOR BLUEPRINT ORNAMENT BACKGROUND FOR GRAPHIC DESIGN VIBES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05] select-none z-0 bg-grid-blueprint">
        <div className="absolute top-[500px] left-10 w-96 h-96 border-2 border-dashed border-zinc-500 rounded-full animate-spin-slow" />
        <div className="absolute top-[1200px] right-20 w-80 h-80 border-2 border-zinc-500 rounded-xl animate-float-slow" style={{ transform: 'rotate(45deg)' }} />
        <div className="absolute top-[2200px] left-[15%] w-96 h-96 border-2 border-dashed border-zinc-500 rounded-full animate-spin-slow" />
        <div className="absolute top-[3200px] right-[10%] w-72 h-72 border border-dashed border-zinc-500 rounded-full animate-float-slow" />
      </div>

      {/* Hero Banner Area */}
      <header className="relative w-full h-[300px] md:h-[420px] bg-zinc-900 overflow-hidden shrink-0">
        <img
          src={data.profile.bannerUrl || undefined}
          alt=""
          className="w-full h-full object-cover opacity-60 filter grayscale-20 object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" style={{
          background: `linear-gradient(to top, ${currentThemePreset.id === 'light-minimal' ? '#fafafa' : currentThemePreset.id === 'warm-editorial' ? '#faf6ee' : currentThemePreset.id === 'natural-tones' ? '#F9F7F2' : '#09090b'} 10%, rgba(0,0,0,0.5) 70%, transparent 100%)`
        }} />
        
        {/* Absolute Profile details card */}
        <div className="absolute bottom-6 left-4 right-4 max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <img
              src={data.profile.avatarUrl || undefined}
              alt={data.profile.name}
              className={`w-24 h-24 md:w-36 md:h-36 rounded-2xl object-cover border-4 ${isDark ? 'border-zinc-950' : 'border-[#F9F7F2]'} shadow-xl bg-zinc-800`}
              referrerPolicy="no-referrer"
            />
            {isEditMode && (
              <button
                onClick={() => openEditorAtTab('profile')}
                className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                title="Rasm o'zgartirish"
              >
                <Settings size={20} className="animate-spin-slow" />
              </button>
            )}
          </div>

          <div className="flex-1 space-y-2 mb-2 text-left">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-md ${isDark ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-[#827F6A]/20 text-[#827F6A] border-[#827F6A]/30'} border`}>
                PRO PORTFOLIO
              </span>
              {isEditMode && (
                <button
                  onClick={() => openEditorAtTab('profile')}
                  className={`p-1 rounded text-xs select-none ${isDark ? 'bg-zinc-900/60 text-indigo-400 hover:text-indigo-300' : 'bg-[#EAE7DD] text-[#3C3A33] hover:bg-[#D4D1C3]'} font-semibold`}
                  title="Ism va bio o'zgartirish"
                >
                  Edit
                </button>
              )}
            </div>
            
            <h1 className={`text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm ${headingFont}`}>
              {data.profile.name}
            </h1>
            <p className="text-md md:text-xl font-medium text-zinc-200 drop-shadow-sm max-w-2xl">
              {data.profile.title}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 pt-1">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-red-400" />
                {data.profile.location}
              </span>
              <span className="opacity-40">•</span>
              <span className="flex items-center gap-1">
                <Mail size={13} className="text-indigo-400" />
                {data.profile.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        
        {/* FEEDBACK TOAST FROM BRIEF YUBORILGANDA */}
        <AnimatePresence>
          {feedbackToast && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`p-4 rounded-xl ${isDark ? 'bg-indigo-900 text-white border-indigo-500/40' : 'bg-[#827F6A] text-[#F9F7F2] border-[#827F6A]/40'} border shadow-xl flex items-start gap-3 relative overflow-hidden`}
            >
              <div className={`p-2 ${isDark ? 'bg-indigo-500 text-white' : 'bg-[#EAE7DD] text-[#3C3A33]'} rounded-lg shrink-0`}>
                <Check size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold">Muvaffaqiyatli Yuborildi!</h4>
                <p className="text-xs opacity-90 mt-1">{feedbackToast}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-white animate-shrink" style={{ width: '100%' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION: BIO EXPLANATION */}
        <section id="biography" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <h2 className={`text-xl md:text-2xl font-bold ${headingFont}`}>Ijodiy falsafa</h2>
              {isEditMode && (
                <button
                  onClick={() => openEditorAtTab('profile')}
                  className={`p-1 px-2 rounded text-xs ${isDark ? 'bg-zinc-900 text-indigo-400 hover:bg-zinc-800' : 'bg-[#EAE7DD] hover:bg-[#D4D1C3] text-[#3C3A33]'}`}
                >
                  Bio tahriri
                </button>
              )}
            </div>
            
            <p className="text-sm md:text-base leading-relaxed opacity-85 font-sans whitespace-pre-wrap">
              {data.profile.bio}
            </p>

            {/* Social media handles list */}
            <div className="pt-3">
              <span className="text-xs font-mono opacity-50 block mb-2">Ijtimoiy media va aloqa tarmoqlari:</span>
              <div className="flex flex-wrap gap-2">
                {data.profile.socials.telegram && (
                  <a
                    href={data.profile.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${isDark ? 'bg-zinc-900 text-zinc-300 hover:text-white border-zinc-800 hover:border-zinc-700' : 'bg-white text-[#3C3A33] border-[#DCD9D0] hover:bg-[#FAF6EE]'} text-xs font-medium border transition-all`}
                  >
                    <span>Telegram</span>
                    <ExternalLink size={10} />
                  </a>
                )}
                {data.profile.socials.instagram && (
                  <a
                    href={data.profile.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${isDark ? 'bg-zinc-900 text-zinc-300 hover:text-white border-zinc-800 hover:border-zinc-700' : 'bg-white text-[#3C3A33] border-[#DCD9D0] hover:bg-[#FAF6EE]'} text-xs font-medium border transition-all`}
                  >
                    <span>Instagram</span>
                    <ExternalLink size={10} />
                  </a>
                )}
                {data.profile.socials.behance && (
                  <a
                    href={data.profile.socials.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${isDark ? 'bg-zinc-900 text-zinc-300 hover:text-white border-zinc-800 hover:border-zinc-700' : 'bg-white text-[#3C3A33] border-[#DCD9D0] hover:bg-[#FAF6EE]'} text-xs font-medium border transition-all`}
                  >
                    <span>Behance</span>
                    <ExternalLink size={10} />
                  </a>
                )}
                {data.profile.socials.dribbble && (
                  <a
                    href={data.profile.socials.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${isDark ? 'bg-zinc-900 text-zinc-300 hover:text-white border-zinc-800 hover:border-zinc-700' : 'bg-white text-[#3C3A33] border-[#DCD9D0] hover:bg-[#FAF6EE]'} text-xs font-medium border transition-all`}
                  >
                    <span>Dribbble</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Designer project distribution analytics using inline SVG chart */}
          <div className={`p-6 rounded-2xl ${style.cardBg} border space-y-4`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-xs font-mono uppercase font-black ${isDark ? 'text-indigo-400' : 'text-[#827F6A]'}`}>Ishlar taqsimoti</h3>
              <FolderGit2 size={16} className="text-zinc-500" />
            </div>
            
            <p className="text-xs opacity-75 leading-relaxed">Kiritilgan loyihalaringizning kategorial taqsimoti (avtomatik yangilanadi):</p>

            <div className="h-28 flex items-center justify-center">
              {totalProjCount === 0 ? (
                <span className="text-xs opacity-40">Loyiha mavjud emas</span>
              ) : (
                <div className="w-full space-y-2.5">
                  {Object.entries(categoryCounts).map(([cat, count]) => {
                    const percentage = Math.round(((count as number) / totalProjCount) * 100);
                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-semibold">{cat}</span>
                          <span className="font-mono opacity-60">{(count as number)} ta ({percentage}%)</span>
                        </div>
                        <div className={`w-full h-1.5 ${isDark ? 'bg-zinc-900/80' : 'bg-zinc-200'} rounded-full overflow-hidden`}>
                          <div className={`h-full ${accentBgClass} rounded-full`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className={`pt-3 border-t border-dashed ${isDark ? 'border-zinc-800/80' : 'border-[#DCD9D0]'} grid grid-cols-2 text-center`}>
              <div>
                <span className={`text-xl font-bold ${headingFont} ${isDark ? 'text-white' : 'text-[#3C3A33]'}`}>{data.projects.length} ta</span>
                <span className="block text-[10px] opacity-50 uppercase font-mono">Loyihalar</span>
              </div>
              <div className={`border-l ${isDark ? 'border-zinc-800' : 'border-[#DCD9D0]'}`}>
                <span className={`text-xl font-bold ${headingFont} ${isDark ? 'text-white' : 'text-[#3C3A33]'}`}>{data.skills.length} ta</span>
                <span className="block text-[10px] opacity-50 uppercase font-mono">Ko'nikmalar</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: PROJECTS GRID GALLERY */}
        <section id="portfolio-works" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <h2 className={`text-2xl md:text-3xl ${headingFont} font-black tracking-tight ${isDark ? 'text-white' : 'text-[#3C3A33]'}`}>Ijodiy loyihalar galereyasi</h2>
                {isEditMode && (
                  <button
                    onClick={() => openEditorAtTab('projects')}
                    className={`p-1 px-2 rounded text-xs ${isDark ? 'bg-zinc-900 text-indigo-400 hover:bg-zinc-850' : 'bg-[#EAE7DD] hover:bg-[#D4D1C3] text-[#3C3A33]'}`}
                  >
                    Boshqarish
                  </button>
                )}
              </div>
              <p className="text-xs md:text-sm opacity-65">Buyurtmachilar uchun ishlab chiqilgan brending, qadoq va boshqa dizayn ishlari</p>
            </div>

            {/* Main category filtering tabs */}
            <div className={`flex flex-wrap gap-1 ${isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-[#DCD9D0]'} p-1 rounded-xl border`}>
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs leading-none font-medium transition-all cursor-pointer ${filterCategory === cat ? `${accentBgClass} ${currentThemePreset.id === 'natural-tones' ? 'text-[#F9F7F2]' : 'text-white'} shadow-sm` : `${isDark ? 'text-zinc-400 hover:text-white' : 'text-[#6B685E] hover:text-[#3C3A33]'}`}`}
                >
                  {cat === "Barchasi" ? "Barchasi" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project card list */}
          {data.projects.length === 0 ? (
            <div className={`text-center py-16 border rounded-2xl border-dashed ${isDark ? 'border-zinc-800' : 'border-[#DCD9D0]'} p-8 space-y-3`}>
              <p className="text-sm opacity-60">Hozircha hech qanday loyiha yozilmagan.</p>
              <button
                onClick={() => openEditorAtTab('projects')}
                className={`px-4 py-2 ${currentThemePreset.accent} rounded-xl text-xs font-semibold cursor-pointer`}
              >
                Birinchi loyihani yozish (Qo'shish)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects
                .filter(p => filterCategory === "Barchasi" || p.category === filterCategory)
                .map((proj) => (
                  <motion.div
                    key={proj.id}
                    layoutId={proj.id}
                    onClick={() => {
                      setSelectedProject(proj);
                      setIsProjectModalOpen(true);
                    }}
                    className={`group relative overflow-hidden rounded-2xl ${style.cardBg} border cursor-pointer hover:border-[#827F6A]/50 hover:shadow-lg transition-all flex flex-col`}
                  >
                    {/* Cover graphic file */}
                    <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
                      <img
                        src={proj.imageUrl || undefined}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-xs text-white font-mono flex items-center gap-1.5">
                          Tafsilotlarni ko'rish
                          <ExternalLink size={12} />
                        </span>
                      </div>
                    </div>

                    {/* Card Content body */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-left">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono tracking-wider uppercase opacity-60">
                            {proj.category}
                          </span>
                          <span className="text-xs opacity-50">{proj.year}</span>
                        </div>
                        <h3 className={`text-md font-sans font-bold ${isDark ? 'text-white' : 'text-[#3C3A33]'} group-hover:${textAccentClass} transition-colors`}>
                          {proj.title}
                        </h3>
                        <p className="text-xs opacity-75 line-clamp-2">
                          {proj.description}
                        </p>
                      </div>

                      {/* Display small tags */}
                      <div className="flex flex-wrap gap-1 mt-4">
                        {proj.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 text-[9px] rounded-md ${isDark ? 'bg-zinc-950 text-zinc-400 border-zinc-900' : 'bg-white text-[#6B685E] border-[#DCD9D0]'} border`}
                          >
                            {tag}
                          </span>
                        ))}
                        {proj.tags.length > 3 && (
                          <span className={`px-2 py-0.5 text-[9px] rounded-md ${isDark ? 'bg-zinc-950 text-zinc-500 border-zinc-900' : 'bg-white text-[#6B685E] border-[#DCD9D0]'} border`}>
                            +{proj.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Inline Delete option when in Editor mode */}
                    {isEditMode && (
                      <div className="absolute top-3 right-3 flex gap-1 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(proj);
                            openEditorAtTab('projects');
                          }}
                          className={`p-1 px-2 text-[10px] rounded ${isDark ? 'bg-zinc-950/80 hover:bg-zinc-900 border-zinc-800 text-indigo-400' : 'bg-white hover:bg-[#FAF6EE] border-[#DCD9D0] text-[#3C3A33]'} border font-semibold cursor-pointer`}
                        >
                          Tahrirlash
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Loyihani o'chirasizmi?")) {
                              const updated = {
                                ...data,
                                projects: data.projects.filter(p => p.id !== proj.id)
                              };
                              handlePortfolioDataUpdate(updated);
                            }
                          }}
                          className="p-1 rounded bg-red-950/80 hover:bg-red-900 border border-red-900/30 text-red-400 cursor-pointer"
                          title="Loyihani o'chirish"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>
          )}
        </section>

        {/* SECTION: SKILLS & RATINGS GRID */}
        <section id="developer-skills" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1 text-left">
              <h2 className={`text-xl md:text-2xl font-bold ${headingFont}`}>Ko'nikmalar va Grafik Asboblar</h2>
              <p className="text-xs md:text-sm opacity-65">Loyihalarda qo'llaniladigan Adobe dasturlari va metodologiya ko'rsatkichlari</p>
            </div>
            {isEditMode && (
              <button
                onClick={() => openEditorAtTab('skills')}
                className={`px-3 py-1.5 rounded-xl ${isDark ? 'bg-zinc-900 hover:bg-zinc-850 border-zinc-800 text-indigo-400' : 'bg-[#EAE7DD] hover:bg-[#D4D1C3] text-[#3C3A33] border-[#DCD9D0]'} border text-xs font-semibold cursor-pointer`}
              >
                + Ko'nikmalarni Sozlash
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Category: Software Tools */}
            <div className={`p-5 rounded-2xl ${style.cardBg} border space-y-4 text-left`}>
              <h3 className={`text-xs font-mono tracking-wider uppercase font-black ${isDark ? 'text-indigo-400 border-zinc-800/60' : 'text-[#827F6A] border-[#DCD9D0]'} border-b pb-2 flex items-center gap-2`}>
                <span className={`p-1 rounded ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-[#827F6A]/10 text-[#827F6A]'}`}>💻</span>
                Dasturlar va Asboblar (Tools)
              </h3>
              <div className="space-y-3">
                {data.skills.filter(s => s.category === 'tools').map(skill => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#3C3A33]'}`}{...{}}>{skill.name}</span>
                      <span className="text-[10px] font-mono opacity-50">{skill.level}%</span>
                    </div>
                    <div className={`w-full h-1 ${isDark ? 'bg-zinc-950' : 'bg-zinc-200'} rounded-full overflow-hidden`}>
                      <div className={`h-full ${accentBgClass} rounded-full`} style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Specialties */}
            <div className={`p-5 rounded-2xl ${style.cardBg} border space-y-4 text-left`}>
              <h3 className={`text-xs font-mono tracking-wider uppercase font-black ${isDark ? 'text-indigo-400 border-zinc-800/60' : 'text-[#827F6A] border-[#DCD9D0]'} border-b pb-2 flex items-center gap-2`}>
                <span className={`p-1 rounded ${isDark ? 'bg-rose-500/10 text-rose-400' : 'bg-[#827F6A]/10 text-[#827F6A]'}`}>✨</span>
                Yo'nalishlar (Specialties)
              </h3>
              <div className="space-y-3">
                {data.skills.filter(s => s.category === 'graphics').map(skill => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#3C3A33]'}`}>{skill.name}</span>
                      <span className="text-[10px] font-mono opacity-50">{skill.level}%</span>
                    </div>
                    <div className={`w-full h-1 ${isDark ? 'bg-zinc-950' : 'bg-zinc-200'} rounded-full overflow-hidden`}>
                      <div className={`h-full ${accentBgClass} rounded-full`} style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Creative Process */}
            <div className={`p-5 rounded-2xl ${style.cardBg} border space-y-4 text-left`}>
              <h3 className={`text-xs font-mono tracking-wider uppercase font-black ${isDark ? 'text-indigo-400 border-zinc-800/60' : 'text-[#827F6A] border-[#DCD9D0]'} border-b pb-2 flex items-center gap-2`}>
                <span className={`p-1 rounded ${isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-[#827F6A]/10 text-[#827F6A]'}`}>🧠</span>
                Uslublar & Konseptlar
              </h3>
              <div className="space-y-3">
                {data.skills.filter(s => s.category === 'concepts').map(skill => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#3C3A33]'}`}>{skill.name}</span>
                      <span className="text-[10px] font-mono opacity-50">{skill.level}%</span>
                    </div>
                    <div className={`w-full h-1 ${isDark ? 'bg-zinc-950' : 'bg-zinc-200'} rounded-full overflow-hidden`}>
                      <div className={`h-full ${accentBgClass} rounded-full`} style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: EXPERIENCE TIMELINE & TESTIMONIALS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          
          {/* Experience Timeline */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl md:text-2xl font-bold ${headingFont}`}>Mehnat faoliyati va Tajriba</h2>
              {isEditMode && (
                <button
                  onClick={() => openEditorAtTab('experience')}
                  className={`p-1 px-2 rounded text-xs ${isDark ? 'bg-zinc-900 text-indigo-400 hover:bg-zinc-850' : 'bg-[#EAE7DD] hover:bg-[#D4D1C3] text-[#3C3A33]'}`}
                >
                  Tahrirlash
                </button>
              )}
            </div>

            <div className={`relative border-l ${isDark ? 'border-zinc-800' : 'border-[#DCD9D0]'} pl-6 ml-3 space-y-8`}>
              {data.experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline point */}
                  <div className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full ${accentBgClass} group-hover:scale-125 transition-transform`} />
                  
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className={`text-md font-bold ${isDark ? 'text-white' : 'text-[#3C3A33]'} leading-tight`}>
                        {exp.role}
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md ${isDark ? 'bg-zinc-900 border-zinc-850 text-[#FAF6EE]/80' : 'bg-[#EAE7DD] border-[#DCD9D0] text-[#3C3A33]'} border font-mono opacity-70 w-fit`}>
                        {exp.duration}
                      </span>
                    </div>

                    <h4 className={`text-xs font-semibold ${textAccentClass}`}>
                      {exp.company}
                    </h4>

                    <p className="text-xs opacity-75 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials customer cards */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl md:text-2xl font-bold ${headingFont}`}>Mijozlardan fikrlar (Tavsiyalar)</h2>
              {isEditMode && (
                <button
                  onClick={() => openEditorAtTab('testimonials')}
                  className={`p-1 px-2 rounded text-xs ${isDark ? 'bg-zinc-900 text-indigo-400 hover:bg-zinc-850' : 'bg-[#EAE7DD] hover:bg-[#D4D1C3] text-[#3C3A33]'}`}
                >
                  Boshqarish
                </button>
              )}
            </div>

            <div className="space-y-4">
              {data.testimonials.map((testim) => (
                <div
                  key={testim.id}
                  className={`p-4 rounded-xl ${style.cardBg} border space-y-3 relative`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed italic opacity-85">
                    "{testim.text}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <img
                      src={testim.avatarUrl || undefined}
                      alt={testim.author}
                      className={`w-10 h-10 rounded-full object-cover border ${isDark ? 'border-zinc-800 bg-zinc-850' : 'border-[#DCD9D0] bg-[#EAE7DD]'}`}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-[#3C3A33]'}`}>
                        {testim.author}
                      </h4>
                      <span className="text-[10px] opacity-50 block">
                        {testim.position} • {testim.company}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* INTERACTIVE BRAND LAB SANDBOX - CREATIVE EXPERIMENT PANEL */}
        <BrandLabSandbox isDark={isDark} headingFont={headingFont} />

        {/* SECTION: INTERACTIVE BRIEF WRITER (CONTACT CLIENT PORTAL) */}
        <section id="client-briefcase" className={`p-6 md:p-8 rounded-3xl ${isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-[#DCD9D0]'} max-w-4xl mx-auto space-y-6 text-left shadow-sm`}>
          <div className="space-y-1 text-center">
            <span className={`px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded ${isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25' : 'bg-[#827F6A]/10 text-[#827F6A] border-[#827F6A]/25'} border`}>
              HAMKORLIK PORTALI
            </span>
            <h2 className={`text-xl md:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#3C3A33]'} ${headingFont}`}>
              Loyihani muhokama qilamiz!
            </h2>
            <p className="text-xs md:text-sm opacity-65 max-w-lg mx-auto">
              Hamkorlik qilish, logotip yoki brendingiz dizaynini buyurtma qilish uchun quyidagi shaklni to'ldiring. Yozgan xabaringiz to'g'ridan-to'g'ri dizaynerning tepadagi tahrirlash paneliga keladi.
            </p>
          </div>

          <form onSubmit={handleSubmitBrief} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono opacity-65">Ism-sharifingiz</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl ${isDark ? 'bg-zinc-900 border-zinc-800/80 text-white focus:border-indigo-500' : 'bg-[#FAF6EE] border-[#DCD9D0] text-[#3C3A33] focus:border-[#827F6A]'} text-sm font-medium focus:outline-none transition-colors`}
                  placeholder="Masalan: Aziz Rahimov"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono opacity-65">Elektron pochta manzili</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl ${isDark ? 'bg-zinc-900 border-zinc-800/80 text-white focus:border-indigo-500' : 'bg-[#FAF6EE] border-[#DCD9D0] text-[#3C3A33] focus:border-[#827F6A]'} text-sm font-medium focus:outline-none transition-colors`}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono opacity-65">Loyiha turi / Yo'nalish</label>
              <select
                value={clientSubject}
                onChange={(e) => setClientSubject(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl ${isDark ? 'bg-zinc-900 border-zinc-800/80 text-zinc-300 focus:border-indigo-500' : 'bg-[#FAF6EE] border-[#DCD9D0] text-[#3C3A33] focus:border-[#827F6A]'} text-sm font-medium focus:outline-none transition-colors`}
              >
                <option value="Brending loyihasi">Brending & Identika loyihasi</option>
                <option value="Sifatli logotip yaratish">Logotip dizayni</option>
                <option value="Eksklyuziv Qadoqlash dizayni">Eksklyuziv Qadoqlash</option>
                <option value="Ijtimoiy Tarmoqlar SMM vizuallari">SMM post dizaynlari</option>
                <option value="Afisha yoki Poster dizayni">Poster & Plakat dizayni</option>
                <option value="Boshqa hamkorlik buyurtmasi">Boshqa ijodiy taklif</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono opacity-65">Tavsif va Ijodiy breffing g'oyasi</label>
              <textarea
                rows={4}
                required
                value={clientMsg}
                onChange={(e) => setClientMsg(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl ${isDark ? 'bg-zinc-900 border-zinc-800/80 text-white focus:border-indigo-500' : 'bg-[#FAF6EE] border-[#DCD9D0] text-[#3C3A33] focus:border-[#827F6A]'} text-sm font-medium focus:outline-none resize-none transition-colors`}
                placeholder="Loyiha maqsadi, qanday elementlar ishtirok etishi kerak, kutilayotgan natijalar haqida batafsil yozing..."
              />
            </div>

            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 py-3 ${accentBgClass} ${currentThemePreset.id === 'natural-tones' ? 'text-[#F9F7F2]' : 'text-white'} font-bold rounded-xl transition-all shadow-md mt-2 cursor-pointer`}
              id="submit-brief-btn"
            >
              <Send size={15} />
              Loyiha Bo'yicha Murojaat Yuborish (Yuborish)
            </button>
          </form>
        </section>

      </main>

      {/* FOOTER */}
      <footer className={`w-full py-8 border-t ${isDark ? 'border-zinc-900 bg-zinc-950 text-zinc-400' : 'border-[#DCD9D0] bg-[#FAF6EE] text-[#6B685E]'} text-center space-y-4`}>
        <p className="text-xs opacity-80 max-w-sm mx-auto font-sans">
          &copy; 2026 {data.profile.name}. Barcha huquqlar himoyalangan. Kreativ grafik dizayn xizmatlari.
        </p>
        <div className="flex justify-center items-center gap-1 text-[11px] opacity-60">
          <span>Yaratilgan va Tahrirlangan</span>
          <Heart size={10} className="text-red-500 animate-pulse fill-red-500" />
          <span>Foydalanuvchi tomonidan hisoblangan</span>
        </div>
        
        {/* Secret trigger at the very bottom */}
        <button
          onClick={() => setIsAdminGateOpen(true)}
          className="text-[10px] tracking-widest font-mono text-zinc-500 hover:text-white uppercase transition-all select-none cursor-pointer flex items-center justify-center gap-1.5 mx-auto mt-2 py-1 px-3 border border-zinc-900/50 hover:border-zinc-800 rounded-full bg-zinc-950/25"
        >
          <Lock size={10} />
          <span>Studio Access</span>
        </button>
      </footer>

      {/* FLOATING STUDIO DOCK FOR LOGGED-IN ADMINS */}
      {isStudioLoggedIn && (
        <div className="fixed bottom-6 left-6 z-40 bg-zinc-950/90 backdrop-blur-md text-white border border-zinc-800/80 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl justify-between min-w-[280px]">
          <div className="flex items-center gap-2 border-r border-zinc-800 pr-3 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest font-bold text-emerald-400">STUDIO ACTIVE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openEditorAtTab('profile')}
              className="p-1 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer transition-colors"
              title="Studio Boshqaruv Panelini ochish"
            >
              Panel
            </button>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`p-1 px-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${isEditMode ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
              title="Inline tahrirlash elementlarini yoqish/o'chirish"
            >
              {isEditMode ? 'Prevyu' : 'Edit'}
            </button>
            <button
              onClick={() => {
                setIsStudioLoggedIn(false);
                setIsEditMode(false);
                localStorage.setItem('studio_logged_in', 'false');
              }}
              className="p-1 px-2 rounded-lg bg-red-950/30 hover:bg-red-950 text-red-400 text-xs font-mono font-bold cursor-pointer transition-colors"
              title="Tizimdan chiqish"
            >
              Chiqish
            </button>
          </div>
        </div>
      )}

      {/* POPUP MODALS & EDITORS */}
      <ProjectModal
        project={selectedProject}
        allProjects={data.projects}
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setSelectedProject(null);
        }}
        onSelectProject={(proj) => {
          setSelectedProject(proj);
        }}
        theme={currentThemePreset}
      />

      {/* Editor Drawer panel */}
      <EditDialogs
        data={data}
        onChange={handlePortfolioDataUpdate}
        onReset={handleResetToDefaults}
        activeTab={activeEditTab}
        isOpen={isDialogsOpen}
        onClose={() => setIsDialogsOpen(false)}
        theme={currentThemePreset}
        onTabChange={setActiveEditTab}
      />

      {/* Client Messages Inbox popup */}
      <MessageInboxModal
        messages={realtimeMessages}
        onMarkRead={handleMarkMessageRead}
        onDeleteMessage={handleDeleteMessage}
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        theme={currentThemePreset}
      />

      {/* Studio Gate Pass Modal (passcode checker) */}
      <AnimatePresence>
        {isAdminGateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsAdminGateOpen(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm p-6 sm:p-7 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-2xl z-10 text-center space-y-5"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Lock size={20} className="text-indigo-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold font-sans tracking-tight">KREATIV STUDIYA DARVOZASI</h3>
                <p className="text-xs opacity-60">Muhammadali G'ofurov boshqaruv seansi</p>
              </div>

              <form onSubmit={handlePasscodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setPasscodeError(false);
                    }}
                    required
                    autoFocus
                    placeholder="Kalit so'zni kiriting..."
                    className="w-full text-center px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-semibold tracking-widest focus:outline-none focus:border-indigo-500 text-white focus:ring-1 focus:ring-indigo-505"
                  />
                  {passcodeError && (
                    <p className="text-[11px] text-red-400 font-medium">Noto'g'ri joriy etildi! Qayta urinib ko'ring.</p>
                  )}
                </div>

                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-850 text-left space-y-1 block">
                  <p className="text-[10px] uppercase font-mono opacity-40">STUDIYA TIZIMI</p>
                  <p className="text-[11px] opacity-60 leading-relaxed">
                    Ushbu bo'lim faqat administrator uchun mo'ljallangan. Portfolio elementlarini joriy tahrirlash uchun maxfiy kalit so'zini kiriting.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdminGateOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-xs font-semibold cursor-pointer"
                  >
                    Yopish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-md cursor-pointer"
                  >
                    Tasdiqlash
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
