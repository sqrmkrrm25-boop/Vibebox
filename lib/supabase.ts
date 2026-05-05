import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Some features may not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Profile {
  id: string;
  email: string;
  name: string;
  birth_year: number;
  created_at: string;
}

export interface Room {
  id: string;
  code: string;
  host_id: string;
  mode: 'physical' | 'virtual';
  event_type: string;
  current_turn: number;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  room_id: string;
  email: string;
  name: string;
  joined_at: string;
}

export interface GameLog {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  task_id: string;
  created_at: string;
}

export interface TaskBank {
  id: string;
  instruction: string;
  category: 'kids' | 'adult';
  type: 'physical' | 'virtual';
  vibe: 'funny' | 'sexy' | 'quirky' | 'daring';
  created_at: string;
}

// Profile Functions
export const createProfile = async (email: string, name: string, birthYear: number): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ email, name, birth_year: birthYear }])
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    return null;
  }
  return data as Profile;
};

export const getProfile = async (email: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  return data as Profile;
};

// Room Functions
export const createRoom = async (
  hostId: string,
  mode: 'physical' | 'virtual',
  eventType: string,
  code: string
): Promise<Room | null> => {
  const { data, error } = await supabase
    .from('rooms')
    .insert([{ host_id: hostId, mode, event_type: eventType, code, current_turn: 0 }])
    .select()
    .single();

  if (error) {
    console.error('Error creating room:', error);
    return null;
  }
  return data as Room;
};

export const getRoom = async (roomCode: string): Promise<Room | null> => {
  const { data, error } = await supabase
    .from('rooms')
    .select()
    .eq('code', roomCode)
    .single();

  if (error) {
    console.error('Error fetching room:', error);
    return null;
  }
  return data as Room;
};

export const updateRoomTurn = async (roomId: string, turn: number): Promise<boolean> => {
  const { error } = await supabase
    .from('rooms')
    .update({ current_turn: turn, updated_at: new Date().toISOString() })
    .eq('id', roomId);

  if (error) {
    console.error('Error updating room turn:', error);
    return false;
  }
  return true;
};

// Guest Functions
export const addGuest = async (roomId: string, email: string, name: string): Promise<Guest | null> => {
  const { data, error } = await supabase
    .from('guests')
    .insert([{ room_id: roomId, email, name }])
    .select()
    .single();

  if (error) {
    console.error('Error adding guest:', error);
    return null;
  }
  return data as Guest;
};

export const getRoomGuests = async (roomId: string): Promise<Guest[]> => {
  const { data, error } = await supabase
    .from('guests')
    .select()
    .eq('room_id', roomId);

  if (error) {
    console.error('Error fetching guests:', error);
    return [];
  }
  return data as Guest[];
};

// Game Log Functions
export const logGameContent = async (
  roomId: string,
  userId: string,
  content: string,
  taskId: string
): Promise<GameLog | null> => {
  const { data, error } = await supabase
    .from('game_logs')
    .insert([{ room_id: roomId, user_id: userId, content, task_id: taskId }])
    .select()
    .single();

  if (error) {
    console.error('Error logging game content:', error);
    return null;
  }
  return data as GameLog;
};

export const getGameLogs = async (roomId: string): Promise<GameLog[]> => {
  const { data, error } = await supabase
    .from('game_logs')
    .select()
    .eq('room_id', roomId);

  if (error) {
    console.error('Error fetching game logs:', error);
    return [];
  }
  return data as GameLog[];
};

// Task Bank Functions
export const getTasks = async (
  category: 'kids' | 'adult',
  type: 'physical' | 'virtual'
): Promise<TaskBank[]> => {
  const { data, error } = await supabase
    .from('task_bank')
    .select()
    .eq('category', category)
    .eq('type', type);

  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
  return data as TaskBank[];
};

export const getRandomTask = async (
  category: 'kids' | 'adult',
  type: 'physical' | 'virtual'
): Promise<TaskBank | null> => {
  const tasks = await getTasks(category, type);
  if (tasks.length === 0) return null;
  return tasks[Math.floor(Math.random() * tasks.length)];
};

// Realtime Subscriptions
export const subscribeToRoom = (roomId: string, callback: (room: Room) => void) => {
  const subscription = supabase
    .from(`rooms:id=eq.${roomId}`)
    .on('*', (payload) => {
      if (payload.new) {
        callback(payload.new as Room);
      }
    })
    .subscribe();

  return subscription;
};

export const subscribeToGuests = (roomId: string, callback: (guests: Guest[]) => void) => {
  const subscription = supabase
    .from(`guests:room_id=eq.${roomId}`)
    .on('*', async () => {
      const guests = await getRoomGuests(roomId);
      callback(guests);
    })
    .subscribe();

  return subscription;
};

// Storage Functions
export const uploadImage = async (roomId: string, file: File): Promise<string | null> => {
  const fileName = `${roomId}/${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from('game_uploads').upload(fileName, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data } = supabase.storage.from('game_uploads').getPublicUrl(fileName);
  return data?.publicUrl || null;
};
