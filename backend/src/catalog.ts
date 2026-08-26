export const supportStatuses = ["STABLE", "BETA", "EXPERIMENTAL"] as const;

export type SupportStatus = (typeof supportStatuses)[number];

export type CatalogAppInput = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  repositoryUrl: string;
  license: string;
  starCount: number | null;
  imageUrl: string;
  features: string[];
  requirements: { label: string; value: string }[];
  distributions: { name: string; status: SupportStatus }[];
};

export type CatalogApp = Omit<CatalogAppInput, "features" | "requirements" | "distributions"> & {
  id: string;
  features: { id: string; text: string; position: number }[];
  requirements: { id: string; label: string; value: string; position: number }[];
  distributions: { id: string; name: string; status: SupportStatus }[];
  createdAt: Date;
  updatedAt: Date;
};

export type CatalogFilters = {
  category?: string;
  query?: string;
};

export interface CatalogRepository {
  list(filters: CatalogFilters): Promise<CatalogApp[]>;
  findBySlug(slug: string): Promise<CatalogApp | null>;
  create(input: CatalogAppInput): Promise<CatalogApp>;
  update(slug: string, input: CatalogAppInput): Promise<CatalogApp | null>;
  delete(slug: string): Promise<boolean>;
}
