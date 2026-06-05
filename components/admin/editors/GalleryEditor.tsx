"use client";

import { FormProvider } from "react-hook-form";
import {
  useContentForm,
  EditorHeader,
  SaveBar,
  Section,
  Grid,
  TextField,
  ImageField,
  SelectField,
  Repeater,
} from "@/components/admin/form";
import type { GalleryImage } from "@/lib/types";

type GalleryItemForm = { src: string; alt: string; caption: string; size: "" | "wide" | "tall" };
type FormShape = { items: GalleryItemForm[] };

export default function GalleryEditor({ data }: { data: GalleryImage[] }) {
  const { form, submit, saving, dirty } = useContentForm<FormShape>(
    "gallery",
    { items: data.map((it) => ({ ...it, size: it.size ?? "" })) },
    // Drop empty size so it validates against the optional enum.
    (v) =>
      v.items.map((it) => ({
        src: it.src,
        alt: it.alt,
        caption: it.caption,
        ...(it.size ? { size: it.size } : {}),
      }))
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <EditorHeader
          title="Galeria"
          subtitle="Fotografias do showroom. Arraste para reordenar; carregue novas imagens diretamente."
        />

        <Section title="Imagens">
          <Repeater
            name="items"
            itemLabel="Imagem"
            newItem={{ src: "", alt: "", caption: "", size: "" }}
          >
            {(i) => (
              <div className="space-y-3">
                <ImageField name={`items.${i}.src`} label="Imagem" prefix="gallery" />
                <Grid>
                  <TextField name={`items.${i}.caption`} label="Legenda" />
                  <TextField name={`items.${i}.alt`} label="Texto alternativo" />
                </Grid>
                <SelectField
                  name={`items.${i}.size`}
                  label="Tamanho na grelha"
                  options={[
                    { value: "", label: "Normal" },
                    { value: "wide", label: "Largo (2 colunas)" },
                    { value: "tall", label: "Alto (2 linhas)" },
                  ]}
                />
              </div>
            )}
          </Repeater>
        </Section>

        <SaveBar saving={saving} dirty={dirty} previewHref="/galeria" />
      </form>
    </FormProvider>
  );
}
