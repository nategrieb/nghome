export type SessionUser = {
  name: string;
  email?: string;
};

export type Session = {
  user: SessionUser;
  createdAt: string;
};
