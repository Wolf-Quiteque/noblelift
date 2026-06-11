import { z } from "zod";

// Zod schemas are the single source of truth for content shapes. lib/types.ts
// re-exports the inferred TS types, so schema + types never drift. These schemas
// are reused for (a) server-action save validation and (b) react-hook-form.

export const SocialLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string(),
});

// NavLink is recursive (dropdown children). Modelled with z.lazy.
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
  download?: boolean;
}
export const NavLinkSchema: z.ZodType<NavLink> = z.object({
  label: z.string(),
  href: z.string(),
  download: z.boolean().optional(),
  children: z.lazy(() => z.array(NavLinkSchema)).optional(),
});

export const SiteConfigSchema = z.object({
  brand: z.string(),
  logo: z.string(),
  catalogPdf: z.string(),
  phone: z.string(),
  phoneHref: z.string(),
  email: z.string(),
  address: z.string(),
  addressShort: z.string(),
  mapsLink: z.string(),
  hours: z.array(z.string()),
  social: z.array(SocialLinkSchema),
  nav: z.array(NavLinkSchema),
  footerAbout: z.string(),
  mapEmbedSrc: z.string(),
});

export const SlideButtonSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(["primary", "white"]),
  download: z.boolean().optional(),
});

export const SlideSchema = z.object({
  image: z.string(),
  imageAlt: z.string(),
  subheadline: z.string().optional(),
  headline: z.string(),
  isPrimary: z.boolean().optional(),
  description: z.string(),
  buttons: z.array(SlideButtonSchema),
});

export const ServiceBarItemSchema = z.object({
  icon: z.string(),
  caption: z.string(),
  title: z.string(),
  href: z.string(),
});

export const FeaturePanelSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
  href: z.string(),
});

export const AboutDetailSchema = z.object({
  title: z.string(),
  text: z.string(),
});

export const ActionPanelSchema = z.object({
  image: z.string(),
  imageAlt: z.string(),
  icon: z.string(),
  title: z.string(),
  href: z.string(),
  inverted: z.boolean().optional(),
});

export const ImageStripItemSchema = z.object({
  image: z.string(),
  imageAlt: z.string(),
  label: z.string(),
  href: z.string(),
});

export const HomeContentSchema = z.object({
  slides: z.array(SlideSchema),
  servicesBar: z.array(ServiceBarItemSchema),
  about: z.object({
    image: z.string(),
    imageAlt: z.string(),
    subtitle: z.string(),
    title: z.string(),
    paragraphs: z.array(z.string()),
    details: z.array(AboutDetailSchema),
    signatureTitle: z.string(),
    signatureName: z.string(),
  }),
  ctaQuote: z.object({
    image: z.string(),
    imageAlt: z.string(),
    subtitle: z.string(),
    title: z.string(),
    panels: z.array(z.object({ icon: z.string(), label: z.string() })),
  }),
  features: z.object({
    subtitle: z.string(),
    title: z.string(),
    description: z.string(),
    panels: z.array(FeaturePanelSchema),
    moreText: z.string(),
    moreLinkLabel: z.string(),
    moreLinkHref: z.string(),
  }),
  imageStrip: z.array(ImageStripItemSchema),
  ctaAdvantages: z.object({
    subtitle: z.string(),
    title: z.string(),
    intro: z.string(),
    advantages: z.array(z.string()),
    panels: z.array(ActionPanelSchema),
  }),
});

export const ProductCardSchema = z.object({
  image: z.string(),
  imageAlt: z.string(),
  title: z.string(),
  description: z.string(),
});

export const ProductCategorySchema = z.object({
  id: z.string(),
  indexLabel: z.string(),
  icon: z.string(),
  caption: z.string(),
  navTitle: z.string(),
  title: z.string(),
  description: z.string(),
  cards: z.array(ProductCardSchema),
});

export const ProductsSchema = z.array(ProductCategorySchema);

export const GalleryImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string(),
  size: z.enum(["wide", "tall"]).optional(),
});

export const GallerySchema = z.array(GalleryImageSchema);

export const AboutContentSchema = z.object({
  hero: z.object({
    image: z.string(),
    imageAlt: z.string(),
    subtitle: z.string(),
    title: z.string(),
  }),
  intro: z.object({
    image: z.string(),
    imageAlt: z.string(),
    subtitle: z.string(),
    title: z.string(),
    paragraphs: z.array(z.string()),
    details: z.array(AboutDetailSchema),
    signatureTitle: z.string(),
    signatureName: z.string(),
  }),
  values: z.object({
    subtitle: z.string(),
    title: z.string(),
    description: z.string(),
    panels: z.array(FeaturePanelSchema),
  }),
  showroom: z.object({
    subtitle: z.string(),
    title: z.string(),
    intro: z.string(),
    advantages: z.array(z.string()),
    panels: z.array(ActionPanelSchema),
  }),
});

export const ContactInfoCardSchema = z.object({
  icon: z.string(),
  title: z.string(),
  kind: z.enum(["address", "phone", "email", "hours", "custom"]),
  text: z.string().optional(),
  href: z.string().optional(),
});

export const ContactContentSchema = z.object({
  hero: z.object({
    image: z.string(),
    imageAlt: z.string(),
    subtitle: z.string(),
    title: z.string(),
    crumb: z.string(),
  }),
  info: z.object({
    subtitle: z.string(),
    title: z.string(),
    description: z.string(),
    cards: z.array(ContactInfoCardSchema),
  }),
  form: z.object({
    subtitle: z.string(),
    title: z.string(),
    description: z.string(),
    downloadLabel: z.string(),
  }),
  mapTitle: z.string(),
});

// Maps content key -> schema, used by the generic save action.
export const contentSchemas = {
  site: SiteConfigSchema,
  home: HomeContentSchema,
  products: ProductsSchema,
  gallery: GallerySchema,
  about: AboutContentSchema,
  contact: ContactContentSchema,
} as const;

export type ContentKey = keyof typeof contentSchemas;
