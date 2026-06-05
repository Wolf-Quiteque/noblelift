"use client";

import { useState, type ReactNode } from "react";
import {
  useForm,
  useFormContext,
  useFieldArray,
  type FieldValues,
  type DefaultValues,
} from "react-hook-form";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  UploadCloud,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { saveContent } from "@/lib/actions/content";
import { uploadFile } from "@/lib/actions/upload";
import type { ContentKey } from "@/lib/schemas";

/* ───────────────────────── form hook + save bar ───────────────────────── */

export function useContentForm<T extends FieldValues>(
  key: ContentKey,
  defaultValues: T,
  // Maps the form's value tree to the payload the schema expects (e.g. unwrap a
  // `{ items: [...] }` shape for array documents, or strip empty optional enums).
  serialize: (values: T) => unknown = (v) => v
) {
  const form = useForm<T>({ defaultValues: defaultValues as DefaultValues<T> });

  const submit = form.handleSubmit(async (values) => {
    const res = await saveContent(key, serialize(values));
    if (res.ok) {
      toast.success("Alterações publicadas com sucesso.");
      form.reset(values);
    } else {
      toast.error(res.error);
    }
  });

  return {
    form,
    submit,
    saving: form.formState.isSubmitting,
    dirty: form.formState.isDirty,
  };
}

export function SaveBar({
  saving,
  dirty,
  previewHref,
}: {
  saving: boolean;
  dirty: boolean;
  previewHref: string;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-8 flex items-center justify-between gap-3 border-t border-gray-200 bg-white/90 px-4 py-3 backdrop-blur lg:-mx-8 lg:px-8">
      <span className="text-sm text-gray-500">
        {saving ? "A guardar…" : dirty ? "Tem alterações por publicar" : "Tudo guardado"}
      </span>
      <div className="flex items-center gap-2">
        <a href={previewHref} target="_blank" rel="noopener" className="admin-btn-ghost">
          <ExternalLink size={16} /> Ver página
        </a>
        <button type="submit" className="admin-btn-primary" disabled={saving}>
          {saving && <Loader2 size={16} className="animate-spin" />}
          Guardar e publicar
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── layout helpers ───────────────────────── */

export function EditorHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </header>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-card mb-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-gray-500">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function Grid({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 | 3 }) {
  const map = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" } as const;
  return <div className={`grid grid-cols-1 gap-4 ${map[cols]}`}>{children}</div>;
}

/* ───────────────────────── primitive fields ───────────────────────── */

export function TextField({
  name,
  label,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  const { register } = useFormContext();
  return (
    <div>
      <label className="admin-label">{label}</label>
      <input className="admin-input" type={type} placeholder={placeholder} {...register(name)} />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  placeholder,
  rows = 3,
}: {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}) {
  const { register } = useFormContext();
  return (
    <div>
      <label className="admin-label">{label}</label>
      <textarea className="admin-input" rows={rows} placeholder={placeholder} {...register(name)} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  const { register } = useFormContext();
  return (
    <div>
      <label className="admin-label">{label}</label>
      <select className="admin-input" {...register(name)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({ name, label }: { name: string; label: string }) {
  const { register } = useFormContext();
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand" {...register(name)} />
      {label}
    </label>
  );
}

/* ───────────────────────── image / file upload ───────────────────────── */

export function ImageField({
  name,
  label,
  prefix,
}: {
  name: string;
  label: string;
  prefix: string;
}) {
  const { setValue, watch } = useFormContext();
  const value = watch(name) as string | undefined;
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("prefix", prefix);
    const res = await uploadFile(fd);
    setBusy(false);
    if (res.ok) {
      setValue(name, res.url, { shouldDirty: true });
      toast.success("Imagem carregada.");
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div>
      <label className="admin-label">{label}</label>
      <div className="flex items-start gap-4">
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) upload(f);
          }}
          className="group relative flex h-28 w-40 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 transition hover:border-brand hover:text-brand"
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-xs">
              <UploadCloud size={22} />
              <span>Carregar</span>
            </div>
          )}
          {busy && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Loader2 size={20} className="animate-spin text-brand" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
            }}
          />
        </label>
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs text-gray-500">
            Arraste uma imagem ou clique. Ou cole um endereço (URL):
          </p>
          <input
            className="admin-input text-xs"
            value={value ?? ""}
            placeholder="/assets/... ou https://..."
            onChange={(e) => setValue(name, e.target.value, { shouldDirty: true })}
          />
        </div>
      </div>
    </div>
  );
}

export function FileField({
  name,
  label,
  prefix,
  accept = "*",
}: {
  name: string;
  label: string;
  prefix: string;
  accept?: string;
}) {
  const { setValue, watch } = useFormContext();
  const value = watch(name) as string | undefined;
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("prefix", prefix);
    const res = await uploadFile(fd);
    setBusy(false);
    if (res.ok) {
      setValue(name, res.url, { shouldDirty: true });
      toast.success("Ficheiro carregado.");
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div>
      <label className="admin-label">{label}</label>
      <div className="flex items-center gap-3">
        <label className="admin-btn-ghost cursor-pointer">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
          Carregar
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
            }}
          />
        </label>
        <input
          className="admin-input flex-1 text-xs"
          value={value ?? ""}
          placeholder="/assets/... ou https://..."
          onChange={(e) => setValue(name, e.target.value, { shouldDirty: true })}
        />
      </div>
    </div>
  );
}

/* ───────────────────────── string list (no objects) ───────────────────────── */

export function StringListField({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  const { watch, setValue } = useFormContext();
  const value = (watch(name) as string[] | undefined) ?? [];

  const update = (next: string[]) => setValue(name, next, { shouldDirty: true });

  return (
    <div>
      <label className="admin-label">{label}</label>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className="admin-input"
              placeholder={placeholder}
              value={item}
              onChange={(e) => {
                const next = [...value];
                next[i] = e.target.value;
                update(next);
              }}
            />
            <button
              type="button"
              className="admin-btn-ghost px-2"
              disabled={i === 0}
              onClick={() => {
                const next = [...value];
                [next[i - 1], next[i]] = [next[i], next[i - 1]];
                update(next);
              }}
            >
              <ArrowUp size={15} />
            </button>
            <button
              type="button"
              className="admin-btn-ghost px-2"
              disabled={i === value.length - 1}
              onClick={() => {
                const next = [...value];
                [next[i + 1], next[i]] = [next[i], next[i + 1]];
                update(next);
              }}
            >
              <ArrowDown size={15} />
            </button>
            <button
              type="button"
              className="admin-btn-ghost px-2 text-red-600"
              onClick={() => update(value.filter((_, j) => j !== i))}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button type="button" className="admin-btn-ghost" onClick={() => update([...value, ""])}>
          <Plus size={15} /> Adicionar
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── sortable repeater (array of objects) ───────────────────────── */

function SortableRow({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-xl border border-gray-200 bg-gray-50/60 p-4"
    >
      <button
        type="button"
        className="absolute right-3 top-3 cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
        title="Arraste para reordenar"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={18} />
      </button>
      {children}
    </div>
  );
}

export function Repeater({
  name,
  itemLabel,
  newItem,
  max,
  children,
}: {
  name: string;
  itemLabel: string;
  newItem: Record<string, unknown>;
  max?: number;
  children: (index: number) => ReactNode;
}) {
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({ control, name });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = fields.findIndex((f) => f.id === active.id);
    const to = fields.findIndex((f) => f.id === over.id);
    if (from !== -1 && to !== -1) move(from, to);
  }

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <SortableRow key={field.id} id={field.id}>
                <div className="mb-3 flex items-center justify-between pr-8">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {itemLabel} {index + 1}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
                    onClick={() => remove(index)}
                  >
                    <Trash2 size={14} /> Remover
                  </button>
                </div>
                {children(index)}
              </SortableRow>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {(!max || fields.length < max) && (
        <button
          type="button"
          className="admin-btn-ghost w-full border-dashed"
          onClick={() => append(newItem)}
        >
          <Plus size={16} /> Adicionar {itemLabel.toLowerCase()}
        </button>
      )}
    </div>
  );
}
