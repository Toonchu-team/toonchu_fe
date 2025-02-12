import { breakpointDetect } from "@/lib/utils/breakpointDetect";
import MainClient from "./main/MainClient";

export default async function Main() {
  const initialBreakpoint = await breakpointDetect();

  return <MainClient initialBreakpoint={initialBreakpoint} />;
}
