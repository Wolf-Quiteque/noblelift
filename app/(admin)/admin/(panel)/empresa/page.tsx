import { getEditableContent } from "@/lib/admin/read";
import AboutEditor from "@/components/admin/editors/AboutEditor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getEditableContent("about");
  return <AboutEditor data={data} />;
}
