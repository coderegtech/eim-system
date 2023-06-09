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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('addCustomer')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/customerProfiles',
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
  async createCustomer(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCustomerDto: CreateCustomerDto,
    @Request() req,
    @Response() res,
  ) {
    console.log(file);

    return await this.customersService.createCustomer(
      createCustomerDto,
      req,
      res,
    );
  }

  @Get()
  async findAllCustomers() {
    return await this.customersService.getAllCustomers();
  }

  @Get('search')
  searchCustomer(@Query('name') name: string) {
    return this.customersService.searchCustomer(name);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.updateCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.removeCustomer(id);
  }
}
