export type SocialProvider = "google" | "naver" | "kakao";

export interface User {
  id: number;
  nick_name: string;
  email: string;
  profile_image?: string;
  provider: SocialProvider;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}
