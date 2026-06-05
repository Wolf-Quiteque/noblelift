"use client";

import { FormProvider } from "react-hook-form";
import {
  useContentForm,
  EditorHeader,
  SaveBar,
  Section,
  Grid,
  TextField,
  TextAreaField,
  ImageField,
  Repeater,
} from "@/components/admin/form";
import type { ProductCategory } from "@/lib/types";

type FormShape = { items: ProductCategory[] };
const ICON_HINT = "Ícone Font Awesome, ex.: fas fa-dolly";

export default function ProductsEditor({ data }: { data: ProductCategory[] }) {
  const { form, submit, saving, dirty } = useContentForm<FormShape>(
    "products",
    { items: data },
    (v) => v.items
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <EditorHeader
          title="Produtos"
          subtitle="Categorias de produtos. Arraste para reordenar; cada categoria tem as suas fichas."
        />

        <Section title="Categorias">
          <Repeater
            name="items"
            itemLabel="Categoria"
            newItem={{
              id: "nova-categoria",
              indexLabel: "",
              icon: "fas fa-box",
              caption: "",
              navTitle: "",
              title: "",
              description: "",
              cards: [],
            }}
          >
            {(i) => (
              <div className="space-y-3">
                <Grid>
                  <TextField name={`items.${i}.title`} label="Título" />
                  <TextField name={`items.${i}.navTitle`} label="Título curto (menu/barra)" />
                </Grid>
                <Grid cols={3}>
                  <TextField name={`items.${i}.id`} label="ID / âncora" placeholder="empilhadeiras" />
                  <TextField name={`items.${i}.icon`} label="Ícone" placeholder={ICON_HINT} />
                  <TextField name={`items.${i}.caption`} label="Legenda (barra)" />
                </Grid>
                <TextField name={`items.${i}.indexLabel`} label="Etiqueta de índice" placeholder="Categoria 1 de 5" />
                <TextAreaField name={`items.${i}.description`} label="Descrição" rows={3} />
                <div className="rounded-lg border border-gray-200 bg-white p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Fichas de produto
                  </p>
                  <Repeater
                    name={`items.${i}.cards`}
                    itemLabel="Ficha"
                    newItem={{ image: "", imageAlt: "", title: "", description: "" }}
                  >
                    {(j) => (
                      <div className="space-y-3">
                        <ImageField name={`items.${i}.cards.${j}.image`} label="Imagem" prefix="products" />
                        <Grid>
                          <TextField name={`items.${i}.cards.${j}.title`} label="Título" />
                          <TextField name={`items.${i}.cards.${j}.imageAlt`} label="Texto alternativo" />
                        </Grid>
                        <TextAreaField name={`items.${i}.cards.${j}.description`} label="Descrição" rows={2} />
                      </div>
                    )}
                  </Repeater>
                </div>
              </div>
            )}
          </Repeater>
        </Section>

        <SaveBar saving={saving} dirty={dirty} previewHref="/produtos" />
      </form>
    </FormProvider>
  );
}
