export type ThemeType = 'space' | 'jungle' | 'underwater' | 'fairy';

export interface Alarm {
  id: string;
  time: string; // HH:mm format
  days: number[]; // 0-6 (Sunday-Saturday)
  label: string;
  enabled: boolean;
  theme: ThemeType;
}

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  bgColor: string;
  accentColor: string;
  icon: string;
  textColor: string;
  ringtoneUrl: string;
}
