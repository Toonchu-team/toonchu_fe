"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();
  const [number, setNumber] = useState(3);

  useEffect(() => {
    if (number > 0) {
      const timeoutId = setTimeout(() => {
        setNumber((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      router.push("/");
    }
  }, [router, number]);

  return (
    <div className="heightWithoutNav flex w-full flex-col items-center justify-start gap-4 text-main-text">
      <h2 className="page-title">찾을 수 없는 페이지</h2>
      <Image
        width={200}
        height={200}
        src="/images/brand-character/back.png"
        alt="툰츄 캐릭터 이미지"
        className=""
      />
      <div className="flex flex-col items-center font-semibold">
        <p>페이지를 찾을 수 없다냥! </p>
        <p>
          {number > 0 ? (
            <>
              <span className="text-main-red">{number}초 후</span>에 자동으로
              <span className="ml-2 text-main-red">메인 페이지</span>로 간다냥~
            </>
          ) : (
            "메인 페이지로 이동 중이라냥~"
          )}
        </p>
      </div>
    </div>
  );
}
