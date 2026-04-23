import { ThemeConfig } from './types';

export const THEMES: Record<string, ThemeConfig> = {
  space: {
    id: 'space',
    name: 'Space Explorer',
    bgColor: 'bg-indigo-950',
    accentColor: 'bg-indigo-500',
    textColor: 'text-indigo-100',
    icon: 'Rocket',
    ringtoneUrl: 'https://cdn.pixabay.com/audio/2022/03/15/audio_731557996c.mp3', // Space-like
  },
  jungle: {
    id: 'jungle',
    name: 'Jungle Adventure',
    bgColor: 'bg-emerald-900',
    accentColor: 'bg-emerald-500',
    textColor: 'text-emerald-100',
    icon: 'Trees',
    ringtoneUrl: 'https://cdn.pixabay.com/audio/2022/01/18/audio_2267f5b351.mp3', // Jungle/Bird
  },
  underwater: {
    id: 'underwater',
    name: 'Ocean Deep',
    bgColor: 'bg-cyan-900',
    accentColor: 'bg-cyan-500',
    textColor: 'text-cyan-100',
    icon: 'Waves',
    ringtoneUrl: 'https://cdn.pixabay.com/audio/2021/08/04/audio_bbb97e7ee8.mp3', // Water/Bubbles
  },
  fairy: {
    id: 'fairy',
    name: 'Fairy Tale',
    bgColor: 'bg-pink-900',
    accentColor: 'bg-pink-500',
    textColor: 'text-pink-100',
    icon: 'Sparkles',
    ringtoneUrl: 'https://cdn.pixabay.com/audio/2022/03/24/audio_3d6a3627d3.mp3', // Magical/Chimes
  }
};

export const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
