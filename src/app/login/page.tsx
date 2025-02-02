import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import NaverLoginButton from "@/components/auth/NaverLoginButton";

export default function Register() {
  return (
    <div className="w-full h-screen bg-slate-300">
      <h1>로그인/회원가입</h1>
      <GoogleLoginButton />
      <NaverLoginButton />
      <KakaoLoginButton />
    </div>
  );
}
