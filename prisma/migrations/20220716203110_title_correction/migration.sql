/*
  Warnings:

  - You are about to drop the column `tittle` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `tittle` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `tittle` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `tittle` on the `wifi` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `notes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `wifi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `wifi` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "cards_tittle_key";

-- DropIndex
DROP INDEX "credentials_tittle_key";

-- DropIndex
DROP INDEX "notes_tittle_key";

-- DropIndex
DROP INDEX "wifi_tittle_key";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "tittle",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "tittle",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "tittle",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "wifi" DROP COLUMN "tittle",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cards_title_key" ON "cards"("title");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_title_key" ON "credentials"("title");

-- CreateIndex
CREATE UNIQUE INDEX "notes_title_key" ON "notes"("title");

-- CreateIndex
CREATE UNIQUE INDEX "wifi_title_key" ON "wifi"("title");
