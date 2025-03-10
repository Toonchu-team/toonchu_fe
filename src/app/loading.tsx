import Image from "next/image";

export default function Loading() {
  return (
    <div className="heightWithoutNav flex w-full flex-col items-center justify-start gap-4 text-main-text">
      <h2 className="page-title">로딩 중</h2>
      <Image
        width={200}
        height={200}
        src="/images/brand-character/pending.png"
        alt="툰츄 캐릭터 이미지"
        className=""
      />
      <div className="flex h-10 w-[200px] min-w-60 items-center overflow-hidden rounded-full border-2 border-main-text bg-white px-2">
        <div className="animation-loading-bar h-5 rounded-full bg-gradient-to-r from-main-yellow via-main-pink to-main-grey"></div>
      </div>
      <p className="text-sm font-bold">LOADING...</p>
    </div>
  );
}
