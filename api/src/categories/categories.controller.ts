import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.createCategories(createCategoryDto);
  }

  @Get()
  async findAllCategory() {
    return await this.categoriesService.getAllCategories();
  }

  @Get('search')
  async searchCategory(@Query('name') name: string) {
    return await this.categoriesService.searchCategory(name);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return await this.categoriesService.removeCategory(+id);
  }
}
