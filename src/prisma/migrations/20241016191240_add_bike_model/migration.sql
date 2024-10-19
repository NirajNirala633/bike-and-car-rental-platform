-- CreateTable
CREATE TABLE "Bike" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mileage" DOUBLE PRECISION NOT NULL,
    "photo" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Bike_pkey" PRIMARY KEY ("id")
);
