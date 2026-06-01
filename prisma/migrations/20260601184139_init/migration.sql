-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "url" TEXT,
    "date" TEXT NOT NULL,
    "details" TEXT[],
    "stacks" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeHistory" (
    "id" TEXT NOT NULL,
    "orderNumber" SERIAL NOT NULL,
    "targetRole" TEXT NOT NULL,
    "targetCompany" TEXT NOT NULL,
    "cvPayload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeHistory_orderNumber_key" ON "ResumeHistory"("orderNumber");
