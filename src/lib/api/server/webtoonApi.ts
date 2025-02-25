"use server";

import { WebtoonRegisterRequest } from "@/lib/types/webtoon";
import { cookies } from "next/headers";

const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
};

export async function registerWebtoon(data: WebtoonRegisterRequest) {

  const access_token = await getAccessToken();
  
  const formData = new FormData();
    
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'thumbnail') {
      formData.append('thumbnail', value);
    } else if (key === 'tags') {
      formData.append('tags', JSON.stringify(value));
    } else {
      formData.append(key, value.toString());
    }
  });

  console.log("webtoonApi.ts formData 요청 전", formData)

  try {
    const response = await fetch(`${process.env.SERVER_URL}/webtoons/request/`, {
      method: 'POST',
      credentials: "include",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    });

    console.log("webtoonApi.ts formData 백엔드 응답", response)

    if (!response.ok) {
      throw new Error(`웹툰 등록 실패 (Status: ${response.status})`);
    }

    return response.json();
  } catch (error) {
    console.error('웹툰 등록 에러:', error);
    throw error;
  }
}