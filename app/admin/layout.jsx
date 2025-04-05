import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  if (!token) {
    redirect("/login");
  }

  return <>{children}</>;
}
