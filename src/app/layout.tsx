import type { Metadata } from "next";
import "./globals.css";
import { Lemonada } from "next/font/google";
import localFont from "next/font/local";
import Nav from "@/components/nav/Nav";
import { userApi } from "@/lib/api/server/userApi";
import AppInitializer from "@/components/auth/AppInitializer";
import Footer from "@/components/Footer";

const nanumsquare = localFont({
  src: [
    {
      /* font-normal (일반 텍스트) */
      path: "../../public/fonts/NanumSquareNeo-bRg.ttf",
      weight: "400",
    },
    {
      /* font-bold (제목/강조) */
      path: "../../public/fonts/NanumSquareNeo-cBd.ttf",
      weight: "700",
    },
    {
      /* font-black */
      path: "../../public/fonts/NanumSquareNeo-eHv.ttf",
      weight: "900",
    },
  ],
  variable: "--font-nanumsquare",
});

const lemonada = Lemonada({
  subsets: ["latin"],
  variable: "--font-lemonada",
  weight: ["700"], // Toonchu 영어 로고
});

export const metadata: Metadata = {
  title: "Toonchu",
  description:
    "삼색고양이 '태그'가 좋아하는 웹툰츄르, 웹툰츄르를 추천해주는 무료웹툰추천사이트. 캐릭터, 장르,소재 등 다양한 분류의 태그로 작품들을 찾아줍니다.",
  icons: {
    icon: "/images/brand-character/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let userData = null;

  try {
    userData = await userApi.getLoginUser();
    console.log("user(layout.tsx): ", userData);
  } catch (error) {
    console.error("유저 정보 가져오기 실패:", error);
  }
  return (
    <html lang="en" className={`${nanumsquare.variable} ${lemonada.variable}`}>
      <body>
        <AppInitializer userData={userData}>
          <Nav />
          {children}
          <Footer />
        </AppInitializer>
      </body>
    </html>
  );
}
