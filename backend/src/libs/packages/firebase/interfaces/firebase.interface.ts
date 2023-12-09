import { type DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

interface IFirebase {
  verifyToken(token: string): Promise<DecodedIdToken | null>;
}

export { type IFirebase };