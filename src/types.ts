export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  title: string;
  expertise: string;
  biography: string;
  photo_url: string;
  created_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  practice_area: "economic-modelling" | "socioeconomic-impact-assessment" | "economic-financial-advisory" | string;
  featured_image: string;
  challenge: string;
  methodology: string;
  findings: string;
  impact: string;
  status: "Active" | "Completed" | string;
  featured: boolean;
  created_at?: string;
}

export interface SiteContent {
  id: string;
  page: string;
  section: string;
  content: any;
  updated_at?: string;
}
