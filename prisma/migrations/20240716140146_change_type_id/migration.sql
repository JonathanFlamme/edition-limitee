/*
  Warnings:

  - The primary key for the `Contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Guild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Presentation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Search` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Presentation" DROP CONSTRAINT "Presentation_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Search" DROP CONSTRAINT "Search_guildId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guildId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Contact_id_seq";

-- AlterTable
ALTER TABLE "Guild" DROP CONSTRAINT "Guild_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Guild_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Guild_id_seq";

-- AlterTable
ALTER TABLE "Presentation" DROP CONSTRAINT "Presentation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guildId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Presentation_id_seq";

-- AlterTable
ALTER TABLE "Search" DROP CONSTRAINT "Search_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guildId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Search_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Search_id_seq";

-- AddForeignKey
ALTER TABLE "Presentation" ADD CONSTRAINT "Presentation_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Search" ADD CONSTRAINT "Search_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
