import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async addProduct(
    createProductDto: CreateProductDto,
    res: Response,
    req: Request,
  ): Promise<any> {
    try {
      const filename = req.file.filename;

      const product = await this.prisma.products.create({
        data: {
          productImg: filename,
          name: createProductDto.name,
          categoryId: Number(createProductDto.categoryId),
          price: Number(createProductDto.price),
          description: createProductDto.description,
          quantity: Number(createProductDto.quantity),
          supplierId: Number(createProductDto.supplierId),
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          supplier: {
            select: {
              supplierName: true,
              city: true,
              country: true,
            },
          },
        },
      });

      if (product) {
        return res
          .status(HttpStatus.CREATED)
          .send({ status: 'success', message: 'Product added', data: product });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllProducts(): Promise<any[]> {
    try {
      return await this.prisma.products.findMany({
        include: {
          category: {
            select: {
              name: true,
            },
          },
          supplier: {
            select: {
              supplierName: true,
              city: true,
              country: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async filteredByCategory(name: string): Promise<any[]> {
    try {
      return await this.prisma.products.findMany({
        where: {
          category: {
            name: {
              contains: name,
            },
          },
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          supplier: {
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

  async searchProduct(name: string): Promise<any[]> {
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
          supplier: {
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
  ): Promise<any> {
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
      const product = await this.prisma.products.delete({
        where: { id },
      });

      if (product) {
        const productImgName = product.productImg;
        const filePath = '../../uploads/productsImg/' + productImgName;
        fs.unlinkSync(filePath);

        return product;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async productsCount() {
    try {
      return await this.prisma.products.count();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
