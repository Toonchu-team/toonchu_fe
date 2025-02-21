"use client";

import { testATAPI } from "@/lib/actions/authActions";

export default function TestBtn({ oldAt }: { oldAt: string }) {
  const handleTest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("테스트 버튼 클릭");
    console.log("요청 전 Access Token:", oldAt);

    try {
      const response = await testATAPI();

      console.log("AT 재발급 성공 - TestButton:");
      console.log(response);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    } finally {
    }
  };
  return <button onClick={handleTest}>AT 재발급 테스트</button>;
}
