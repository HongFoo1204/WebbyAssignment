export type UserLoginInput = {
  user_mobile: string;
  password: string;
};

export type UserRegisterInput = {
  user_fullname: string;
  user_email: string;
  user_mobile: string;
  password: string;
};

export type User = {
  user_id: string;
  user_fullname: string;
};

export type AuthContext = {
  user: User | null;
  errorMessage: string | null;
  register: (values: UserRegisterInput) => Promise<void>;
  login: (values: UserLoginInput) => Promise<void>;
  logout: () => Promise<void>;
};

export type Blog = {
  blog_id: number;
  blog_description: string;
  blog_title: string;
  blog_media: unknown | null;
};
