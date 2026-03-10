import db from '../database/db';
import { IOtp } from './types';

export function newCode(user_id: number, code: number) {
  const stmt = db.prepare(`
    INSERT INTO mfa_challenges (user_id, otp_hash, expires_at)
    VALUES (?, ?, strftime('%s','now') + 600)
  `);

  return stmt.run(user_id, code);
}

export function disableCode(user_id: number) {
  const stmt = db.prepare(`
    UPDATE mfa_challenges SET used = 1
    WHERE user_id = ?
  `);

  return stmt.run(user_id);
}

export function getCodeByUserId(user_id: number) {
  const stmt = db.prepare(`
    SELECT otp_hash FROM mfa_challenges
    WHERE user_id = ?
    AND used != 1
    AND expires_at < strftime('%s','now')
    ORDER BY id DESC
    LIMIT 1;
  `);

  return stmt.get(user_id) as IOtp;
}
