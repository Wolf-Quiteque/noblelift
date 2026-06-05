import { getEditableContent } from "@/lib/admin/read";
import GalleryEditor from "@/components/admin/editors/GalleryEditor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getEditableContent("gallery");
  return <GalleryEditor data={data} />;
}
