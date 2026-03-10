import { IUser } from '@/repositories/types';
import db from '../database/db';

export function createUser(user: string, email: string, password: string) {
  const stmt = db.prepare(`
    INSERT INTO users (user, email, password)
    VALUES (?, ?, ?)
  `);

  return stmt.run(user, email, password);
}

export function findUserByEmail(email: string) {
  const stmt = db.prepare(`
    SELECT * FROM users WHERE email = ?
  `);

  return stmt.get(email) as IUser | undefined;
}

export function findUserByUser(user: string) {
  const stmt = db.prepare(`
    SELECT * FROM users WHERE user = ?
  `);

  return stmt.get(user) as IUser | undefined;
}
