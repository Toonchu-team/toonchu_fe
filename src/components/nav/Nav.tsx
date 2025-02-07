import { breakpointDetect } from "@/lib/utils/breakpointDetect";
import NavClient from "./NavClient";

export default async function Nav() {
  const initialBreakpoint = await breakpointDetect();

  return <NavClient initialBreakpoint={initialBreakpoint} />;
}
