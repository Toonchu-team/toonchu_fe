"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useProfileStore from "@/stores/profileStore";
import { Info, PlusIcon } from "lucide-react";
import { User } from "@/lib/types/auth";
import { profileUpdateAction } from "@/lib/actions/authActions";

export default function ProfileEdit({ user }: { user: User }) {
  const setIsEditing = useProfileStore((state) => state.setIsEditing);
  const [previewImage, setPreviewImage] = useState("");
  const [newNickName, setNewNickName] = useState(user.nick_name || "");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const router = useRouter();

  const profileImage =
    previewImage ||
    user?.profile_image ||
    "/images/brand-character/default-profile.png";

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleGoHome = () => {
    router.push("/");
    setIsEditing(false);
  };

  const handleSave = async () => {
    const nickNameToUpdate =
      newNickName !== user.nick_name ? newNickName : user.nick_name;

    try {
      // API 요청 보내기
      await profileUpdateAction(nickNameToUpdate, selectedImageFile);
      // 성공 처리
      console.log("프로필 업데이트 성공!");
      setIsEditing(false);
    } catch (error) {
      // 실패 처리
      console.error("프로필 업데이트 실패:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickName(e.target.value);
  };

  return (
    <>
      <h2 className="page-title">내 프로필 변경</h2>
      <section className="group relative">
        <Image
          className="h-[130px] w-[130px] overflow-hidden rounded-full shadow-md"
          src={profileImage}
          alt="프로필 이미지"
          width={130}
          height={130}
        />
        <label
          htmlFor="profile-image"
          className="absolute bottom-0 right-0 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-main-text bg-white group-hover:bg-bg-yellow-01"
        >
          <PlusIcon size={24} />
        </label>
        <input
          id="profile-image"
          type="file"
          accept="image/*"
          aria-label="프로필 이미지 업로드"
          className="absolute inset-0 h-full w-full cursor-pointer overflow-hidden opacity-0"
          onChange={handleImageChange}
        />
      </section>
      <section className="flex flex-col items-center">
        <div className="w-full">
          <p className="font-bold">새 닉네임</p>
          <p className="text-xs font-bold">
            닉네임은 최대 16자까지 입력할 수 있어요.
          </p>

          <input
            type="text"
            maxLength={16}
            placeholder={user.nick_name}
            className="my-2 w-60 rounded-md border-2 border-main-text py-2 pl-2 pr-8 hover:border-main-yellow focus:border-main-yellow focus:outline-main-yellow"
            value={newNickName} // 현재 닉네임 값을 표시
            onChange={handleNickNameChange} // 닉네임 변경 이벤트 핸들러
          />
          <p className="flex w-full items-center gap-1 text-main-red">
            <Info size={14} />
            <span className="text-xs font-bold">
              닉네임은 최대 16자까지 입력할 수 있어요.
            </span>
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-1 bg-white">
        <button
          className="w-60 rounded-md bg-bg-grey-01 py-2 text-sm font-bold hover:bg-bg-yellow-01/60"
          onClick={handleSave}
        >
          변경한 내용 저장하기
        </button>
        <button
          className="w-60 rounded-md bg-bg-grey-01 py-2 text-sm font-bold hover:bg-bg-yellow-01/60"
          onClick={handleCancel}
        >
          취소하기
        </button>
        <hr className="w-60" />
        <button
          className="w-60 rounded-md bg-main-grey py-2 text-sm font-bold text-white hover:bg-bg-red-01 hover:text-black"
          onClick={handleGoHome}
        >
          홈으로
        </button>
      </section>
    </>
  );
}
