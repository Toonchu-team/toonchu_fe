import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "도커-이미지-저장소-도메인", // 백엔드 피드백 대기중
        pathname: "/**", // 추후 도커 접근 URL 확정 후 패턴 내로잉 필요 ("/images/**")
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // mock 데이터용 이미지 플레이스홀더
      },
    ],
  },
};

export default nextConfig;
