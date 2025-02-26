export type SocialProvider = "google" | "naver" | "kakao";

export interface User {
  id: number;
  nick_name?: string;
  email: string;
  profile_image?: string;
  provider: SocialProvider;
  is_hidden?: boolean;
  is_staff?: boolean;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface UserData {
  user: User;
  access_token: string;
}
