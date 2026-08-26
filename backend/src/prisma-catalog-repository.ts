import type { Prisma, PrismaClient } from "./generated/prisma/client.js";
import type { CatalogApp, CatalogAppInput, CatalogFilters, CatalogRepository } from "./catalog.js";

const relations = {
  features: { orderBy: { position: "asc" as const } },
  requirements: { orderBy: { position: "asc" as const } },
  distributions: { include: { distribution: true } },
};

type Database = Pick<PrismaClient, "app">;
type AppRecord = Prisma.AppGetPayload<{ include: typeof relations }>;

function nestedData(input: CatalogAppInput) {
  return {
    slug: input.slug,
    name: input.name,
    tagline: input.tagline,
    category: input.category,
    description: input.description,
    repositoryUrl: input.repositoryUrl,
    license: input.license,
    starCount: input.starCount,
    imageUrl: input.imageUrl,
    features: { create: input.features.map((text, position) => ({ text, position })) },
    requirements: { create: input.requirements.map((requirement, position) => ({ ...requirement, position })) },
    distributions: {
      create: input.distributions.map(({ name, status }) => ({
        distribution: { connectOrCreate: { where: { name }, create: { name } } },
        status,
      })),
    },
  };
}

function toCatalogApp(record: AppRecord): CatalogApp {
  return {
    ...record,
    distributions: record.distributions.map((item) => ({
      id: item.id,
      name: item.distribution.name,
      status: item.status,
    })),
  };
}

export class PrismaCatalogRepository implements CatalogRepository {
  constructor(private readonly database: Database) {}

  async list(filters: CatalogFilters): Promise<CatalogApp[]> {
    const query = filters.query;
    const records = await this.database.app.findMany({
      where: {
        ...(filters.category && { category: filters.category }),
        ...(query && {
          OR: [
            { name: { contains: query, mode: "insensitive" as const } },
            { tagline: { contains: query, mode: "insensitive" as const } },
            { description: { contains: query, mode: "insensitive" as const } },
            { features: { some: { text: { contains: query, mode: "insensitive" as const } } } },
            { distributions: { some: { distribution: { name: { contains: query, mode: "insensitive" as const } } } } },
          ],
        }),
      },
      include: relations,
      orderBy: [{ starCount: { sort: "desc", nulls: "last" } }, { name: "asc" }],
    });
    return records.map(toCatalogApp);
  }

  async findBySlug(slug: string): Promise<CatalogApp | null> {
    const record = await this.database.app.findUnique({ where: { slug }, include: relations });
    return record ? toCatalogApp(record) : null;
  }

  async create(input: CatalogAppInput): Promise<CatalogApp> {
    const record = await this.database.app.create({ data: nestedData(input), include: relations });
    return toCatalogApp(record);
  }

  async update(slug: string, input: CatalogAppInput): Promise<CatalogApp | null> {
    const existing = await this.database.app.findUnique({ where: { slug }, select: { id: true } });
    if (!existing) return null;

    const record = await this.database.app.update({
      where: { slug },
      data: {
        ...nestedData(input),
        features: { deleteMany: {}, create: nestedData(input).features.create },
        requirements: { deleteMany: {}, create: nestedData(input).requirements.create },
        distributions: { deleteMany: {}, create: nestedData(input).distributions.create },
      },
      include: relations,
    });
    return toCatalogApp(record);
  }

  async delete(slug: string): Promise<boolean> {
    const result = await this.database.app.deleteMany({ where: { slug } });
    return result.count > 0;
  }
}
