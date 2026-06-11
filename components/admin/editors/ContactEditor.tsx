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
  SelectField,
  Repeater,
} from "@/components/admin/form";
import type { ContactContent } from "@/lib/types";

const ICON_HINT = "Icone Font Awesome, ex.: fas fa-phone-alt";

export default function ContactEditor({ data }: { data: ContactContent }) {
  const { form, submit, saving, dirty } = useContentForm<ContactContent>("contact", data);

  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <EditorHeader
          title="Contato"
          subtitle="Textos, cabecalho, cartoes de contacto e bloco do formulario."
        />

        <Section title="Cabecalho da pagina">
          <ImageField name="hero.image" label="Imagem de fundo" prefix="contact" />
          <TextField name="hero.imageAlt" label="Texto alternativo" />
          <Grid cols={3}>
            <TextField name="hero.subtitle" label="Subtitulo" />
            <TextField name="hero.title" label="Titulo" />
            <TextField name="hero.crumb" label="Breadcrumb" />
          </Grid>
        </Section>

        <Section title="Informacao de contacto">
          <TextField name="info.subtitle" label="Subtitulo" />
          <TextField name="info.title" label="Titulo" />
          <TextAreaField name="info.description" label="Descricao" rows={3} />
          <Repeater
            name="info.cards"
            itemLabel="Cartao"
            newItem={{ icon: "fas fa-info-circle", title: "", kind: "custom", text: "", href: "" }}
          >
            {(i) => (
              <div className="space-y-3">
                <Grid cols={3}>
                  <TextField name={`info.cards.${i}.title`} label="Titulo" />
                  <TextField name={`info.cards.${i}.icon`} label="Icone" placeholder={ICON_HINT} />
                  <SelectField
                    name={`info.cards.${i}.kind`}
                    label="Conteudo"
                    options={[
                      { value: "address", label: "Morada das definicoes" },
                      { value: "phone", label: "Telefone das definicoes" },
                      { value: "email", label: "Email das definicoes" },
                      { value: "hours", label: "Horario das definicoes" },
                      { value: "custom", label: "Personalizado" },
                    ]}
                  />
                </Grid>
                <Grid>
                  <TextField
                    name={`info.cards.${i}.text`}
                    label="Texto personalizado"
                    placeholder="Usado quando o conteudo e Personalizado"
                  />
                  <TextField
                    name={`info.cards.${i}.href`}
                    label="Link personalizado"
                    placeholder="https://..., mailto:..., tel:..."
                  />
                </Grid>
              </div>
            )}
          </Repeater>
        </Section>

        <Section title="Formulario">
          <TextField name="form.subtitle" label="Subtitulo" />
          <TextField name="form.title" label="Titulo" />
          <TextAreaField name="form.description" label="Descricao" rows={3} />
          <TextField name="form.downloadLabel" label="Texto do botao de catalogo" />
        </Section>

        <Section title="Mapa">
          <TextField name="mapTitle" label="Titulo acessivel do mapa" />
        </Section>

        <SaveBar saving={saving} dirty={dirty} previewHref="/contato" />
      </form>
    </FormProvider>
  );
}
