-- CreateTable
CREATE TABLE "orgs_users" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "orgs_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "orgs_users_org_id_user_id_idx" ON "orgs_users"("org_id", "user_id");

-- AddForeignKey
ALTER TABLE "orgs_users" ADD CONSTRAINT "orgs_users_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgs_users" ADD CONSTRAINT "orgs_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
