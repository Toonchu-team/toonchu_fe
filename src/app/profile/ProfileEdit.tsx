"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useProfileStore from "@/stores/profileStore";
import { PlusIcon } from "lucide-react";
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
    (user?.profile_image !== ""
      ? user?.profile_image
      : "/images/brand-character/default-profile.png") ||
    "/images/brand-character/default-profile.png";

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleGoHome = () => {
    router.push("/");
    setIsEditing(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const nickNameToUpdate = newNickName === "" ? user.nick_name : newNickName;

    try {
      await profileUpdateAction(nickNameToUpdate, selectedImageFile);
      console.log("프로필 업데이트 성공!");
      setIsEditing(false);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      setSelectedImageFile(null);
      setPreviewImage("");
      return;
    }

    setSelectedImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickName(e.target.value);
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col items-center gap-4">
      <h2 className="page-title">내 프로필 변경</h2>

      <fieldset className="group relative">
        <legend className="sr-only">프로필 이미지 변경</legend>
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
      </fieldset>
      <p className="text-xs font-bold">
        이미지 크기는 <span className="text-main-red">5MB</span>를 초과할 수
        없어요.
      </p>
      <fieldset className="flex w-full flex-col items-center">
        <legend className="sr-only">닉네임 변경</legend>
        <div className="w-full">
          <p className="font-bold">새 닉네임</p>
          <p className="text-xs font-bold">
            닉네임은 <span className="text-main-red">최대 16자</span>까지 입력할
            수 있어요.
          </p>
          <input
            type="text"
            maxLength={16}
            placeholder={user.nick_name}
            className="my-2 w-60 rounded-md border-2 border-main-text py-2 pl-2 pr-8 hover:border-main-yellow focus:border-main-yellow focus:outline-main-yellow"
            value={newNickName}
            onChange={handleNickNameChange}
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-1 bg-white">
        <button
          type="submit"
          className="w-60 rounded-md bg-bg-grey-01 py-2 text-sm font-bold hover:bg-bg-yellow-01/60"
        >
          변경한 내용 저장하기
        </button>
        <button
          type="button"
          className="w-60 rounded-md bg-bg-grey-01 py-2 text-sm font-bold hover:bg-bg-yellow-01/60"
          onClick={handleCancel}
        >
          취소하기
        </button>
        <hr className="w-60" />
        <button
          type="button"
          className="w-60 rounded-md bg-main-grey py-2 text-sm font-bold text-white hover:bg-bg-red-01 hover:text-black"
          onClick={handleGoHome}
        >
          홈으로
        </button>
      </div>
    </form>
  );
}
