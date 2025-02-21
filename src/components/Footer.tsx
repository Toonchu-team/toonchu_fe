import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const official_email = "toonchu.official@gmail.com";
  const subject = "툰츄 문의하기";
  const body =
    "안녕하세요, 툰츄입니다. 문의사항을 남겨주시면 빠르게 답변드리겠습니다.";

  const mailtoLink = `mailto:${official_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <footer className="mt-40 flex h-fit min-h-96 w-full min-w-[320px] shrink-0 flex-col gap-4 bg-gradient-to-b from-white to-main-yellow px-mobile pb-20 text-sm text-main-text md:px-tablet md:text-base lg:px-52">
      <div className="mt-20 flex flex-col justify-between gap-4 md:flex-row">
        <div className="w-full md:w-2/3">
          <Image
            src="/images/logo/logo-eng.png"
            alt="툰츄 로고 이미지"
            width={150}
            height={56}
            className="mb-4"
          />
          <p>상호명 : 툰츄</p>
          <p>대표번호 : 010-7310-7587</p>
          <p>이메일 주소 : toonchu.official@gmail.com</p>
          <p>회사주소 : 대구광역시 달서구 당산로21안길 36-1 2층</p>
          <p>사업자 번호 : 229-76-00682</p>
          <p>등록(발행)일자 : 2025년 1월 20일</p>
          <p>대표자 : 김 규태</p>
          <p>개인정보관리책임자 : 김 규태</p>
          <p>호스팅제공자 : 네이버 클라우드 플랫폼</p>
        </div>
        <div className="mb-10 flex h-fit w-full flex-col items-start justify-center md:mb-0 md:w-fit md:items-center">
          <Link
            className="w-fit shrink-0 rounded-full bg-gradient-to-r from-bg-yellow-01 to-bg-grey-01 px-10 py-2 font-bold shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
            href="/login"
          >
            툰츄 회원가입
          </Link>
          <ul className="flex items-center gap-2 px-4 py-4">
            <li>
              <Link
                href="https://x.com/toonchuofficial"
                aria-label="툰츄 X 플랫폼 링크"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#6a6a6a"
                  className="hover:fill-black"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/toonchu_official/"
                aria-label="툰츄 인스타그램 플랫폼 링크"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="27"
                  height="27"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="#6a6a6a"
                  className="hover:fill-black"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://chzzk.naver.com/822381620fc9834c12b78efc2eb96042"
                aria-label="툰츄 치지직 플랫폼 링크"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#6a6a6a"
                  className="hover:fill-black"
                >
                  <path d="M391.2 103.5H352.5v109.7h38.6zM285 103H246.4V212.8H285zM120.8 0 24.3 91.4V420.6H140.1V512l96.5-91.4h77.3L487.7 256V0zM449.1 237.8l-77.2 73.1H294.6l-67.6 64v-64H140.1V36.6H449.1z" />
                </svg>
              </Link>
            </li>
            <li>
              <a
                href={mailtoLink}
                aria-label="툰츄 이메일 보내기 링크"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#6a6a6a"
                  className="hover:fill-black"
                >
                  <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative">
        <div className="w-full border-[1px] border-main-text"></div>
        <Image
          width={100}
          height={100}
          src="/images/logo/logo-full.png"
          alt="툰츄 캐릭터 이미지"
          className="absolute bottom-[-3px] right-4 md:right-10"
        />
      </div>
      <div className="flex w-full items-center justify-center">
        <Link
          className="text-nowrap border-r-[1px] border-main-text px-2 underline-offset-8 hover:text-black hover:underline sm:px-4"
          href="/privacy"
        >
          개인정보 처리방침
        </Link>
        <Link
          className="text-nowrap border-r-[1px] border-main-text px-2 underline-offset-8 hover:text-black hover:underline sm:px-4"
          href="/terms"
        >
          사이트 이용약관
        </Link>
        <Link
          className="text-nowrap px-2 underline-offset-8 hover:text-black hover:underline sm:px-4"
          href="https://form.typeform.com/to/ASObDg8w"
        >
          😺태그에게 피드백 보내기
        </Link>
      </div>
      <p className="w-full py-4 text-center text-xs text-main-text">
        © 2025 Toonchu. All rights reserved.
      </p>
    </footer>
  );
}
