import useBreakpoint from "@/hooks/useBreakpoint";
import { BreakpointType } from "@/stores/breakptStore";
import MainMobile from "./main/MainMobile";
import MainDesktop from "./main/MainDesktop";

export default function Main({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  const breakpoint = useBreakpoint(initialBreakpoint);

  return breakpoint == "mobile" ? (
    <MainMobile initialBreakpoint={initialBreakpoint} />
  ) : (
    <MainDesktop initialBreakpoint={initialBreakpoint} />
  );
}
