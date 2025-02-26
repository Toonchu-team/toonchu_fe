"use server";

import { bookmarkApi } from "@/lib/api/server/bookmarkApi";
import { revalidatePath } from "next/cache";

export async function getBookmarksAction() {
  try {
    const bookmarks = await bookmarkApi.getBookmarks();
    return bookmarks;
  } catch (error) {
    console.error("북마크 목록 조회 실패:", error);
    throw new Error("북마크 목록을 가져오는데 실패했습니다.");
  }
}

export async function toggleBookmarkAction(webtoonId: number) {
  try {
    const result = await bookmarkApi.toggleBookmark(webtoonId);
    // 북마크 상태가 변경에 따른 경로 재검증
    revalidatePath("/my-box");
    return result;
  } catch (error) {
    console.error("북마크 토글 실패:", error);
    throw new Error("북마크 추가/삭제에 실패했습니다.");
  }
}