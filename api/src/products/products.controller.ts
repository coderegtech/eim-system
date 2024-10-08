import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('productImg', {
      storage: diskStorage({
        destination: './uploads/productsImgs',
        filename: (req, file, cb) => {
          const newfilename =
            Date.now() +
            '-' +
            Math.round(Math.random() * 100) +
            extname(file.originalname);
          cb(null, newfilename);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 10,
      },
      fileFilter: (req, file, cb) => {
        const allowedFileTypes = ['.jpg', '.jpeg', '.png'];
        const ext = file.originalname
          .toLowerCase()
          .substring(file.originalname.lastIndexOf('.'));
        if (allowedFileTypes.includes(ext)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Invalid file type'), false);
        }
      },
    }),
  )
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Response() res,
    @Request() req,
  ) {
    return await this.productsService.addProduct(createProductDto, res, req);
  }

  @Get('all')
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get('search')
  searchProduct(@Query('name') name: string) {
    return this.productsService.searchProduct(name);
  }

  @Get('filter')
  filterCategory(@Query('category') name: string) {
    return this.productsService.filteredByCategory(name);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productsService.removeProduct(+id);
  }

  @Get('count')
  getProductsCount() {
    return this.productsService.productsCount();
  }
}
