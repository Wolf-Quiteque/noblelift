import { getEditableContent } from "@/lib/admin/read";
import SiteEditor from "@/components/admin/editors/SiteEditor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getEditableContent("site");
  return <SiteEditor data={data} />;
}
