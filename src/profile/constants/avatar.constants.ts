import * as path from 'path';

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export const AVATARS_DIR = path.join(process.cwd(), 'uploads', 'avatars');
