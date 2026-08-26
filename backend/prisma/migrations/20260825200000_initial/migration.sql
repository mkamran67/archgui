CREATE TYPE "SupportStatus" AS ENUM ('STABLE', 'BETA', 'EXPERIMENTAL');

CREATE TABLE "apps" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repositoryUrl" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "starCount" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "apps_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "features" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "appId" UUID NOT NULL,
    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "requirements" (
    "id" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "appId" UUID NOT NULL,
    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "distributions" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "distributions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "app_distributions" (
    "id" UUID NOT NULL,
    "appId" UUID NOT NULL,
    "distributionId" UUID NOT NULL,
    "status" "SupportStatus" NOT NULL,
    CONSTRAINT "app_distributions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "apps_slug_key" ON "apps"("slug");
CREATE INDEX "apps_category_idx" ON "apps"("category");
CREATE UNIQUE INDEX "features_appId_position_key" ON "features"("appId", "position");
CREATE UNIQUE INDEX "requirements_appId_position_key" ON "requirements"("appId", "position");
CREATE UNIQUE INDEX "distributions_name_key" ON "distributions"("name");
CREATE UNIQUE INDEX "app_distributions_appId_distributionId_key" ON "app_distributions"("appId", "distributionId");

ALTER TABLE "features" ADD CONSTRAINT "features_appId_fkey" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_appId_fkey" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "app_distributions" ADD CONSTRAINT "app_distributions_appId_fkey" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "app_distributions" ADD CONSTRAINT "app_distributions_distributionId_fkey" FOREIGN KEY ("distributionId") REFERENCES "distributions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
