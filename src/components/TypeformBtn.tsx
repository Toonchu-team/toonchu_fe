import Image from "next/image";
import Link from "next/link";

export default function TypeformBtn() {
  return (
    <Link
      href="#"
      aria-label="불편사항 제보 링크"
      className="absolute bottom-0 right-0 h-60 w-60 rounded-full shadow-md"
    >
      <Image
        width={60}
        height={60}
        src="/images/brand-character/paw.png"
        alt="불편사항 제보 링크 - 고양이 발바닥 이미지"
      />
    </Link>
  );
}
