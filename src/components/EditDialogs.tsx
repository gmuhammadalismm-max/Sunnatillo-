import React, { useState } from 'react';
import { Profile, Project, Skill, Experience, Testimonial, PortfolioData, ThemePreset } from '../types';
import { X, Save, Plus, Trash2, Globe, Image, Sparkles, Check, Download, Upload, RefreshCw, Key } from 'lucide-react';
import { curatedDesignImages } from '../utils';

interface EditDialogsProps {
  data: PortfolioData;
  onChange: (updatedData: PortfolioData) => void;
  onReset: () => void;
  activeTab: 'profile' | 'projects' | 'skills' | 'experience' | 'testimonials' | 'backup';
  isOpen: boolean;
  onClose: () => void;
  theme: ThemePreset;
  onTabChange: (tab: 'profile' | 'projects' | 'skills' | 'experience' | 'testimonials' | 'backup') => void;
}

function UniversalImageUploader({
  label,
  value,
  onChange,
  idPlaceholder
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  idPlaceholder: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("Rasm fayli hajmi juda katta (maksimal 10 MB bo'lishi mumkin).");
      return;
    }

    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        let width = img.width;
        let height = img.height;
        
        // Resize image to max 900px dimension
        const MAX_DIM = 900;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress quality to 65% JPEG to dramatically reduce byte size (approx 40KB - 80KB)
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.65);
          onChange(compressedBase64);
        } else {
          onChange(event.target?.result as string);
        }
        setIsCompressing(false);
      };
      img.onerror = () => {
        setIsCompressing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setIsCompressing(false);
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2 text-left">
      <label className="block text-xs font-mono uppercase opacity-75">{label}</label>
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files?.[0]; if (file) handleFile(file); }}
        className={`relative border-2 border-dashed rounded-xl p-3 flex flex-col items-center justify-center transition-all ${dragOver ? 'border-indigo-500 bg-indigo-500/10' : 'border-zinc-800 bg-zinc-950/40 hover:bg-zinc-950/80'}`}
      >
        {isCompressing ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <span className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono opacity-60">Rasm siqilmoqda...</p>
          </div>
        ) : value ? (
          <div className="flex items-center gap-3 w-full">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-zinc-800 shrink-0 bg-zinc-900">
              <img src={value} alt="Current" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase font-mono text-emerald-400 font-bold">Mavjud rasm optimallashtirildi ✨</p>
              <p className="text-[11px] truncate opacity-75">{value.startsWith('data:') ? 'Kompyuterdan yuklangan fayl (Base64)' : value}</p>
            </div>
          </div>
        ) : (
          <p className="text-xs opacity-55">Hali rasm tanlanmagan</p>
        )}

        <div className="flex items-center gap-2 mt-2 w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs focus:outline-none focus:border-indigo-500 text-zinc-300"
            placeholder="Rasm havolasi yoki fayl yuklang..."
            id={idPlaceholder}
            disabled={isCompressing}
          />
          <label className={`px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer shrink-0 transition-colors flex items-center gap-1 ${isCompressing ? 'opacity-50 pointer-events-none' : ''}`}>
            <Upload size={12} />
            <span>Faylni tanlash</span>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
              disabled={isCompressing}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default function EditDialogs({
  data,
  onChange,
  onReset,
  activeTab,
  isOpen,
  onClose,
  theme,
  onTabChange
}: EditDialogsProps) {
  if (!isOpen) return null;

  // Local state for profile edits
  const [profileForm, setProfileForm] = useState<Profile>({ ...data.profile });

  // Local state for single project editing
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    description: '',
    content: '',
    category: 'Brending',
    tags: [],
    imageUrl: curatedDesignImages[0].url,
    galleryItems: [],
    client: '',
    year: '2026',
    link: '',
    isFeatured: false
  });
  const [tagInput, setTagInput] = useState('');

  // Local states for skills, experience, testimonials
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [newSkillForm, setNewSkillForm] = useState<Partial<Skill>>({
    name: '',
    category: 'tools',
    level: 80
  });

  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [newExpForm, setNewExpForm] = useState<Partial<Experience>>({
    role: '',
    company: '',
    duration: '',
    description: ''
  });

  const [editingTestim, setEditingTestim] = useState<Testimonial | null>(null);
  const [newTestimForm, setNewTestimForm] = useState<Partial<Testimonial>>({
    author: '',
    position: '',
    company: '',
    text: '',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
  });

  // Backup state
  const [jsonImportError, setJsonImportError] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState('');
  const [newPasscode, setNewPasscode] = useState('');

  // Change passcode handler
  const handlePasscodeChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim()) {
      alert("Iltimos, yangi kalit so'zni kiriting!");
      return;
    }
    if (newPasscode.trim().length < 4) {
      alert("Yangi kalit so'z kamida 4 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    onChange({
      ...data,
      adminPasscode: newPasscode.trim()
    });
    alert("Kreativ studiya darvozasi kalit so'zi muvaffaqiyatli o'zgartirildi!");
    setNewPasscode('');
  };

  // Save profile changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({
      ...data,
      profile: profileForm
    });
    alert("Profil ma'lumotlari saqlandi!");
  };

  // Add/Edit Project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      alert("Iltimos sarlavha va qisqa ta'rifni kiriting!");
      return;
    }

    let updatedProjects = [...data.projects];

    if (isAddingProject) {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: projectForm.title || '',
        description: projectForm.description || '',
        content: projectForm.content || '',
        category: projectForm.category || 'Dizayn',
        tags: projectForm.tags || [],
        imageUrl: projectForm.imageUrl || curatedDesignImages[0].url,
        galleryItems: projectForm.galleryItems || [],
        client: projectForm.client || '',
        year: projectForm.year || '2026',
        link: projectForm.link || '',
        isFeatured: projectForm.isFeatured || false
      };
      updatedProjects.unshift(newProj);
    } else if (editingProject) {
      updatedProjects = updatedProjects.map(p =>
        p.id === editingProject.id
          ? { ...p, ...projectForm as Project }
          : p
      );
    }

    onChange({
      ...data,
      projects: updatedProjects
    });

    setEditingProject(null);
    setIsAddingProject(false);
    resetProjectForm();
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      content: '',
      category: 'Brending & Identika',
      tags: [],
      imageUrl: curatedDesignImages[0].url,
      galleryItems: [],
      client: '',
      year: '2026',
      link: '',
      isFeatured: false
    });
    setTagInput('');
  };

  const deleteProject = (id: string) => {
    if (confirm("Ushbu loyihani o'chirmoqchimisiz?")) {
      onChange({
        ...data,
        projects: data.projects.filter(p => p.id !== id)
      });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !(projectForm.tags || []).includes(tagInput.trim())) {
      setProjectForm({
        ...projectForm,
        tags: [...(projectForm.tags || []), tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setProjectForm({
      ...projectForm,
      tags: (projectForm.tags || []).filter(t => t !== tagToRemove)
    });
  };

  // Add/Edit Skill
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillForm.name) return;

    let updatedSkills = [...data.skills];

    if (editingSkill) {
      updatedSkills = updatedSkills.map(s =>
        s.id === editingSkill.id ? { ...s, ...newSkillForm as Skill } : s
      );
    } else {
      updatedSkills.push({
        id: `s-${Date.now()}`,
        name: newSkillForm.name,
        category: newSkillForm.category || 'tools',
        level: newSkillForm.level || 80
      });
    }

    onChange({ ...data, skills: updatedSkills });
    setEditingSkill(null);
    setNewSkillForm({ name: '', category: 'tools', level: 80 });
  };

  const deleteSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(s => s.id !== id)
    });
  };

  // Add/Edit Experience
  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpForm.role || !newExpForm.company) return;

    let updatedExp = [...data.experiences];

    if (editingExp) {
      updatedExp = updatedExp.map(exp =>
        exp.id === editingExp.id ? { ...exp, ...newExpForm as Experience } : exp
      );
    } else {
      updatedExp.push({
        id: `exp-${Date.now()}`,
        role: newExpForm.role || '',
        company: newExpForm.company || '',
        duration: newExpForm.duration || '',
        description: newExpForm.description || ''
      });
    }

    onChange({ ...data, experiences: updatedExp });
    setEditingExp(null);
    setNewExpForm({ role: '', company: '', duration: '', description: '' });
  };

  const deleteExp = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter(exp => exp.id !== id)
    });
  };

  // Add/Edit Testimonial
  const handleSaveTestim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimForm.author || !newTestimForm.text) return;

    let updatedTestim = [...data.testimonials];

    if (editingTestim) {
      updatedTestim = updatedTestim.map(t =>
        t.id === editingTestim.id ? { ...t, ...newTestimForm as Testimonial } : t
      );
    } else {
      updatedTestim.push({
        id: `test-${Date.now()}`,
        author: newTestimForm.author || '',
        position: newTestimForm.position || '',
        company: newTestimForm.company || '',
        text: newTestimForm.text || '',
        avatarUrl: newTestimForm.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
      });
    }

    onChange({ ...data, testimonials: updatedTestim });
    setEditingTestim(null);
    setNewTestimForm({
      author: '',
      position: '',
      company: '',
      text: '',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    });
  };

  const deleteTestim = (id: string) => {
    onChange({
      ...data,
      testimonials: data.testimonials.filter(t => t.id !== id)
    });
  };

  // Import JSON Data
  const handleImportJson = (e: React.FormEvent) => {
    e.preventDefault();
    setJsonImportError(null);
    try {
      const parsed = JSON.parse(jsonText);
      // Simple validation
      if (!parsed.profile || !parsed.projects || !parsed.skills) {
        throw new Error("Skanerlash xatosi: JSON strukturasida profile, projects yoki skills maydonlari topilmadi.");
      }
      onChange(parsed as PortfolioData);
      alert("Ma'lumotlar muvaffaqiyatli tiklandi va o'rnatildi!");
      onClose();
    } catch (err: any) {
      setJsonImportError(err.message || "Noto'g'ri JSON format. Iltimos tekshirib qayta kiriting.");
    }
  };

  const handleBackupExport = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.profile.name.toLowerCase().replace(/\s+/g, '_')}_portfolio.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="edit-dialogs-overlay" className="fixed inset-0 z-50 flex justify-end p-0 md:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Editor Drawer */}
      <div className={`relative w-full max-w-2xl h-full md:h-[calc(100vh-2rem)] flex flex-col rounded-none md:rounded-2xl ${theme.bg} ${theme.text} border ${theme.borderColor} shadow-2xl z-10 overflow-hidden`}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold font-sans flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/10 text-indigo-400">🛠️</span>
              {activeTab === 'profile' && "Profil Tafsilotlarini Tahrirlash"}
              {activeTab === 'projects' && "Loyihalarni Boshqarish"}
              {activeTab === 'skills' && "Ko'nikmalarni Sozlash"}
              {activeTab === 'experience' && "Tajriba Xronologiyasi"}
              {activeTab === 'testimonials' && "Mijozlar Fikrlari"}
              {activeTab === 'backup' && "Ma'lumotlar Zaxira Nusxasi (Backup)"}
            </h2>
            <p className="text-xs opacity-60 mt-0.5">Hamma o'zgarishlar brauzer xotirasida avtomatik saqlanadi</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-zinc-800/80 transition-colors"
            id="close-drawer-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sleek Horizontal Navigation Tabs */}
        <div className="px-4 md:px-6 py-2 border-b border-zinc-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 bg-zinc-950/40">
          {([
            { id: 'profile', name: 'Profil' },
            { id: 'projects', name: 'Loyihalar' },
            { id: 'skills', name: 'Ko\'nikmalar' },
            { id: 'experience', name: 'Tajriba' },
            { id: 'testimonials', name: 'Mijozlar' },
            { id: 'backup', name: 'Parol & Backup' }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">To'liq ism-sharifingiz</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="Masalan: G'ofurov Muhammadali"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Kasbiy Unvon</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="Masalan: Mustaqil Grafik Dizayner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Kichik Sarlavha</label>
                <input
                  type="text"
                  value={profileForm.subTitle}
                  onChange={(e) => setProfileForm({ ...profileForm, subTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none"
                  placeholder="Brendlar uchun vizual identika va qadoqlash"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Men Haqimda (Bio)</label>
                <textarea
                  rows={4}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none resize-none"
                  placeholder="O'zingiz haqingizda qisqacha ma'lumot va dizayn uslubingiz..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Manzil</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="Toshkent, O'zbekiston"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Elektron Pochta</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="email@eslatma.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Telefon raqam</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UniversalImageUploader
                  label="Profil rasm (Avatar)"
                  value={profileForm.avatarUrl}
                  onChange={(val) => setProfileForm({ ...profileForm, avatarUrl: val })}
                  idPlaceholder="profile-avatar-url"
                />
                <UniversalImageUploader
                  label="Banner rasm (Muqovali fon)"
                  value={profileForm.bannerUrl}
                  onChange={(val) => setProfileForm({ ...profileForm, bannerUrl: val })}
                  idPlaceholder="profile-banner-url"
                />
              </div>

              <div className="border-t border-dashed border-zinc-800/80 pt-4 space-y-3">
                <h4 className="text-sm font-semibold text-indigo-400">Ijtimoiy Tarmoqlar & Telegram Portfolio Linklari</h4>
                
                {/* Highlighted Telegram Portfolio Block */}
                <div className="p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-indigo-400">Telegram Portfolio Kanal Linki</label>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded uppercase font-mono">Asosiy Link</span>
                  </div>
                  <input
                    type="text"
                    value={profileForm.socials.telegram || ''}
                    onChange={(e) => setProfileForm({
                      ...profileForm,
                      socials: { ...profileForm.socials, telegram: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:border-indigo-500 focus:outline-none transition-colors"
                    placeholder="Masalan: https://t.me/muhammadali_design"
                  />
                  <p className="text-[10px] text-zinc-400 leading-normal">
                    Bu havola saytdagi barcha <b>"Telegram Portfolio"</b> tugmalari va sarlavhalarini sizning shaxsiy yoki ijodiy kanalingizga yo'naltiradi.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono opacity-60 mb-1">Instagram Link</label>
                    <input
                      type="text"
                      value={profileForm.socials.instagram || ''}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        socials: { ...profileForm.socials, instagram: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                      placeholder="https://instagram.com/instagram_username"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono opacity-60 mb-1">Behance Link</label>
                    <input
                      type="text"
                      value={profileForm.socials.behance || ''}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        socials: { ...profileForm.socials, behance: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                      placeholder="https://behance.net/username"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono opacity-60 mb-1">Dribbble Link</label>
                    <input
                      type="text"
                      value={profileForm.socials.dribbble || ''}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        socials: { ...profileForm.socials, dribbble: e.target.value }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                      placeholder="https://dribbble.com/username"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full justify-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-semibold text-white transition-colors mt-6 shadow-md cursor-pointer"
                id="save-profile-btn"
              >
                <Save size={16} />
                Profilni Saqlash
              </button>
            </form>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Reset view triggers */}
              {!editingProject && !isAddingProject ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-60 font-mono">Loyihalaringiz ({data.projects.length} ta)</span>
                    <button
                      onClick={() => {
                        resetProjectForm();
                        setIsAddingProject(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 text-white rounded-xl text-xs hover:bg-indigo-600 transition-colors font-medium shadow-sm cursor-pointer"
                      id="add-new-project-btn"
                    >
                      <Plus size={14} />
                      Yangi Loyiha Qo'shish
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {data.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3 rounded-xl bg-zinc-900 border border-zinc-800/80 flex gap-4 items-center justify-between hover:border-zinc-700 transition-all group"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={proj.imageUrl || undefined}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover bg-zinc-800 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="truncate">
                            <h4 className="text-sm font-semibold truncate text-white">{proj.title}</h4>
                            <div className="flex gap-2 items-center text-xs opacity-50 mt-0.5">
                              <span>{proj.category}</span>
                              <span className="w-1 h-1 rounded-full bg-zinc-700" />
                              <span>{proj.year}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setProjectForm({ ...proj });
                              setIsAddingProject(false);
                            }}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs transition-colors cursor-pointer text-indigo-400"
                          >
                            Tahrirlash
                          </button>
                          <button
                            onClick={() => deleteProject(proj.id)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950 text-red-400 text-xs transition-colors cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* ADD / EDIT PROJECT SPECIFIC FORM */
                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <h3 className="text-sm font-bold text-indigo-400">
                      {isAddingProject ? "🚀 Yangi Loyiha yaratish" : `✍️ "${projectForm.title}" loyihasini tahrirlash`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null);
                        setIsAddingProject(false);
                      }}
                      className="text-xs opacity-60 hover:opacity-100 flex items-center gap-1 cursor-pointer"
                    >
                      <X size={12} /> Bekor qilish
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Loyiha Sarlavhasi</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none text-white"
                      placeholder="Masalan: Milliy Choy Brendingi"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Kategoriya</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none text-zinc-300"
                      >
                        <option value="Brending & Identika">Brending & Identika</option>
                        <option value="Qadoqlash">Qadoqlash</option>
                        <option value="Plakatlar & Grafika">Plakatlar & Grafika</option>
                        <option value="UI/UX & Veb Dizayn">UI/UX & Veb Dizayn</option>
                        <option value="Illyustratsiya">Illyustratsiya</option>
                        <option value="Ijtimoiy Tarmoqlar SMM">Ijtimoiy Tarmoqlar SMM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Tayyorlangan Yil</label>
                      <input
                        type="text"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 text-zinc-300"
                        placeholder="2026"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Mijoz (Sarlavha)</label>
                      <input
                        type="text"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none"
                        placeholder="Masalan: Art Co."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Behance yoki Tashqi Havola</label>
                      <input
                        type="text"
                        value={projectForm.link}
                        onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none"
                        placeholder="https://behance.net/..."
                      />
                    </div>
                  </div>

                  {/* Curated Designers' Background Choice */}
                  <div className="space-y-3">
                    <UniversalImageUploader
                      label="Loyiha Rasmi"
                      value={projectForm.imageUrl || ''}
                      onChange={(val) => setProjectForm({ ...projectForm, imageUrl: val })}
                      idPlaceholder="project-image-url"
                    />
                    <label className="block text-xs font-mono uppercase opacity-55">
                      Yoki quyidagi tavsiya etilgan rasmlar to'plamidan tanlang:
                    </label>

                    <div className="grid grid-cols-4 gap-2 border border-zinc-850 p-2.5 bg-zinc-950/40 rounded-xl">
                      {curatedDesignImages.map((cur) => (
                        <button
                          key={cur.id}
                          type="button"
                          onClick={() => setProjectForm({ ...projectForm, imageUrl: cur.url })}
                          className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${projectForm.imageUrl === cur.url ? 'border-indigo-500 ring-2 ring-indigo-500/25' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                          <img
                            src={cur.url}
                            alt=""
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-center py-0.5 truncate text-white">{cur.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Gallery Items */}
                  <div className="space-y-3 pt-3 border-t border-dashed border-zinc-800">
                    <label className="block text-xs font-mono uppercase opacity-75">
                      Loyiha Galereyasi (Qo'shimcha maketlar / dizaynlar)
                    </label>
                    <p className="text-[10px] text-zinc-400">
                      Ushbu loyiha sahifasining ichida bir necha xil namunalarni ko'rsatish uchun shu yerga qo'shimcha rasmlarni yuklang:
                    </p>
                    
                    {/* Thumbnail list of current galleryItems */}
                    {(projectForm.galleryItems || []).length > 0 && (
                      <div className="grid grid-cols-4 gap-2 border border-zinc-850 p-2 bg-zinc-950/40 rounded-xl">
                        {(projectForm.galleryItems || []).map((imgUrl, i) => (
                          <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 group">
                            <img
                              src={imgUrl}
                              alt=""
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const list = (projectForm.galleryItems || []).filter((_, idx) => idx !== i);
                                setProjectForm({ ...projectForm, galleryItems: list });
                              }}
                              className="absolute top-1 right-1 p-1 rounded-full bg-red-650 hover:bg-red-755 text-white transition-colors cursor-pointer shadow"
                              title="Slaydni o'chirish"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Simple input & upload trigger to add new element to galleryItems */}
                    <UniversalImageUploader
                      label="Yangi slayd qo'shish (Fayl yoki Havola)"
                      value=""
                      onChange={(newImg) => {
                        if (newImg) {
                          const list = [...(projectForm.galleryItems || []), newImg];
                          setProjectForm({ ...projectForm, galleryItems: list });
                        }
                      }}
                      idPlaceholder="add-gallery-item-uploader"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Qisqa Tavsif (Karta uchun)</label>
                    <textarea
                      rows={2}
                      required
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none resize-none"
                      placeholder="Loyihaning asosiy maqsadi ko'rsatilgan qisqa so'zlar..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase opacity-75 mb-1.5">Loyiha Ko'rinishi (Jarayon tafsilotlari - Batafsil)</label>
                    <textarea
                      rows={5}
                      value={projectForm.content}
                      onChange={(e) => setProjectForm({ ...projectForm, content: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm focus:border-indigo-500 focus:outline-none resize-none"
                      placeholder="Ushbu loyihani qanday yondashuv bilan bajargansiz? Ranglar tanlovi, g'oya, buyurtmachi bilan erishilgan kelishuv va jarayon hikoyasi..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase opacity-75 mb-1.5 flex items-center justify-between">
                      Teglar
                      <span className="text-[10px] opacity-55 font-sans">(Vergul yoki Enterni bosing)</span>
                    </label>
                    <div className="flex gap-1.5 mb-2 flex-wrap">
                      {(projectForm.tags || []).map((tag, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 text-xs text-white border border-zinc-700">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="p-0.5 rounded-full hover:bg-zinc-700/50 block text-zinc-400 hover:text-white"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs"
                        placeholder="Masalan: Logotip, 3D, Milliy"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-800 text-xs hover:bg-zinc-700"
                      >
                        Qo'shish
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={projectForm.isFeatured || false}
                      onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                      className="rounded border-zinc-800 bg-zinc-900 text-indigo-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <label htmlFor="isFeatured" className="text-xs text-zinc-300 select-none">
                      Ushbu loyihani asosiy oynaga eng birinchi qilib chiqarish (Featured)
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full justify-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold text-white transition-colors cursor-pointer mt-4"
                  >
                    <Check size={16} />
                    {isAddingProject ? "Loyihani Saqlash (Qo'shish)" : "O'zgarishlarni Saqlash"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* Form to Add Skill */}
              <form onSubmit={handleSaveSkill} className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-850 space-y-3.5">
                <h4 className="text-xs font-mono uppercase text-indigo-400">
                  {editingSkill ? "✍️ Ko'nikmani O'zgartirish" : "🚀 Yangi Ko'nikma Qo'shish"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono opacity-70 mb-1">Ko'nikma / Dastur nomi</label>
                    <input
                      type="text"
                      required
                      value={newSkillForm.name}
                      onChange={(e) => setNewSkillForm({ ...newSkillForm, name: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      placeholder="Masalan: Coral Draw, Adobe SMM"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono opacity-70 mb-1">Kategoriya</label>
                    <select
                      value={newSkillForm.category}
                      onChange={(e) => setNewSkillForm({ ...newSkillForm, category: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                    >
                      <option value="tools">Grafik Dasturlar (Tools)</option>
                      <option value="graphics">Yo'nalishlar (Graphics Specialties)</option>
                      <option value="concepts">Ijodiy Ko'nikmalar (Creative Concepts)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono opacity-70 mb-1 flex justify-between">
                    O'zlashtirish Darajasi
                    <span className="font-sans font-bold text-indigo-400">{newSkillForm.level}%</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={newSkillForm.level}
                    onChange={(e) => setNewSkillForm({ ...newSkillForm, level: parseInt(e.target.value) })}
                    className="w-full accent-indigo-500 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  {editingSkill && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSkill(null);
                        setNewSkillForm({ name: '', category: 'tools', level: 80 });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs hover:bg-zinc-700 cursor-pointer"
                    >
                      Bekor qilish
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-indigo-500 font-semibold text-white text-xs hover:bg-indigo-600 transition-colors shadow-sm cursor-pointer"
                  >
                    {editingSkill ? "Saqlash" : "Qo'shish"}
                  </button>
                </div>
              </form>

              {/* Skills List */}
              <div className="space-y-2">
                <span className="text-xs font-mono opacity-60">Amaldagi ko'nikmalar ro'yxati:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {data.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/85 flex items-center justify-between"
                    >
                      <div className="truncate">
                        <span className="text-xs font-semibold text-white block truncate">{skill.name}</span>
                        <span className="text-[10px] opacity-50 block uppercase font-mono">
                          {skill.category === 'tools' ? 'Dastur' : skill.category === 'graphics' ? 'Uslub' : 'Konsept'} • {skill.level}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shadow-xs shrink-0">
                        <button
                          onClick={() => {
                            setEditingSkill(skill);
                            setNewSkillForm({ ...skill });
                          }}
                          className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] text-indigo-400 rounded cursor-pointer"
                        >
                          E
                        </button>
                        <button
                          onClick={() => deleteSkill(skill.id)}
                          className="px-2 py-1 bg-zinc-800 hover:bg-red-950 text-[10px] text-red-400 rounded cursor-pointer"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              {/* Form to Add / Edit Experience */}
              <form onSubmit={handleSaveExp} className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-850 space-y-3">
                <h4 className="text-xs font-mono uppercase text-indigo-400">
                  {editingExp ? "✍️ Ish joyini tahrirlash" : "💼 Yangi tajriba qo'shish"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono opacity-70 mb-1">Lavozim</label>
                    <input
                      type="text"
                      required
                      value={newExpForm.role}
                      onChange={(e) => setNewExpForm({ ...newExpForm, role: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      placeholder="Masalan: Art Director"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono opacity-70 mb-1">Kompaniya nomi</label>
                    <input
                      type="text"
                      required
                      value={newExpForm.company}
                      onChange={(e) => setNewExpForm({ ...newExpForm, company: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      placeholder="Masalan: Brand Agency"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono opacity-70 mb-1">Muddati (Yillar)</label>
                  <input
                    type="text"
                    required
                    value={newExpForm.duration}
                    onChange={(e) => setNewExpForm({ ...newExpForm, duration: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                    placeholder="Masalan: 2024 - Hozirgacha yoki 2022 - 2024"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono opacity-70 mb-1">Vazifalar / Tavsif</label>
                  <textarea
                    rows={3}
                    required
                    value={newExpForm.description}
                    onChange={(e) => setNewExpForm({ ...newExpForm, description: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white resize-none"
                    placeholder="Ushbu lavozimda bajargan ishlaringiz, katta loyihalaringiz haqida..."
                  />
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  {editingExp && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingExp(null);
                        setNewExpForm({ role: '', company: '', duration: '', description: '' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs hover:bg-zinc-700 cursor-pointer"
                    >
                      Bekor qilish
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-indigo-500 font-semibold text-white text-xs hover:bg-indigo-600 transition-colors cursor-pointer"
                  >
                    {editingExp ? "Saqlash" : "Tajriba Qo'shish"}
                  </button>
                </div>
              </form>

              {/* Experience list */}
              <div className="space-y-3">
                <span className="text-xs font-mono opacity-60">Ish xronologiyasi ro'yxati:</span>
                <div className="space-y-2">
                  {data.experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-3 rounded-lg bg-zinc-900 border border-zinc-800/85 flex items-start justify-between gap-3"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white">{exp.role} — <span className="text-indigo-400">{exp.company}</span></h4>
                        <span className="text-[10px] opacity-50 block mt-0.5">{exp.duration}</span>
                        <p className="text-xs opacity-70 mt-1 lines-clamp-2">{exp.description}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingExp(exp);
                            setNewExpForm({ ...exp });
                          }}
                          className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] text-indigo-400 rounded cursor-pointer"
                        >
                          Muharrir
                        </button>
                        <button
                          onClick={() => deleteExp(exp.id)}
                          className="px-2 py-1 bg-zinc-800 hover:bg-red-950 text-[10px] text-red-500 rounded cursor-pointer"
                        >
                          O'chirish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TESTIMONIALS TAB */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <form onSubmit={handleSaveTestim} className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-850 space-y-3">
                <h4 className="text-xs font-mono uppercase text-indigo-400">
                  {editingTestim ? "✍️ Fikrni tahrirlash" : "✍️ Yangi mijoz fikrini qo'shish"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono opacity-70 mb-1">Mijoz Ism-sharifi</label>
                    <input
                      type="text"
                      required
                      value={newTestimForm.author}
                      onChange={(e) => setNewTestimForm({ ...newTestimForm, author: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      placeholder="Dilshod Karimov"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono opacity-70 mb-1">Lavozim, Kompaniya</label>
                    <input
                      type="text"
                      required
                      value={newTestimForm.position}
                      onChange={(e) => setNewTestimForm({ ...newTestimForm, position: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      placeholder="Marketing directori, Apex LLC"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <UniversalImageUploader
                    label="Mijoz Rasmi"
                    value={newTestimForm.avatarUrl || ''}
                    onChange={(val) => setNewTestimForm({ ...newTestimForm, avatarUrl: val })}
                    idPlaceholder="testimonial-avatar-url"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono opacity-70 mb-1">Mijoz So'zlari (Fikr-mulohaza)</label>
                  <textarea
                    rows={3}
                    required
                    value={newTestimForm.text}
                    onChange={(e) => setNewTestimForm({ ...newTestimForm, text: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white resize-none"
                    placeholder="Dizaynerning ishi va muloqot madaniyati haqida iliq fikr..."
                  />
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  {editingTestim && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTestim(null);
                        setNewTestimForm({
                          author: '',
                          position: '',
                          company: '',
                          text: '',
                          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
                        });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs hover:bg-zinc-700 cursor-pointer"
                    >
                      Bekor qilish
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-indigo-500 font-semibold text-white text-xs hover:bg-indigo-600 transition-colors cursor-pointer"
                  >
                    Fikrni Saqlash
                  </button>
                </div>
              </form>

              {/* Testimonials List */}
              <div className="space-y-2">
                <span className="text-xs font-mono opacity-60">Amaldagi mijozlar tavsiyanomalari:</span>
                <div className="space-y-2">
                  {data.testimonials.map((testim) => (
                    <div
                      key={testim.id}
                      className="p-3 rounded-lg bg-zinc-900 border border-zinc-800/85 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={testim.avatarUrl || undefined}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover bg-zinc-800"
                        />
                        <div className="truncate">
                          <span className="text-xs font-semibold text-white block">{testim.author}</span>
                          <span className="text-[10px] opacity-50 block truncate">{testim.position}</span>
                          <p className="text-[11px] italic text-zinc-400 mt-1 line-clamp-1">"{testim.text}"</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingTestim(testim);
                            setNewTestimForm({ ...testim });
                          }}
                          className="p-1 px-2.5 bg-zinc-800 text-indigo-400 text-[10px] rounded hover:bg-zinc-750 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTestim(testim.id)}
                          className="p-1 px-2.5 bg-zinc-800 text-red-400 text-[10px] rounded hover:bg-red-950 cursor-pointer"
                        >
                          Del
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BACKUP TAB */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 text-center space-y-3">
                  <Download className="mx-auto text-indigo-400" size={32} />
                  <div>
                    <h4 className="text-sm font-bold">Ma'lumotlarni Yuklash</h4>
                    <p className="text-xs opacity-65 mt-1">Yozgan hamma portfolio ma'lumotlaringizni JSON fayl ko'rinishida kompyuterga saqlab oling.</p>
                  </div>
                  <button
                    onClick={handleBackupExport}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    JSON Yuklab olish
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 text-center space-y-3">
                  <RefreshCw className="mx-auto text-orange-400" size={32} />
                  <div>
                    <h4 className="text-sm font-bold">Boshlang'ich Holat</h4>
                    <p className="text-xs opacity-65 mt-1">Sinf va default dizayn ma'lumotlarini (namuna loyihalarini) qayta tiklang.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("Rostdan ham barcha ma'lumotlarni o'chirib, boshlang'ich namunaviy holatga qaytarmoqchimisiz?")) {
                        onReset();
                        alert("Boshlang'ich ma'lumotlar tiklandi!");
                        onClose();
                      }
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Namunani tiklash
                  </button>
                </div>
              </div>

              {/* Passcode Change Card */}
              <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-center gap-2">
                  <Key size={18} className="text-indigo-400" />
                  <h4 className="text-xs font-mono uppercase font-bold text-white">STUDIYA DARVOZASI KALIT SO'ZINI O'ZGARTIRISH</h4>
                </div>
                <p className="text-xs opacity-60 leading-relaxed">
                  Boshqaruv paneliga kirish uchun foydalaniladigan maxfiy kalit so'zni o'zgartiring. Hozirgi kalit: <strong className="text-indigo-400 font-mono">{data.adminPasscode || 'admin'}</strong>
                </p>
                <form onSubmit={handlePasscodeChangeSubmit} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Yangi maxfiy kalit..."
                    required
                    className="flex-1 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-850 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    Saqlash
                  </button>
                </form>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-center gap-2">
                  <Upload size={18} className="text-indigo-400" />
                  <h4 className="text-xs font-mono uppercase font-bold text-white">Avvalgi JSON zaxira faylini yuklash</h4>
                </div>
                <p className="text-xs opacity-60">Zaxira qilgan `.json` portfolio kodingizni bu erga tashlab o'rnating:</p>
                <form onSubmit={handleImportJson} className="space-y-3">
                  <textarea
                    rows={6}
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    required
                    className="w-full font-mono p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-[10px] leading-relaxed text-zinc-400 focus:outline-none"
                    placeholder='{"profile": { ... }, "projects": [ ... ] }'
                  />
                  {jsonImportError && (
                    <p className="text-xs text-red-400 bg-red-950/20 p-2.5 rounded-lg border border-red-900/30">
                      ⚠️ {jsonImportError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Ma'lumotlarni O'rnatish (Import)
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
