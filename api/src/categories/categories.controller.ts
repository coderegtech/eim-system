import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    return await this.categoriesService.createCategories(
      res,
      createCategoryDto,
    );
  }

  @Get('all')
  async findAllCategory() {
    return await this.categoriesService.getAllCategories();
  }

  @Get('search')
  async searchCategory(@Query('q') name: string) {
    return await this.categoriesService.searchCategory(name);
  }

  @Patch('update/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @Delete('delete/:id')
  async removeCategory(@Param('id') id: string) {
    return await this.categoriesService.removeCategory(+id);
  }

  @Get('count')
  async getCategoryCount() {
    return await this.categoriesService.categoryCount();
  }
}
