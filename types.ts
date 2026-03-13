
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface LeaderboardEntry {
  name: string;
  unit: string;
  score: number;
  points: number;
  timestamp: string;
}

export enum AppView {
  HOME = 'home',
  EDUCATION = 'education',
  ASSESSMENT = 'assessment',
  CHAT = 'chat',
  LEADERBOARD = 'leaderboard'
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  category: 'knowledge' | 'behavior';
}

export interface AssessmentResult {
  score: number;
  total: number;
  feedback: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
