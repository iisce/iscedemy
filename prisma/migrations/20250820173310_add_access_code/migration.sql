ALTER TABLE "awarenessProgramRegistrations"
ADD COLUMN "accessCode" TEXT;

-- Add unique constraint
CREATE UNIQUE INDEX "awarenessProgramRegistrations_accessCode_key" ON "awarenessProgramRegistrations" ("accessCode");