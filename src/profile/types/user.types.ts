import { Prisma, User } from '@prisma/client';

export type SafeUser = Omit<User, 'password'>;

export const USER_SAFE_SELECT = {
  id: true,
  email: true,
  fullName: true,
  profilePicture: true,
  isBlocked: false,
  role: false,
  createdAt: true,
  updatedAt: true,
  bestResult: true,
  password: false,
} satisfies Prisma.UserSelect;

export const ADMIN_USER_SELECT = {
  id: true,
  email: true,
  fullName: true,
  profilePicture: true,
  isBlocked: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  bestResult: true,
  password: false,
} satisfies Prisma.UserSelect;
