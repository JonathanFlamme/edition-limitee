/*
  Warnings:

  - You are about to drop the column `id_character` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `DateTime` on the `Mythic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Guild` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[characterId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `characterId` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Mythic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `Mythic` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Member_id_character_key";

-- AlterTable
ALTER TABLE "Guild" ADD COLUMN     "mythicDescription" TEXT,
ADD COLUMN     "mythicTarget" INTEGER;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "id_character",
ADD COLUMN     "characterId" INTEGER NOT NULL,
ADD COLUMN     "colorRating" JSONB,
ADD COLUMN     "periodIdMythic" INTEGER,
ALTER COLUMN "ilvl" DROP NOT NULL,
ALTER COLUMN "rank" DROP NOT NULL,
ALTER COLUMN "mythicRating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Mythic" DROP COLUMN "DateTime",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "period" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Guild_name_key" ON "Guild"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Member_characterId_key" ON "Member"("characterId");
