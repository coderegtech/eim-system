import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async createSupplier(createSupplierDto: CreateSupplierDto) {
    try {
      const {
        supplierName,
        contactName,
        phoneNumber,
        email,
        address,
        city,
        postalCode,
        country,
      } = createSupplierDto;

      const foundSupplier = await this.findOneSupplier(email);

      if (foundSupplier)
        throw new BadRequestException('Supplier already exist');

      const addSupplier = await this.prisma.suppliers.create({
        data: {
          supplierName,
          contactName,
          phoneNumber,
          email,
          address,
          city,
          postalCode,
          country,
        },
      });

      if (!addSupplier) throw new BadRequestException();

      return addSupplier;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllSuppliers() {
    try {
      return await this.prisma.suppliers.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneSupplier(email: string) {
    try {
      return await this.prisma.suppliers.findUnique({ where: { email } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchSupplier(text: string) {
    try {
      return await this.prisma.suppliers.findMany({
        where: {
          OR: [
            {
              email: { contains: text },
            },
            {
              supplierName: { contains: text },
            },
            {
              contactName: { contains: text },
            },
          ],
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateSupplier(id: number, updateSupplierDto: UpdateSupplierDto) {
    try {
      return await this.prisma.suppliers.update({
        where: { id },
        data: { ...updateSupplierDto },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeSupplier(id: number) {
    try {
      return await this.prisma.suppliers.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
