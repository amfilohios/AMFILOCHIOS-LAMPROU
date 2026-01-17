
export enum ResourceType {
  PDF = 'pdf',
  IMAGE = 'image',
  VIDEO = 'video',
  LINK = 'link'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // index
  explanation?: string;
}

export interface QuestionSet {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: Question[];
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  category: string;
  createdAt: string;
}

export interface UserState {
  isTeacher: boolean;
  username: string | null;
}
