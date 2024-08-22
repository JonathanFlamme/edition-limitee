-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TANK', 'HEAL', 'DPS', 'CAC', 'CASU', 'PU');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "class" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CASU';
