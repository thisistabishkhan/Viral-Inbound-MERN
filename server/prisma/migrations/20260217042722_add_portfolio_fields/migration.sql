/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "gallery" JSONB,
ADD COLUMN     "projectInfo" JSONB,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "subtitle" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_slug_key" ON "Portfolio"("slug");
