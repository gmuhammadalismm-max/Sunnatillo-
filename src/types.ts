/**
 * Types for the Graphic Designer Portfolio Builder
 */

export interface SocialLinks {
  instagram?: string;
  behance?: string;
  dribbble?: string;
  linkedin?: string;
  github?: string;
  telegram?: string;
}

export interface Profile {
  name: string;
  title: string;
  subTitle: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  avatarUrl: string;
  bannerUrl: string;
  socials: SocialLinks;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  content?: string; // Rich story on how it was made
  category: string;
  tags: string[];
  imageUrl: string;
  galleryItems?: string[]; // Multiple design sub-images inside this project
  client?: string;
  year: string;
  link?: string;
  isFeatured?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'graphics' | 'tools' | 'concepts'; // e.g. Graphic Design, Adobe Suite, Creative Mindset
  level: number; // 0-100
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Testimonial {
  id: string;
  author: string;
  position: string;
  company: string;
  text: string;
  avatarUrl: string;
}

export interface ClientMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  testimonials: Testimonial[];
  messages: ClientMessage[];
  currentTheme: string;
  adminPasscode?: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
  accentHover: string;
  cardBg: string;
  borderColor: string;
  mutedText: string;
}
