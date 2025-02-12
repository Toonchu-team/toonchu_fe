import { breakpointDetect } from "@/lib/utils/breakpointDetect";
import NavClient from "./NavClient";
import { userApi } from "@/lib/api/server/userApi";

export default async function Nav() {
  const initialBreakpoint = await breakpointDetect();
  const user = (await userApi.getLoginUser()) || null;

  return <NavClient initialBreakpoint={initialBreakpoint} user={user} />;
}
