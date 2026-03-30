import * as path from 'path';

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export const AVATARS_DIR = path.join(process.cwd(), 'uploads', 'avatars');

export const AVATARS_URL_PREFIX = '/uploads/avatars';

export function resolveAvatarPath(urlPath: string): string {
  const relative = urlPath.replace(/^\//, '');
  return path.join(process.cwd(), relative);
}
