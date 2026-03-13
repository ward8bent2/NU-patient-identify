
import { LeaderboardEntry } from '../types';

const SCRIPT_URL = process.env.VITE_GOOGLE_SHEET_URL || "https://script.google.com/macros/s/AKfycbxfvfGX7RKhHdXF3nxChTUtKMfffiC1dI5KSgjmRj_qW1hZiqbBRGj8Ol1STdGwvvlM/exec";

export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  if (!SCRIPT_URL) return [];
  
  try {
    // We append ?action=getLeaderboard to the URL
    const response = await fetch(`${SCRIPT_URL}?action=getLeaderboard`);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    
    const data = await response.json();
    return data as LeaderboardEntry[];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    // Return mock data if fetch fails for demo purposes
    return [
      { name: 'พยาบาลสมศรี', unit: 'ศัลยกรรมชาย', score: 12, points: 1700, timestamp: new Date().toISOString() },
      { name: 'พยาบาลสมชาย', unit: 'ศัลยกรรมหญิง', score: 11, points: 1100, timestamp: new Date().toISOString() },
      { name: 'พยาบาลสมใจ', unit: 'ICU', score: 10, points: 1000, timestamp: new Date().toISOString() },
    ];
  }
};
