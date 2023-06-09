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
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.createSupplier(createSupplierDto);
  }

  @Get()
  findAllSuppliers() {
    return this.suppliersService.getAllSuppliers();
  }

  @Get('search')
  searchSupplier(@Query('text') text: string) {
    return this.suppliersService.searchSupplier(text);
  }

  @Patch(':id')
  updateSupplier(
    @Param('id') id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.updateSupplier(id, updateSupplierDto);
  }

  @Delete(':id')
  removeSupplier(@Param('id') id: number) {
    return this.suppliersService.removeSupplier(id);
  }
}
