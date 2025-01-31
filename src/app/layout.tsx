import type { Metadata } from "next";
import { Lemonada } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/common/Nav";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nanumsquare.variable} ${lemonada.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
