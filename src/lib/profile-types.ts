export interface ProfileEntry {
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
  image?: string;
  icon?: string;
}

export interface ProfileContent {
  name: string;
  tagline: string;
  aboutTitle: string;
  biography: string;
  profileImage: string;
  heroImage: string;
  socialLinks: Record<'facebook' | 'youtube' | 'instagram' | 'linkedin', string>;
  education: ProfileEntry[];
  skills: ProfileEntry[];
  experiences: ProfileEntry[];
  certifications: ProfileEntry[];
  awards: ProfileEntry[];
}
