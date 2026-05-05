export const COLORS = {
  PURPLE: '#6D28D9',
  GOLD: '#F59E0B',
  PINK: '#FF1493',
  DARK: '#0F0F1E',
  DARKER: '#050508',
  WHITE: '#FFFFFF',
  WHITE_60: '#FFFFFF99',
  RED: '#EF4444',
};

export const EVENT_TYPES = {
  BIRTHDAY: 'birthday',
  ANNIVERSARY: 'anniversary',
  FRIENDS_NIGHT: 'friends_night',
  WILD_DATE: 'wild_date',
  FAMILY_KIDS: 'family_kids',
} as const;

export const eventTypeLabels: Record<string, string> = {
  [EVENT_TYPES.BIRTHDAY]: '🎂 יום הולדת',
  [EVENT_TYPES.ANNIVERSARY]: '💑 יום נישואים',
  [EVENT_TYPES.FRIENDS_NIGHT]: '👯 ערב חברים',
  [EVENT_TYPES.WILD_DATE]: '🔥 ערב פרוע',
  [EVENT_TYPES.FAMILY_KIDS]: '👨‍👩‍👧‍👦 משפחה וילדים',
};

export const GAME_MODES = {
  PHYSICAL: 'physical',
  VIRTUAL: 'virtual',
} as const;

export const TASK_CATEGORIES = {
  KIDS: 'kids',
  ADULT: 'adult',
} as const;

export const TASK_TYPES = {
  PHYSICAL: 'physical',
  VIRTUAL: 'virtual',
} as const;

export const TASK_VIBES = {
  FUNNY: 'funny',
  SEXY: 'sexy',
  QUIRKY: 'quirky',
  DARING: 'daring',
} as const;

export const HEBREW_TRANSLATIONS = {
  appName: 'VibeBox',
  tagline: 'מה שקורה ב-VibeBox נשאר ב-VibeBox',
  selectEvent: 'בחר את אירוע ה-Vibe שלך',
  selectYearOfBirth: 'כמה בן/בת אתה/את?',
  enterBirthYear: 'שנת לידה',
  confirm: 'אישור',
  cancel: 'ביטול',
  createRoom: '➕ יצור חדר',
  joinRoom: '👥 הצטרף לחדר',
  roomCode: 'קוד החדר',
  yourName: 'שמך',
  yourEmail: 'דוא"ל',
  startGame: 'התחל משחק',
  waiting: 'מחכה לשחקן הבא...',
  submit: 'הגש',
  next: 'הבא',
  skip: 'דלג',
  hallOfFame: 'הול של הגדולים',
  uploadPhoto: 'העלה תמונה',
  typeAnswer: 'הקלד תשובה...',
  underageMessage: '18+ רק בגרים',
  taskCompleted: 'משימה הושלמה!',
  congratulations: 'כל הכבוד!',
  gameOver: 'המשחק הסתיים',
  errorOccurred: 'שגיאה התרחשה',
  tryAgain: 'נסה שוב',
  invalid: 'לא חוקי',
};

export const calculateAge = (birthYear: number): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
};

export const isAdult = (age: number): boolean => age >= 18;

export const generateRoomCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('he-IL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
