import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async addProduct(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<Product> {
    try {
      const { name, categoryId, price, description, quantity, supplierId } =
        createProductDto;

      const productImgName = file.filename;

      const product = await this.prisma.products.create({
        data: {
          productImg: productImgName,
          name,
          categoryId,
          price,
          description,
          quantity,
          supplierId,
        },
      });

      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.prisma.products.findMany({
        include: {
          category: {
            select: {
              name: true,
            },
          },
          Supplier: {
            select: {
              supplierName: true,
              city: true,
              country: true,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchProduct(name: string): Promise<Product[]> {
    try {
      return await this.prisma.products.findMany({
        where: {
          name: { contains: name },
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          Supplier: {
            select: {
              supplierName: true,
              city: true,
              country: true,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.prisma.products.update({
        where: { id },
        data: { ...updateProductDto },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeProduct(id: number): Promise<Product> {
    try {
      return await this.prisma.products.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
