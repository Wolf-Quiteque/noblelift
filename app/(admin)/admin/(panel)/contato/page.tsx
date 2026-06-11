import { getEditableContent } from "@/lib/admin/read";
import ContactEditor from "@/components/admin/editors/ContactEditor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getEditableContent("contact");
  return <ContactEditor data={data} />;
}
