import { headers } from "next/headers";

// 서버 사이드 (최초 렌더링)
export const breakpointDetect = async () => {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent")?.toLowerCase() ?? "";

    const mobileRegex =
      /iphone|ipod|android.*mobile|windows.*phone|blackberry|bb10|webos|mobile|safari.*mobile/i;
    const tabletRegex =
      /ipad|android(?!.*mobile)|tablet|kindle|playbook|silk|puffin(?!.*(ip|ap|wp))/i;

    if (mobileRegex.test(userAgent)) {
      return "mobile";
    }

    if (tabletRegex.test(userAgent)) {
      return "tablet";
    }

    return "desktop";
  } catch (error) {
    console.error("디바이스 감지 실패 :", error);
    return "mobile";
  }
};
