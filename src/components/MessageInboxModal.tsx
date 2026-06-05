import React from 'react';
import { ClientMessage, ThemePreset } from '../types';
import { Mail, Trash2, Calendar, User, Eye, EyeOff, CheckCheck, X, FolderKanban } from 'lucide-react';

interface MessageInboxModalProps {
  messages: ClientMessage[];
  onMarkRead: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  theme: ThemePreset;
}

export default function MessageInboxModal({
  messages,
  onMarkRead,
  onDeleteMessage,
  isOpen,
  onClose,
  theme
}: MessageInboxModalProps) {
  if (!isOpen) return null;

  return (
    <div id="messages-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={onClose} />

      {/* Content */}
      <div className={`relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl ${theme.bg} ${theme.text} border ${theme.borderColor} shadow-2xl z-10 overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-sans">Krilgan Mijoz So'rovlari (Inbox/CRM)</h3>
              <p className="text-xs opacity-60">Siz bilan ishlash istagini bildirgan ssenariy va ma'lumotlar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-zinc-800"
            id="close-inbox-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message scroll list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <FolderKanban className="mx-auto text-zinc-650 opacity-40 animate-pulse" size={48} />
              <p className="text-sm opacity-55">Hozircha yangi so'rovlar yo'q.</p>
              <p className="text-xs opacity-40 max-w-sm mx-auto">Tashrif buyuruvchilar asboblar panelidagi "Loyihani Muhokama Qilish" formasi orqali sizga yuborgan xabarlari shu erda ko'rinadi.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl border transition-all ${msg.read ? 'bg-zinc-900/40 border-zinc-900' : 'bg-indigo-950/20 border-indigo-500/30 ring-1 ring-indigo-500/5'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-850 pb-2.5 mb-2.5">
                    <div className="space-y-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono inline-block">
                        {msg.subject}
                      </span>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <User size={14} className="text-zinc-500" />
                        {msg.name} 
                        <span className="text-xs font-normal opacity-60">({msg.email})</span>
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] opacity-50 font-mono">
                        <Calendar size={12} />
                        {msg.date}
                      </div>

                      <div className="flex items-center gap-1">
                        {!msg.read && (
                          <button
                            onClick={() => onMarkRead(msg.id)}
                            title="O'qilgan deb belgilash"
                            className="p-1.5 rounded bg-zinc-800 text-emerald-400 hover:bg-zinc-700 transition-colors"
                          >
                            <CheckCheck size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteMessage(msg.id)}
                          title="Xabarni o'chirish"
                          className="p-1.5 rounded bg-zinc-800 text-red-400 hover:bg-red-950 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line bg-zinc-900/30 p-2.5 rounded-lg">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-950 border-t border-zinc-850 text-center shrink-0">
          <p className="text-[10px] opacity-45">Tizim sarlavhalari real vaqt rejimida hisoblanadi • LocalStorage mijozi</p>
        </div>
      </div>
    </div>
  );
}
