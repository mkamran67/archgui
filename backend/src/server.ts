import "dotenv/config";
import { createApp } from "./app.js";
import { createDatabase } from "./database.js";
import { PrismaCatalogRepository } from "./prisma-catalog-repository.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required");

const port = Number(process.env.PORT ?? 3000);
const database = createDatabase(databaseUrl);
const server = createApp(new PrismaCatalogRepository(database)).listen(port, () => {
  console.log(`archgui API listening on http://localhost:${port}`);
});

async function shutdown() {
  server.close(async () => {
    await database.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
