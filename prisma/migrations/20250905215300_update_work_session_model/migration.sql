/*
  Warnings:

  - You are about to drop the column `endedAt` on the `WorkSession` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `WorkSession` table. All the data in the column will be lost.
  - Added the required column `durationMinutes` to the `WorkSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionDate` to the `WorkSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."WorkSession" DROP COLUMN "endedAt",
DROP COLUMN "startedAt",
ADD COLUMN     "durationMinutes" INTEGER NOT NULL,
ADD COLUMN     "sessionDate" TIMESTAMP(3) NOT NULL;
