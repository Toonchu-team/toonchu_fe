import { breakpointDetect } from "@/lib/utils/breakpointDetect";
import TagSearchClient from "./TagSearchClient";

export default async function Main() {
  const initialBreakpoint = await breakpointDetect();

  return <TagSearchClient initialBreakpoint={initialBreakpoint} />;
}
