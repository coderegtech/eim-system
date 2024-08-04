import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async createCategories(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {

      return await this.prisma.categories.create({
        data: {
          name: createCategoryDto.name,
          description: createCategoryDto.description,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.prisma.categories.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchCategory(name: string): Promise<Category> {
    try {
      return await this.prisma.categories.findUnique({
        where: {name},
      });
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
