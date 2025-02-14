import { breakpointDetect } from "@/lib/utils/breakpointDetect";
import GlobalSearchClient from "./GlobalSearchClient";

export default async function globalSearch() {
  const initialBreakpoint = await breakpointDetect();

  return <GlobalSearchClient initialBreakpoint={initialBreakpoint} />;
}
