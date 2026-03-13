
import { LeaderboardEntry } from '../types';

const getScriptUrl = (): string => {
  try {
    // Try import.meta.env first (Vite standard)
    if (import.meta.env && import.meta.env.VITE_GOOGLE_SHEET_URL) {
      return import.meta.env.VITE_GOOGLE_SHEET_URL.trim();
    }
    
    // Try process.env (mapped in vite.config.ts)
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env.VITE_GOOGLE_SHEET_URL) {
      // @ts-ignore
      return process.env.VITE_GOOGLE_SHEET_URL.trim();
    }
  } catch (e) {
    console.warn('Error accessing environment variables:', e);
  }
  
  // Fallback to the hardcoded URL
  return "https://script.google.com/macros/s/AKfycbxfvfGX7RKhHdXF3nxChTUtKMfffiC1dI5KSgjmRj_qW1hZiqbBRGj8Ol1STdGwvvlM/exec";
};

const SCRIPT_URL = getScriptUrl();

export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  if (!SCRIPT_URL || !SCRIPT_URL.startsWith('http')) {
    console.error('Invalid or missing SCRIPT_URL for leaderboard:', SCRIPT_URL);
    return [];
  }
  
  try {
    const url = `${SCRIPT_URL}${SCRIPT_URL.includes('?') ? '&' : '?'}action=getLeaderboard`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    if (!text || text.trim() === "") {
      console.warn('Empty response from leaderboard script');
      return [];
    }

    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) {
        console.error('Leaderboard data is not an array:', data);
        return [];
      }
      return data as LeaderboardEntry[];
    } catch (parseError) {
      console.error('Error parsing leaderboard JSON:', parseError);
      console.error('First 100 chars of response:', text.substring(0, 100));
      throw new Error('Response from server was not valid JSON');
    }
  } catch (error) {
    // Check if it's the specific error the user reported
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error fetching leaderboard:', errorMessage);
    
    // Return mock data if fetch fails for demo purposes
    return [
      { name: 'พยาบาลสมศรี', unit: 'ศัลยกรรมชาย', score: 12, points: 1700, timestamp: new Date().toISOString() },
      { name: 'พยาบาลสมชาย', unit: 'ศัลยกรรมหญิง', score: 11, points: 1100, timestamp: new Date().toISOString() },
      { name: 'พยาบาลสมใจ', unit: 'ICU', score: 10, points: 1000, timestamp: new Date().toISOString() },
    ];
  }
};
