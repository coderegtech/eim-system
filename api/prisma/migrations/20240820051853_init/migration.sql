/*
  Warnings:

  - You are about to drop the column `supplierCompanyName` on the `Suppliers` table. All the data in the column will be lost.
  - You are about to drop the `OrderItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `Products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `supplierId` on table `Products` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `supplierName` to the `Suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OrderItems` DROP FOREIGN KEY `OrderItems_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItems` DROP FOREIGN KEY `OrderItems_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Products` DROP FOREIGN KEY `Products_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Products` DROP FOREIGN KEY `Products_supplierId_fkey`;

-- AlterTable
ALTER TABLE `Orders` ADD COLUMN `productId` INTEGER NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Products` MODIFY `categoryId` INTEGER NOT NULL,
    MODIFY `supplierId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Suppliers` DROP COLUMN `supplierCompanyName`,
    ADD COLUMN `supplierName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `OrderItems`;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
