"use server";

import { cookies } from "next/headers";

// 북마크 타입 정의
export interface Bookmark {
  id: number;
  user: number;
  webtoon: number;
  created: string;
}

export const bookmarkApi = {
  // 북마크 목록 조회
  getBookmarks: async (): Promise<Bookmark[]> => {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;

    if (!access_token) {
      throw new Error("로그인이 필요합니다.");
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("북마크 목록 조회에 실패했습니다.");
      }

      return await response.json();
    } catch (error) {
      console.error("북마크 목록 조회 오류:", error);
      throw error;
    }
  },

  // 북마크 추가/삭제 토글
  toggleBookmark: async (webtoonId: number): Promise<Bookmark> => {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;

    if (!access_token) {
      throw new Error("로그인이 필요합니다.");
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          webtoon: webtoonId,
        }),
      });

      if (!response.ok) {
        throw new Error("북마크 토글에 실패했습니다.");
      }

      return await response.json();
    } catch (error) {
      console.error("북마크 토글 오류:", error);
      throw error;
    }
  },
};