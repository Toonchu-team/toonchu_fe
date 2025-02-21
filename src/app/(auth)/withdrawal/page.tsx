"use client";

import Link from "next/link";

import useAuthStore from "@/stores/authStore";
import { CheckCircleIcon, Info, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ModalContainer from "@/components/common/modal/ModalContainer";
import ModalTitle from "@/components/common/modal/items/ModalTitle";
import ModalContent from "@/components/common/modal/items/ModalContent";
import { withdrawalAction } from "@/lib/actions/authActions";

export default function Withdrawal() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userNickName = user?.nick_name ?? "";

  useEffect(() => {
    if (user) {
      setIsConfirmed(inputValue === userNickName);
    }
  }, [inputValue, userNickName, user]);

  const handleWithdrawal = () => {
    if (isConfirmed) {
      setIsModalOpen(true);
    } else {
      inputRef.current?.focus();
    }
  };

  const handleConfirmWithdrawal = async () => {
    try {
      await withdrawalAction(userNickName);
      window.location.href = "/";
      logout();
      console.log("zustand 유저 상태 : ", user);
      router.push("/");
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  return (
    <>
      <main className="mx-auto flex flex-col items-center justify-start gap-5 py-8 text-main-text">
        <h2 className="text-2xl font-bold">회원 탈퇴</h2>
        <Image
          src="/images/brand-character/withdrawal.png"
          alt="고양이 태그가 우는 이미지"
          width={120}
          height={120}
        />
        {/* 반응형 구현 방식 확정 후 작업 예정*/}
        <section className="flex w-[280px] flex-col gap-1 bg-white font-bold">
          <p>
            {user?.nick_name}아,
            <br />
            진짜 진짜 탈퇴할거냥...?
          </p>
          <p>
            그럼 <span className="text-main-red">찜 목록</span>이 전부 사라져
            버린다냥...
            <br />
            지금까지 함께 모은{" "}
            <span className="text-main-red"> 소중한 기억</span>
            들이 <br />다 없어져버릴거라 걱정된다냥...
          </p>
          <p>
            정말 탈퇴할꺼라면, <br />
            마지막으로 네 닉네임을 입력해달라냥..
          </p>
          <section className="relative flex w-full flex-col gap-2">
            <input
              type="text"
              maxLength={16}
              placeholder={user?.nick_name}
              className={`mt-2 w-full rounded-md border-2 border-main-text py-2 pl-2 pr-8 ${isConfirmed ? "focus:outline-green-600" : "focus:outline-main-red"}`}
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
            />
            <p className="absolute right-4 top-[22px]">
              {inputValue !== "" &&
                (inputValue === userNickName ? (
                  <CheckCircleIcon size={16} className="text-green-600" />
                ) : (
                  <XCircleIcon size={16} className="text-red-600" />
                ))}
            </p>
            <p className="flex items-start gap-1 text-main-grey">
              <Info size={14} className="flex-shrink-0" />
              <span className="text-xs font-bold">
                계정 탈퇴 후 50일 동안 계정이 임시 보관되며, 이 기간 동안 로그인
                시 탈퇴가 취소됩니다. 50일 이후에는 영구 삭제되어 복구가
                불가능합니다.
              </span>
            </p>
            <Link
              href="/"
              className="flex w-full justify-center rounded-md bg-bg-yellow-01 py-2 text-sm font-bold"
            >
              돌아가기
            </Link>
            <button
              className="w-full rounded-md bg-bg-grey-01 py-2 text-sm font-bold hover:bg-bg-red-01 hover:text-black"
              onClick={handleWithdrawal}
            >
              회원 영구 탈퇴 하기
            </button>
          </section>
        </section>
      </main>
      <ModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalTitle>회원 탈퇴</ModalTitle>
        <ModalContent>
          <p>{userNickName}아..</p>
          <p>이제 정말 마지막이다냥..</p>
          <p>
            정말로 <span className="text-main-red">탈퇴</span>할꺼냥...?
          </p>
        </ModalContent>
        <div className="flex w-full justify-between">
          <button
            className="w-1/2 bg-bg-yellow-01 py-4 hover:text-black"
            onClick={() => router.push("/")}
          >
            아니! 취소할께!
          </button>
          <button
            className="w-1/2 bg-gray-200 py-4 hover:text-black"
            onClick={handleConfirmWithdrawal}
          >
            응, 탈퇴할께..
          </button>
        </div>
      </ModalContainer>
    </>
  );
}
