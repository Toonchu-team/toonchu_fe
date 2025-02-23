export type SocialProvider = "google" | "naver" | "kakao";

export interface User {
  id: number;
  email: string;
  nick_name: string;
  profile_image?: string;
  provider: SocialProvider;
  is_hidden?: boolean;
  is_created?: string;
  is_updated?: string;
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
