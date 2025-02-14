import { breakpointDetect } from "@/lib/utils/breakpointDetect";
import TagSearchClient from "./TagSearchClient";

export default async function tagSearch() {
  const initialBreakpoint = await breakpointDetect();

  return <TagSearchClient initialBreakpoint={initialBreakpoint} />;
}
