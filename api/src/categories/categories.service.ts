import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async categoryCount() {
    try {
      return await this.prisma.categories.count();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createCategories(
    res: Response,
    categoryDto: CreateCategoryDto,
  ): Promise<any> {
    try {
      const isCategoryExist = await this.prisma.categories.findUnique({
        where: { name: categoryDto.name },
      });
      if (isCategoryExist) {
        return res
          .status(HttpStatus.CONFLICT)
          .send({ status: 'error', message: 'Category already exist' });
      }

      const category = await this.prisma.categories.create({
        data: {
          name: categoryDto.name,
          description: categoryDto.description,
        },
      });

      if (category) {
        return res.status(HttpStatus.CREATED).send({
          status: 'success',
          message: 'Category added',
          data: category,
        });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.prisma.categories.findMany({
        orderBy: {
          createdAt: 'asc',
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchCategory(name: string): Promise<Category[]> {
    try {
      const category = await this.prisma.categories.findUnique({
        where: {
          name,
        },
      });

      if (!category) {
        throw new BadRequestException('No category found');
      }

      return [category];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      return await this.prisma.categories.update({
        where: { id },
        data: { ...updateCategoryDto },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeCategory(id: number): Promise<Category> {
    try {
      return await this.prisma.categories.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
