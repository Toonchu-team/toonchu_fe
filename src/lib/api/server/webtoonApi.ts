"use server";

import { WebtoonRegisterRequest } from "@/lib/types/webtoon";
import { cookies } from "next/headers";

export async function registerWebtoon(data: WebtoonRegisterRequest) {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;
    
    if (!access_token) {
      throw new Error("작품 등록에 접근할 수 없습니다. 다시 로그인 해 주세요.");
    }
    
    console.log("액세스 토큰 확인:", access_token.substring(0, 10) + "...");
    
    const formData = new FormData();
    
    // 필수 필드 추가
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('thumbnail', data.thumbnail);
    formData.append('webtoon_url', data.webtoon_url);
    formData.append('publication_day', data.publication_day);
    formData.append('platform', data.platform);
    formData.append('serialization_cycle', data.serialization_cycle);
    
    // serial_day 배열 처리
    data.serial_day.forEach((day) => {
      formData.append('serial_day', day);
    });
    
    // 선택적 필드 추가
    if (data.is_new !== undefined) {
      formData.append('is_new', String(data.is_new));
    }
    
    if (data.is_completed !== undefined) {
      formData.append('is_completed', String(data.is_completed));
    }
    
    // is_approved는 항상 'pending'
    formData.append('is_approved', 'pending');
    
    // tags 배열 - JSON 문자열로 변환
    formData.append('tags', JSON.stringify(data.tags));

    console.log("webtoonApi.ts formData 요청 전");

    const apiUrl = process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;
    if (!apiUrl) {
      throw new Error("서버 URL이 설정되지 않았습니다.");
    }

    const response = await fetch(`${apiUrl}/webtoons/request/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    });

    console.log("webtoonApi.ts 백엔드 응답 상태코드:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("서버 오류 응답:", errorText);
      throw new Error(`웹툰 등록 실패 (Status: ${response.status})`);
    }

    return response.json();
  } catch (error) {
    console.error('웹툰 등록 에러:', error);
    throw error;
  }
}