"use client";

import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Error() {
  return (
    <div className="heightWithoutNav flex w-full flex-col items-center justify-start gap-4 text-main-text">
      <h2 className="page-title">오류 페이지</h2>
      <Image
        width={200}
        height={200}
        src="/images/brand-character/back.png"
        alt="툰츄 캐릭터 이미지"
        className=""
      />
      <div className="flex flex-col items-center gap-4 font-semibold">
        <Link
          href="https://form.typeform.com/to/ASObDg8w"
          type="submit"
          className="flex w-60 items-center justify-center rounded-md bg-bg-grey-01 py-2 text-sm font-bold hover:bg-bg-yellow-01/60"
        >
          😺태그에게 문제 알려주기
        </Link>
        <div className="flex min-w-60 flex-col items-center justify-center text-wrap px-10 text-center">
          <div className="flex flex-col gap-0 sm:flex-row sm:gap-1">
            <p>페이지를 표시하는 중에 </p>
            <p>예상치 못한 문제가 발생했다냥! </p>
          </div>
          <div className="flex flex-col gap-0 sm:flex-row sm:gap-1">
            <p>내게 문제를 알려주면 </p>
            <p>빠른 시일내에 고치겠다냥! </p>
          </div>
        </div>

        <Link
          href="/"
          aria-label="홈으로 이동"
          className="group mt-10 flex items-center gap-2 border-b-[1px] border-transparent pb-1 text-center font-bold hover:border-black hover:text-black"
        >
          <HomeIcon
            size={20}
            className="text-main-text group-hover:text-black"
          />
          <p>메인 페이지로 돌아가기</p>
        </Link>
      </div>
    </div>
  );
}
