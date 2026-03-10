export interface IUser {
  id: number;
  user: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  change_pass: number;
}

export interface IOtp {
  otp_hash: number | undefined;
}
