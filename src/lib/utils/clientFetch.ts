import { redirect } from "next/navigation";

export async function clientFetch<T>(
  apiRoute: string,
  options = {},
): Promise<T> {
  try {
    const response = await fetch(apiRoute, options);

    if (response.status === 401) {
      // AT 만료 시 리다이렉트
      redirect("/login");
    }

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("API request error:", error);
    throw error;
  }
}
