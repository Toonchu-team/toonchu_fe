// "use client";

// import useResponsive from "@/hooks/useResponsive";
// import DesktopNav from "./views/DesktopNav";
// import MobileTabletNav from "./views/MobileTabletNav";
// import { useEffect, useState } from "react";

// // export default function Nav() {
// //   const { isDesktop } = useResponsive();

// //   return <>{isDesktop ? <DesktopNav /> : <MobileTabletNav />}</>;
// // }

// export default function Nav() {
//   const [isMobile, setIsMobile] = useState(false);
//   const { isDesktop } = useResponsive();

//   useEffect(() => {
//     setIsMobile(!isDesktop);
//   }, [isDesktop]);

//   return isMobile ? <MobileTabletNav /> : <DesktopNav />;
// }

"use client";

import dynamic from "next/dynamic";
import useResponsive from "@/hooks/useResponsive";

const DynamicMobileTabletNav = dynamic(
  () => import("./views/MobileTabletNav"),
  {
    ssr: false,
  },
);
const DynamicDesktopNav = dynamic(() => import("./views/DesktopNav"), {
  ssr: false,
});

export default function Nav() {
  const { isDesktop } = useResponsive();

  return isDesktop ? <DynamicDesktopNav /> : <DynamicMobileTabletNav />;
}
