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
  SelectField,
  StringListField,
  Repeater,
} from "@/components/admin/form";
import type { HomeContent } from "@/lib/types";

const ICON_HINT = "Ícone Font Awesome, ex.: fas fa-truck-loading";

export default function HomeEditor({ data }: { data: HomeContent }) {
  const { form, submit, saving, dirty } = useContentForm<HomeContent>("home", data);

  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <EditorHeader title="Página Inicial" subtitle="Tudo o que aparece na homepage." />

        <Section title="Slides do banner" description="Carrossel no topo da página.">
          <Repeater
            name="slides"
            itemLabel="Slide"
            newItem={{ image: "", imageAlt: "", headline: "", description: "", buttons: [] }}
          >
            {(i) => (
              <div className="space-y-3">
                <ImageField name={`slides.${i}.image`} label="Imagem de fundo" prefix="home" />
                <TextField name={`slides.${i}.imageAlt`} label="Texto alternativo da imagem" />
                <TextField name={`slides.${i}.subheadline`} label="Subtítulo (pequeno, opcional)" />
                <TextAreaField
                  name={`slides.${i}.headline`}
                  label="Título (use Enter para quebra de linha)"
                  rows={2}
                />
                <TextAreaField name={`slides.${i}.description`} label="Descrição" rows={2} />
                <CheckboxField name={`slides.${i}.isPrimary`} label="Título principal (H1) — use só no 1.º slide" />
                <div className="rounded-lg border border-gray-200 bg-white p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Botões</p>
                  <Repeater
                    name={`slides.${i}.buttons`}
                    itemLabel="Botão"
                    newItem={{ label: "", href: "/", variant: "primary" }}
                    max={2}
                  >
                    {(j) => (
                      <div className="space-y-3">
                        <Grid>
                          <TextField name={`slides.${i}.buttons.${j}.label`} label="Texto" />
                          <TextField name={`slides.${i}.buttons.${j}.href`} label="Link" />
                        </Grid>
                        <Grid>
                          <SelectField
                            name={`slides.${i}.buttons.${j}.variant`}
                            label="Estilo"
                            options={[
                              { value: "primary", label: "Primário (laranja)" },
                              { value: "white", label: "Branco" },
                            ]}
                          />
                          <div className="flex items-end pb-2">
                            <CheckboxField name={`slides.${i}.buttons.${j}.download`} label="É download" />
                          </div>
                        </Grid>
                      </div>
                    )}
                  </Repeater>
                </div>
              </div>
            )}
          </Repeater>
        </Section>

        <Section title="Barra de serviços" description="Os quatro cartões logo abaixo do banner.">
          <Repeater
            name="servicesBar"
            itemLabel="Serviço"
            newItem={{ icon: "fas fa-truck-loading", caption: "", title: "", href: "/produtos" }}
          >
            {(i) => (
              <>
                <Grid>
                  <TextField name={`servicesBar.${i}.title`} label="Título" />
                  <TextField name={`servicesBar.${i}.caption`} label="Legenda" />
                </Grid>
                <Grid>
                  <TextField name={`servicesBar.${i}.icon`} label="Ícone" placeholder={ICON_HINT} />
                  <TextField name={`servicesBar.${i}.href`} label="Link" />
                </Grid>
              </>
            )}
          </Repeater>
        </Section>

        <Section title="Bloco “Sobre”">
          <ImageField name="about.image" label="Imagem" prefix="home" />
          <TextField name="about.imageAlt" label="Texto alternativo" />
          <TextField name="about.subtitle" label="Subtítulo" />
          <TextField name="about.title" label="Título" />
          <StringListField name="about.paragraphs" label="Parágrafos" />
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Detalhes</p>
            <Repeater name="about.details" itemLabel="Detalhe" newItem={{ title: "", text: "" }}>
              {(i) => (
                <>
                  <TextField name={`about.details.${i}.title`} label="Título" />
                  <TextAreaField name={`about.details.${i}.text`} label="Texto" rows={2} />
                </>
              )}
            </Repeater>
          </div>
          <Grid>
            <TextField name="about.signatureTitle" label="Assinatura — cargo" />
            <TextField name="about.signatureName" label="Assinatura — nome" />
          </Grid>
        </Section>

        <Section title="CTA — Orçamento" description="Faixa com imagem de fundo.">
          <ImageField name="ctaQuote.image" label="Imagem de fundo" prefix="home" />
          <TextField name="ctaQuote.imageAlt" label="Texto alternativo" />
          <TextField name="ctaQuote.subtitle" label="Subtítulo" />
          <TextField name="ctaQuote.title" label="Título" />
          <Repeater name="ctaQuote.panels" itemLabel="Vantagem" newItem={{ icon: "fas fa-tools", label: "" }}>
            {(i) => (
              <Grid>
                <TextField name={`ctaQuote.panels.${i}.icon`} label="Ícone" placeholder={ICON_HINT} />
                <TextField name={`ctaQuote.panels.${i}.label`} label="Texto" />
              </Grid>
            )}
          </Repeater>
        </Section>

        <Section title="Destaques (Features)">
          <TextField name="features.subtitle" label="Subtítulo" />
          <TextField name="features.title" label="Título" />
          <TextAreaField name="features.description" label="Descrição" rows={3} />
          <Repeater
            name="features.panels"
            itemLabel="Destaque"
            newItem={{ icon: "fas fa-truck-loading", title: "", description: "", href: "/produtos" }}
          >
            {(i) => (
              <div className="space-y-3">
                <Grid>
                  <TextField name={`features.panels.${i}.title`} label="Título (Enter = quebra)" />
                  <TextField name={`features.panels.${i}.icon`} label="Ícone" placeholder={ICON_HINT} />
                </Grid>
                <TextAreaField name={`features.panels.${i}.description`} label="Descrição" rows={2} />
                <TextField name={`features.panels.${i}.href`} label="Link" />
              </div>
            )}
          </Repeater>
          <Grid cols={3}>
            <TextField name="features.moreText" label="Texto final" />
            <TextField name="features.moreLinkLabel" label="Texto do link" />
            <TextField name="features.moreLinkHref" label="Link" />
          </Grid>
        </Section>

        <Section title="Faixa de imagens" description="Tira de quatro imagens com etiqueta.">
          <Repeater
            name="imageStrip"
            itemLabel="Imagem"
            newItem={{ image: "", imageAlt: "", label: "", href: "/produtos" }}
          >
            {(i) => (
              <div className="space-y-3">
                <ImageField name={`imageStrip.${i}.image`} label="Imagem" prefix="home" />
                <Grid cols={3}>
                  <TextField name={`imageStrip.${i}.label`} label="Etiqueta" />
                  <TextField name={`imageStrip.${i}.imageAlt`} label="Texto alternativo" />
                  <TextField name={`imageStrip.${i}.href`} label="Link" />
                </Grid>
              </div>
            )}
          </Repeater>
        </Section>

        <Section title="CTA — Vantagens">
          <TextField name="ctaAdvantages.subtitle" label="Subtítulo" />
          <TextField name="ctaAdvantages.title" label="Título" />
          <TextAreaField name="ctaAdvantages.intro" label="Introdução" rows={3} />
          <StringListField name="ctaAdvantages.advantages" label="Lista de vantagens" />
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Painéis</p>
            <Repeater
              name="ctaAdvantages.panels"
              itemLabel="Painel"
              newItem={{ image: "", imageAlt: "", icon: "fas fa-box", title: "", href: "/produtos" }}
            >
              {(i) => (
                <div className="space-y-3">
                  <ImageField name={`ctaAdvantages.panels.${i}.image`} label="Imagem" prefix="home" />
                  <Grid>
                    <TextField name={`ctaAdvantages.panels.${i}.title`} label="Título" />
                    <TextField name={`ctaAdvantages.panels.${i}.icon`} label="Ícone" placeholder={ICON_HINT} />
                  </Grid>
                  <Grid>
                    <TextField name={`ctaAdvantages.panels.${i}.imageAlt`} label="Texto alternativo" />
                    <TextField name={`ctaAdvantages.panels.${i}.href`} label="Link" />
                  </Grid>
                  <CheckboxField name={`ctaAdvantages.panels.${i}.inverted`} label="Cor invertida" />
                </div>
              )}
            </Repeater>
          </div>
        </Section>

        <SaveBar saving={saving} dirty={dirty} previewHref="/" />
      </form>
    </FormProvider>
  );
}
