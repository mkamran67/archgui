import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";
import { supportStatuses, type CatalogRepository } from "./catalog.js";

const appInputSchema = z.object({
  slug: z.string().trim().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(1),
  tagline: z.string().trim().min(1),
  category: z.string().trim().min(1),
  description: z.string().trim().min(1),
  repositoryUrl: z.url(),
  license: z.string().trim().min(1),
  starCount: z.number().int().nonnegative().nullable(),
  imageUrl: z.url(),
  features: z.array(z.string().trim().min(1)),
  requirements: z.array(z.object({ label: z.string().trim().min(1), value: z.string().trim().min(1) })),
  distributions: z.array(z.object({ name: z.string().trim().min(1), status: z.enum(supportStatuses) })),
});

export function createApp(repository: CatalogRepository) {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "100kb" }));

  app.get("/health", (_request, response) => response.json({ status: "ok" }));

  app.get("/api/apps", async (request, response) => {
    const category = typeof request.query.category === "string" ? request.query.category : undefined;
    const query = typeof request.query.q === "string" ? request.query.q : undefined;
    const data = await repository.list({ ...(category && { category }), ...(query && { query }) });
    response.json({ data });
  });

  app.get("/api/apps/:slug", async (request, response) => {
    const data = await repository.findBySlug(request.params.slug);
    if (!data) return response.status(404).json({ error: { code: "NOT_FOUND", message: "Catalog app not found" } });
    return response.json({ data });
  });

  app.post("/api/apps", async (request, response) => {
    const input = appInputSchema.parse(request.body);
    const data = await repository.create(input);
    response.status(201).json({ data });
  });

  app.put("/api/apps/:slug", async (request, response) => {
    const input = appInputSchema.parse(request.body);
    const data = await repository.update(request.params.slug, input);
    if (!data) return response.status(404).json({ error: { code: "NOT_FOUND", message: "Catalog app not found" } });
    return response.json({ data });
  });

  app.delete("/api/apps/:slug", async (request, response) => {
    const deleted = await repository.delete(request.params.slug);
    if (!deleted) return response.status(404).json({ error: { code: "NOT_FOUND", message: "Catalog app not found" } });
    return response.status(204).send();
  });

  app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        error: { code: "VALIDATION_ERROR", message: "Request body is invalid", details: z.treeifyError(error) },
      });
    }

    console.error(error);
    return response.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } });
  });

  return app;
}
