import { User } from 'src/generated/prisma/browser';
export type SafeUser = Omit<User, 'password'>;
export declare const USER_SAFE_SELECT: {
    id: true;
    email: true;
    fullName: true;
    profilePicture: true;
    isBlocked: false;
    role: false;
    createdAt: true;
    updatedAt: true;
    bestResult: true;
    password: false;
};
