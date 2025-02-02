export type SocialProvider = "google" | "naver" | "kakao";

export interface User {
  id: number;
  name: string;
  nick_name: string;
  email: string;
  profile_image: string;
  provider: SocialProvider;
  provider_id: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  user: User;
}
