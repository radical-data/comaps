import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

class DBAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DBAuthError";
  }
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new DBAuthError('Missing credentials');

export const supabase = createClient<Database>(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');
