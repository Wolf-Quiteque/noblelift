// Content types are inferred from the zod schemas in lib/schemas.ts (the single
// source of truth) so the two can never drift. Components import the same names
// as before — only the definitions moved.
import type { z } from "zod";
import type {
  SocialLinkSchema,
  SiteConfigSchema,
  SlideButtonSchema,
  SlideSchema,
  ServiceBarItemSchema,
  FeaturePanelSchema,
  AboutDetailSchema,
  ActionPanelSchema,
  ImageStripItemSchema,
  HomeContentSchema,
  ProductCardSchema,
  ProductCategorySchema,
  GalleryImageSchema,
  AboutContentSchema,
} from "@/lib/schemas";

export type { NavLink } from "@/lib/schemas";

export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type SlideButton = z.infer<typeof SlideButtonSchema>;
export type Slide = z.infer<typeof SlideSchema>;
export type ServiceBarItem = z.infer<typeof ServiceBarItemSchema>;
export type FeaturePanel = z.infer<typeof FeaturePanelSchema>;
export type AboutDetail = z.infer<typeof AboutDetailSchema>;
export type ActionPanel = z.infer<typeof ActionPanelSchema>;
export type ImageStripItem = z.infer<typeof ImageStripItemSchema>;
export type HomeContent = z.infer<typeof HomeContentSchema>;
export type ProductCard = z.infer<typeof ProductCardSchema>;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type GalleryImage = z.infer<typeof GalleryImageSchema>;
export type AboutContent = z.infer<typeof AboutContentSchema>;
