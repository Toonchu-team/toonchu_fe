import NavClient from "./NavClient";
import { BreakpointType } from "@/stores/breakptStore";

export default async function Nav({
  initialBreakpoint,
}: {
  initialBreakpoint: BreakpointType;
}) {
  return <NavClient initialBreakpoint={initialBreakpoint} />;
}
