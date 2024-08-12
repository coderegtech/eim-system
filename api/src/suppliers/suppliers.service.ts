import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async supplierCount() {
    try {
      return await this.prisma.suppliers.count();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createSupplier(createSupplierDto: CreateSupplierDto, res: Response) {
    try {
      const foundSupplier = await this.findOneSupplier(createSupplierDto.email);

      if (foundSupplier) {
        return res.status(409).send({ message: 'Supplier already exist' });
      }

      const supplier = await this.prisma.suppliers.create({
        data: { ...createSupplierDto },
      });

      if (supplier) {
        return res.status(HttpStatus.CREATED).send({
          status: 'success',
          message: 'Supplier added',
          data: supplier,
        });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllSuppliers() {
    try {
      return await this.prisma.suppliers.findMany({
        orderBy: {
          createdAt: 'asc',
        },
      });
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

  removeSupplier(id: number) {
    return this.prisma.suppliers.delete({ where: { id } });
  }
}
