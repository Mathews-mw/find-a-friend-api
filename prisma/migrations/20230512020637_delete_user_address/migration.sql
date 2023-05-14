/*
  Warnings:

  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `users_address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_address" DROP CONSTRAINT "users_address_address_id_fkey";

-- DropForeignKey
ALTER TABLE "users_address" DROP CONSTRAINT "users_address_user_id_fkey";

-- DropIndex
DROP INDEX "users_cpf_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cpf";

-- DropTable
DROP TABLE "users_address";
