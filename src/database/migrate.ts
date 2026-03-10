import db from './db';

export function createTables() {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      change_pass INTEGER DEFAULT 0 
    )
  `,
  ).run();

  console.log('Tabela users criada/verificada');

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS mfa_challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      otp_hash INTEGER NOT NULL,
      expires_at INTEGER NOT NULL,
      used INTEGER DEFAULT 0 
    )
  `,
  ).run();

  console.log('Tabela mfa_challenges criada/verificada');
}
