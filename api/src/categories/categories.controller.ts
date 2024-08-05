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

  @Post('create')
  async createCategory(
    res: Response,
    @Body() createCategoryDto: CreateCategoryDto,
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
}
