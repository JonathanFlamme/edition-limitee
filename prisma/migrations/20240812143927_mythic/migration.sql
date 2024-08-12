/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Guild` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Guild" ADD COLUMN     "mythicDescription" TEXT,
ADD COLUMN     "mythicTarget" INTEGER;

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "realm" TEXT NOT NULL,
    "ilvl" TEXT,
    "rank" INTEGER,
    "periodIdMythic" INTEGER,
    "mythicRating" INTEGER,
    "colorRating" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mythic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "key" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Mythic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_characterId_key" ON "Member"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_name_key" ON "Guild"("name");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mythic" ADD CONSTRAINT "Mythic_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
