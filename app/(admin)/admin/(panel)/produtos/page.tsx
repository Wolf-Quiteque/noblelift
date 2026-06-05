import { getEditableContent } from "@/lib/admin/read";
import ProductsEditor from "@/components/admin/editors/ProductsEditor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getEditableContent("products");
  return <ProductsEditor data={data} />;
}
