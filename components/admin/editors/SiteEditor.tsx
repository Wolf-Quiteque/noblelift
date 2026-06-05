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
  FileField,
  CheckboxField,
  StringListField,
  Repeater,
} from "@/components/admin/form";
import type { SiteConfig } from "@/lib/types";

const ICON_HINT = "Ícone Font Awesome, ex.: fab fa-facebook-f";

export default function SiteEditor({ data }: { data: SiteConfig }) {
  const { form, submit, saving, dirty } = useContentForm<SiteConfig>("site", data);

  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <EditorHeader
          title="Definições"
          subtitle="Marca, contactos, menu de navegação, redes sociais e rodapé."
        />

        <Section title="Marca">
          <TextField name="brand" label="Nome da marca" />
          <Grid>
            <ImageField name="logo" label="Logótipo" prefix="site" />
            <FileField name="catalogPdf" label="Catálogo (PDF)" prefix="site" accept="application/pdf" />
          </Grid>
        </Section>

        <Section title="Contactos">
          <Grid>
            <TextField name="phone" label="Telefone (visível)" placeholder="+244 928 283 666" />
            <TextField name="phoneHref" label="Telefone (formato tel:)" placeholder="+244928283666" />
          </Grid>
          <TextField name="email" label="Email" />
          <TextField name="address" label="Morada (completa)" />
          <TextField name="addressShort" label="Morada (curta, rodapé)" />
          <TextField name="mapsLink" label="Link do Google Maps" />
          <TextAreaField name="mapEmbedSrc" label="Mapa incorporado (URL do iframe)" rows={2} />
          <StringListField name="hours" label="Horário" placeholder="Segunda a Sexta: 08h00 – 17h00" />
        </Section>

        <Section title="Redes sociais">
          <Repeater name="social" itemLabel="Rede" newItem={{ label: "", href: "#", icon: "fab fa-facebook-f" }}>
            {(i) => (
              <Grid cols={3}>
                <TextField name={`social.${i}.label`} label="Nome" placeholder="Facebook" />
                <TextField name={`social.${i}.href`} label="Link" placeholder="#" />
                <TextField name={`social.${i}.icon`} label="Ícone" placeholder={ICON_HINT} />
              </Grid>
            )}
          </Repeater>
        </Section>

        <Section
          title="Menu de navegação"
          description="A ordem aqui define a ordem no site. Um item pode ter um submenu (dropdown)."
        >
          <Repeater name="nav" itemLabel="Item" newItem={{ label: "", href: "/" }}>
            {(i) => (
              <div className="space-y-3">
                <Grid>
                  <TextField name={`nav.${i}.label`} label="Texto" />
                  <TextField name={`nav.${i}.href`} label="Link" placeholder="/ ou /produtos" />
                </Grid>
                <CheckboxField name={`nav.${i}.download`} label="É um download (ex.: catálogo PDF)" />
                <div className="rounded-lg border border-gray-200 bg-white p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Submenu (opcional)
                  </p>
                  <Repeater
                    name={`nav.${i}.children`}
                    itemLabel="Subitem"
                    newItem={{ label: "", href: "/produtos#" }}
                  >
                    {(j) => (
                      <Grid>
                        <TextField name={`nav.${i}.children.${j}.label`} label="Texto" />
                        <TextField name={`nav.${i}.children.${j}.href`} label="Link" />
                      </Grid>
                    )}
                  </Repeater>
                </div>
              </div>
            )}
          </Repeater>
        </Section>

        <Section title="Rodapé">
          <TextAreaField name="footerAbout" label="Texto sobre a empresa" rows={4} />
        </Section>

        <SaveBar saving={saving} dirty={dirty} previewHref="/" />
      </form>
    </FormProvider>
  );
}
