export const getGoogleLoginUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    `${window.location.origin}/api/auth/google/callback`,
  );
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
};

export const getKakaoLoginUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    `${window.location.origin}/api/auth/kakao/callback`,
  );
  return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
};

export const getNaverLoginUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    `${window.location.origin}/api/auth/naver/callback`,
  );
  return `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
};
