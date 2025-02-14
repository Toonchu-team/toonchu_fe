import { breakpointDetect } from "@/lib/utils/breakpointDetect";
import DaySearchClient from "./DaySearchClient";

export default async function daySearch() {
  const initialBreakpoint = await breakpointDetect();

  return <DaySearchClient initialBreakpoint={initialBreakpoint} />;
}
