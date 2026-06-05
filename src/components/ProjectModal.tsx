import React, { useState, useEffect } from 'react';
import { Project, ThemePreset } from '../types';
import { X, ExternalLink, Calendar, User, Tag, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  theme: ThemePreset;
}

export default function ProjectModal({
  project,
  allProjects,
  isOpen,
  onClose,
  onSelectProject,
  theme
}: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active slide index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  if (!project || !isOpen) return null;

  const isDark = theme.id === 'dark-nordic' || theme.id === 'cyber-brutalist';
  const headingFont = theme.id === 'natural-tones' ? 'font-serif' : 'font-display';
  const textAccentClass = theme.id === 'natural-tones' ? 'text-[#827F6A]' : 'text-indigo-400';
  const dividerClass = theme.id === 'natural-tones' ? 'border-[#DCD9D0]' : 'border-zinc-800';
  const cardPresetBg = theme.id === 'natural-tones' ? 'bg-[#FAF6EE] border-[#DCD9D0]' : 'bg-zinc-900 border-zinc-800';

  // Gather all slides (the main image + auxiliary gallery images of the project)
  const slides: {
    title: string;
    desc: string;
    url: string;
    isCustom?: boolean;
    filterClass?: string;
    isGridOverlay?: boolean;
  }[] = [];

  // Primary image
  slides.push({
    title: "Yakuniy Dizayn Maketi",
    desc: "Loyihaning to'liq ko'rinishi va asosiy vizual taqdimoti.",
    url: project.imageUrl
  });

  // Load custom gallery items if they exist
  if (project.galleryItems && project.galleryItems.length > 0) {
    project.galleryItems.forEach((url, i) => {
      slides.push({
        title: `Maket Ko'rinishi #${i + 1}`,
        desc: `Ushbu loyihaga tegishli qo'shimcha dizayn maketi yoki yaqindan ko'rinish.`,
        url: url,
        isCustom: true
      });
    });
  } else {
    // Generate beautiful procedural fallback mock variations of the core design 
    slides.push({
      title: "Chizma va Proporsiyalar (Blueprint/Grid)",
      desc: "Simmetriya, nisbat va modul tizimining o'lchamlar anatomiyasi.",
      url: project.imageUrl,
      filterClass: "invert grayscale opacity-35 contrast-150 saturate-0",
      isGridOverlay: true
    });
    slides.push({
      title: "Forma va Siluet (Monoxrom)",
      desc: "Murakkab rang va urg'ularsiz, faqatgina kompozitsiya formalarini tekshirish.",
      url: project.imageUrl,
      filterClass: "grayscale brightness-75 contrast-125"
    });
  }

  const currentSlide = slides[activeImageIndex] || slides[0];

  // Related projects of the exact same category
  const relatedProjects = allProjects.filter(p => p.category === project.category && p.id !== project.id);

  const handleNextSlide = () => {
    setActiveImageIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveImageIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <AnimatePresence>
      <div id="project-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xs"
        />

        {/* Modal content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl ${theme.bg} ${theme.text} border ${theme.borderColor} shadow-2xl z-10`}
        >
          {/* Main Visual Carousel area */}
          <div className="relative h-72 md:h-[420px] w-full bg-zinc-950 overflow-hidden group">
            
            {/* Slide active view */}
            <div className="w-full h-full relative flex items-center justify-center">
              <img
                src={currentSlide.url}
                alt={project.title}
                className={`w-full h-full object-cover transition-all duration-300 ${currentSlide.filterClass || ""}`}
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay blueprint system grids if toggled */}
              {currentSlide.isGridOverlay && (
                <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px] flex flex-col justify-between p-6">
                  <div className="w-full flex justify-between text-[9px] text-[#827F6A] font-mono leading-none tracking-widest uppercase">
                    <span>GRID PRECISE AXIS</span>
                    <span>SCALE RATIO: 1.618</span>
                  </div>
                  <div className="w-full h-px border-t border-dashed border-[#827F6A]/20" />
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
            
            {/* Slide Navigation Controls */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-105 transition-all scroll-smooth"
                  title="Oldingi slayd"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-105 transition-all scroll-smooth"
                  title="Keyingi slayd"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/10 z-10"
              id="close-modal-btn"
            >
              <X size={18} />
            </button>

            {/* Header detail banner overlaid on bottom of the image */}
            <div className="absolute bottom-4 left-6 right-6">
              <span className={`inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-sm ${theme.id === 'natural-tones' ? 'bg-[#827F6A]/30 text-white' : 'bg-indigo-500/30 text-indigo-200'} mb-2`}>
                {project.category}
              </span>
              <h2 className={`text-xl md:text-3xl font-bold tracking-tight text-white mb-1.5 ${headingFont}`}>
                {project.title}
              </h2>
              {slides.length > 1 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-widest">
                    [ SLIDE {activeImageIndex + 1}/{slides.length}: {currentSlide.title} ]
                  </span>
                  <span className="text-[10px] text-white/60">•</span>
                  <p className="text-[10px] text-white/70 line-clamp-1">{currentSlide.desc}</p>
                </div>
              )}
            </div>
          </div>

          {/* Miniature Slide Thumbnails Tray inside the Modal */}
          {slides.length > 1 && (
            <div className={`px-6 py-3 border-b ${dividerClass} flex items-center gap-2 overflow-x-auto shrink-0 bg-black/5/10`}>
              <span className="text-[9px] font-mono uppercase opacity-50 tracking-wider shrink-0 mr-2 flex items-center gap-1">
                <Grid size={11} /> Dizaynlar ({slides.length}):
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-9 rounded-sm overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100 hover:scale-102'}`}
                  >
                    <img
                      src={s.url}
                      alt=""
                      className={`w-full h-full object-cover ${s.filterClass || ""}`}
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Informational section */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left sidebar info column */}
            <div className={`space-y-6 md:border-r md:border-dashed ${dividerClass} pr-0 md:pr-6`}>
              <div>
                <h4 className="text-[10px] font-mono tracking-widest uppercase opacity-60 mb-2.5">Loyiha Ma'lumotlari</h4>
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 text-sm">
                    <User className={`${textAccentClass} shrink-0`} size={15} />
                    <div>
                      <p className="font-semibold text-xs leading-tight">Buyurtmachi</p>
                      <p className="text-[11px] opacity-70">{project.client || "Mustaqil Konsept"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className={`${textAccentClass} shrink-0`} size={15} />
                    <div>
                      <p className="font-semibold text-xs leading-tight">Muddati / Yili</p>
                      <p className="text-[11px] opacity-70">{project.year} yil</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono tracking-widest uppercase opacity-60 mb-2.5">Ranglar va Ko'rsatkich</h4>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 text-[10px] rounded ${theme.id === 'natural-tones' ? 'bg-[#EAE7DD]/70 text-[#3C3A33] border-[#DCD9D0]' : 'bg-zinc-800/40 text-zinc-300 border-zinc-700/40'} border flex items-center gap-1`}
                    >
                      <Tag size={9} className="opacity-60" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && (
                <div className="pt-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${theme.accent} ${theme.id === 'natural-tones' ? 'text-[#F9F7F2]' : 'text-white'}`}
                    id="project-visit-link"
                  >
                    Batafsil ko'rish
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>

            {/* Right main explanation descriptions */}
            <div className="md:col-span-2 space-y-6 text-left">
              <div>
                <h3 className={`text-md font-bold mb-2.5 ${headingFont}`}>Loyiha Konseptual G'oyasi</h3>
                <p className="text-xs md:text-sm leading-relaxed opacity-85">
                  {project.description}
                </p>
              </div>

              {project.content && (
                <div className={`pt-5 border-t border-dashed ${dividerClass} max-w-none`}>
                  <h3 className={`text-sm font-bold mb-2 ${headingFont}`}>Ijodiy Jarayon Jurnali (Yondashuv)</h3>
                  <div className="text-xs leading-relaxed opacity-80 whitespace-pre-line space-y-2">
                    {project.content}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM ATTACHED: TURKUMDOSH DIZAYNLAR (SAME CATEGORY WORKS) */}
          <div className={`px-6 md:px-8 py-6 border-t border-dashed ${dividerClass} bg-black/5`}>
            <h4 className={`text-sm font-bold opacity-90 mb-3 flex items-center gap-2 ${headingFont}`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${textAccentClass}`} />
              O'xshash {project.category} dizaynlari
            </h4>

            {relatedProjects.length === 0 ? (
              <p className="text-xs text-zinc-450 italic opacity-60">Ushbu turkumda hozircha boshqa tayyor loyihalar mavjud emas. Yangisini qo'shishingiz muomkin!</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {relatedProjects.map((relProj) => (
                  <button
                    key={relProj.id}
                    onClick={() => onSelectProject(relProj)}
                    className={`group text-left p-2 rounded-xl border ${cardPresetBg} hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer flex flex-col h-full overflow-hidden`}
                  >
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-zinc-950 mb-2 shrink-0">
                      <img
                        src={relProj.imageUrl}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h5 className="text-[11px] font-bold leading-tight truncate group-hover:text-amber-500 transition-colors">
                        {relProj.title}
                      </h5>
                      <span className="text-[9px] font-mono opacity-50 mt-1">{relProj.year} yil</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
