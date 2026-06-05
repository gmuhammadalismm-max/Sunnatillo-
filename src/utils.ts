import { ThemePreset } from './types';

// Curated high quality Unsplash images for Graphic Designers to pick from in the UI
export interface CuratedImage {
  id: string;
  url: string;
  name: string;
  category: string;
}

export const curatedDesignImages: CuratedImage[] = [
  {
    id: "img-branding-1",
    url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    name: "To'q Neon Chiziqlar",
    category: "Branding"
  },
  {
    id: "img-branding-2",
    url: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&q=80&w=800",
    name: "Minimalist Ranglar Palitrasi",
    category: "Branding"
  },
  {
    id: "img-packaging-1",
    url: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800",
    name: "Hashamatli Qutilar",
    category: "Packaging"
  },
  {
    id: "img-packaging-2",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    name: "Suyuq Arxiv Pastellar",
    category: "Packaging"
  },
  {
    id: "img-poster-1",
    url: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=800",
    name: "Modernist Kitob Va Shrift",
    category: "Typography"
  },
  {
    id: "img-poster-2",
    url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
    name: "Gradiyent Kosmik San'at",
    category: "Abstract"
  },
  {
    id: "img-photo-1",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    name: "Kreativ UI Chizmalar",
    category: "UIUX"
  },
  {
    id: "img-photo-2",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    name: "Eskizlar va Eskizlar daftari",
    category: "Sketches"
  }
];

export function getThemeClasses(theme: ThemePreset) {
  return {
    bg: theme.bg,
    text: theme.text,
    accent: theme.accent,
    accentHover: theme.accentHover,
    cardBg: theme.cardBg,
    borderColor: theme.borderColor,
    mutedText: theme.mutedText
  };
}

export function exportToJsonFile(data: any, fileName: string = "muhammadali_portfolio.json") {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", jsonString);
  downloadAnchor.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
