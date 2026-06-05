import { getEditableContent } from "@/lib/admin/read";
import HomeEditor from "@/components/admin/editors/HomeEditor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getEditableContent("home");
  return <HomeEditor data={data} />;
}
