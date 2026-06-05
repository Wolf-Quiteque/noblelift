"use client";

import { useEffect, useRef } from "react";
import { withJQuery } from "@/lib/jquery";

const CATEGORIES = [
  "Empilhadeiras Eléctricas",
  "Porta-paletes",
  "Empilhadores",
  "Mesa Elevatória / Alta Elevação",
  "Plataformas Elevatórias",
  "Outro / Não tenho a certeza",
];

// Quote-request form. Styles the <select> with the theme's niceSelect (as the
// original did) and submits via the visitor's email client (mailto), matching
// the original behaviour. When the CMS/Supabase phase lands, swap handleSubmit
// to POST to a /api/quote route that persists the lead.
export default function ContactForm({ email }: { email: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const cancel = withJQuery((jq) => {
      const $sel = jq(formRef.current).find("select") as any;
      if (typeof $sel.niceSelect === "function") $sel.niceSelect();
    });
    return () => {
      cancel();
      const w = window as any;
      if (w.jQuery && formRef.current) {
        const $sel = w.jQuery(formRef.current).find("select");
        if (typeof $sel.niceSelect === "function") {
          try {
            $sel.niceSelect("destroy");
          } catch {
            /* no-op */
          }
        }
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k) as string) || "";
    const subject = `Pedido de orçamento — ${get("Categoria") || "Geral"}`;
    const body =
      `Nome: ${get("Nome")}\n` +
      `Empresa: ${get("Empresa")}\n` +
      `Email: ${get("Email")}\n` +
      `Telefone: ${get("Telefone")}\n` +
      `Categoria: ${get("Categoria")}\n\n` +
      `Mensagem:\n${get("Mensagem")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contactForm" ref={formRef} onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 col-md-6">
          <input className="form-control" type="text" name="Nome" placeholder="Nome" required />
        </div>
        <div className="col-12 col-md-6">
          <input className="form-control" type="text" name="Empresa" placeholder="Empresa (opcional)" />
        </div>
        <div className="col-12 col-md-6">
          <input className="form-control" type="email" name="Email" placeholder="Email" required />
        </div>
        <div className="col-12 col-md-6">
          <input className="form-control" type="tel" name="Telefone" placeholder="Telefone" required />
        </div>
        <div className="col-12">
          <div className="select-container">
            <select className="form-control" name="Categoria" defaultValue="">
              <option value="">Categoria de interesse</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            name="Mensagem"
            rows={5}
            placeholder="Mensagem — descreva o que procura, capacidade necessária, prazo, etc."
            required
          />
        </div>
        <div className="col-12">
          <input className="btn btn--primary btn--block" type="submit" value="Enviar Pedido" />
        </div>
      </div>
    </form>
  );
}
