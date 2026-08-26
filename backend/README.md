# archgui backend

Express REST API backed by PostgreSQL through Prisma.

## Setup

1. Copy `.env.example` to `.env`.
2. Start PostgreSQL with `docker compose up -d` or point `DATABASE_URL` at an existing PostgreSQL database.
3. Install dependencies with `npm install`.
4. Apply the schema with `npm run prisma:migrate -- --name initial` for a development database, or `npx prisma migrate deploy` in deployment.
5. Start the API with `npm run dev`.

The default API address is `http://localhost:3000`.

## Endpoints

- `GET /health`
- `GET /api/apps?category=System&q=monitor`
- `GET /api/apps/:slug`
- `POST /api/apps`
- `PUT /api/apps/:slug`
- `DELETE /api/apps/:slug`

Create and update requests use the following shape:

```json
{
  "slug": "pamac",
  "name": "Pamac",
  "tagline": "A graphical package manager",
  "category": "Package Manager",
  "description": "Manage software from a graphical interface.",
  "repositoryUrl": "https://gitlab.manjaro.org/applications/pamac",
  "license": "GPL-3.0",
  "starCount": 580,
  "imageUrl": "https://example.com/pamac.png",
  "features": ["AUR support"],
  "requirements": [{ "label": "Memory", "value": "256 MB" }],
  "distributions": [{ "name": "Arch Linux", "status": "STABLE" }]
}
```

`starCount` may be `null`, and distribution status must be `STABLE`, `BETA`, or `EXPERIMENTAL`.
