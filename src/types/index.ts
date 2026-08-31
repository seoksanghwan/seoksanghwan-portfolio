export interface ProjectPost {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  url: string;
  tags: string[];
  startDate: string;
  endDate: string;
  notionUrl: string;
  youtube?: string;
  featured: boolean;
  priority: number;
}

export interface CareerTask {
  service: string;
  period: string;
  descriptions: string[];
}

export interface Career {
  company: string;
  startDate: string;
  endDate: string | null;
  isGoing: boolean;
  tasks: CareerTask[];
}
