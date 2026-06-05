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
  CheckboxField,
  StringListField,
  Repeater,
} from "@/components/admin/form";
import type { AboutContent } from "@/lib/types";

const ICON_HINT = "Ícone Font Awesome, ex.: fas fa-handshake";

export default function AboutEditor({ data }: { data: AboutContent }) {
  const { form, submit, saving, dirty } = useContentForm<AboutContent>("about", data);

  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <EditorHeader title="Empresa" subtitle="Página “Sobre a Noblelift Angola”." />

        <Section title="Cabeçalho da página">
          <ImageField name="hero.image" label="Imagem de fundo" prefix="about" />
          <TextField name="hero.imageAlt" label="Texto alternativo" />
          <TextField name="hero.subtitle" label="Subtítulo" />
          <TextField name="hero.title" label="Título" />
        </Section>

        <Section title="Introdução / Quem somos">
          <ImageField name="intro.image" label="Imagem" prefix="about" />
          <TextField name="intro.imageAlt" label="Texto alternativo" />
          <TextField name="intro.subtitle" label="Subtítulo" />
          <TextField name="intro.title" label="Título" />
          <StringListField name="intro.paragraphs" label="Parágrafos" />
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Detalhes</p>
            <Repeater name="intro.details" itemLabel="Detalhe" newItem={{ title: "", text: "" }}>
              {(i) => (
                <>
                  <TextField name={`intro.details.${i}.title`} label="Título" />
                  <TextAreaField name={`intro.details.${i}.text`} label="Texto" rows={2} />
                </>
              )}
            </Repeater>
          </div>
          <Grid>
            <TextField name="intro.signatureTitle" label="Assinatura — cargo" />
            <TextField name="intro.signatureName" label="Assinatura — nome" />
          </Grid>
        </Section>

        <Section title="Valores">
          <TextField name="values.subtitle" label="Subtítulo" />
          <TextField name="values.title" label="Título" />
          <TextAreaField name="values.description" label="Descrição" rows={3} />
          <Repeater
            name="values.panels"
            itemLabel="Valor"
            newItem={{ icon: "fas fa-handshake", title: "", description: "", href: "/produtos" }}
          >
            {(i) => (
              <div className="space-y-3">
                <Grid>
                  <TextField name={`values.panels.${i}.title`} label="Título" />
                  <TextField name={`values.panels.${i}.icon`} label="Ícone" placeholder={ICON_HINT} />
                </Grid>
                <TextAreaField name={`values.panels.${i}.description`} label="Descrição" rows={2} />
                <TextField name={`values.panels.${i}.href`} label="Link" />
              </div>
            )}
          </Repeater>
        </Section>

        <Section title="Showroom">
          <TextField name="showroom.subtitle" label="Subtítulo" />
          <TextField name="showroom.title" label="Título" />
          <TextAreaField name="showroom.intro" label="Introdução" rows={3} />
          <StringListField name="showroom.advantages" label="Lista de vantagens" />
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Painéis</p>
            <Repeater
              name="showroom.panels"
              itemLabel="Painel"
              newItem={{ image: "", imageAlt: "", icon: "fas fa-warehouse", title: "", href: "/galeria" }}
            >
              {(i) => (
                <div className="space-y-3">
                  <ImageField name={`showroom.panels.${i}.image`} label="Imagem" prefix="about" />
                  <Grid>
                    <TextField name={`showroom.panels.${i}.title`} label="Título" />
                    <TextField name={`showroom.panels.${i}.icon`} label="Ícone" placeholder={ICON_HINT} />
                  </Grid>
                  <Grid>
                    <TextField name={`showroom.panels.${i}.imageAlt`} label="Texto alternativo" />
                    <TextField name={`showroom.panels.${i}.href`} label="Link" />
                  </Grid>
                  <CheckboxField name={`showroom.panels.${i}.inverted`} label="Cor invertida" />
                </div>
              )}
            </Repeater>
          </div>
        </Section>

        <SaveBar saving={saving} dirty={dirty} previewHref="/sobre" />
      </form>
    </FormProvider>
  );
}
