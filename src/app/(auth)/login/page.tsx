import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import NaverLoginButton from "@/components/auth/NaverLoginButton";
import Image from "next/image";

export default function Register() {
  return (
    <div className="flex flex-col items-center pb-10 text-main-text">
      <h1 className="page-title">로그인/회원가입</h1>
      <Image
        alt="환영하는 캐릭터 '태그' 이미지"
        width={200}
        height={200}
        src="/images/brand-character/greet.png"
        priority
        className="my-5"
      />

      <div className="relative h-10 w-60 animate-bounce">
        <Image
          alt="나랑 같이 인생웹툰 찾으러가자옹!"
          width={240}
          height={40}
          src="/images/login-msg-frame.png"
          className=""
        />
        <p className="absolute left-5 top-[6px] text-sm font-semibold">
          나랑 같이 인생웹툰 찾으러가자옹!
        </p>
      </div>
      <section className="flex w-full flex-col items-center gap-3">
        <NaverLoginButton />
        <GoogleLoginButton />
        <KakaoLoginButton />
      </section>
    </div>
  );
}
