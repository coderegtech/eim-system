import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Response,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post('create')
  createSupplier(
    @Body() createSupplierDto: CreateSupplierDto,
    @Response() res,
  ) {
    return this.suppliersService.createSupplier(createSupplierDto, res);
  }

  @Get('all')
  findAllSuppliers() {
    return this.suppliersService.getAllSuppliers();
  }

  @Get('search')
  searchSupplier(@Query('q') q: string) {
    return this.suppliersService.searchSupplier(q);
  }

  @Patch('update/:id')
  updateSupplier(
    @Param('id') id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.updateSupplier(id, updateSupplierDto);
  }

  @Delete('delete/:id')
  async removeSupplier(@Param('id') id: string, @Response() res) {
    try {
      const delSupplier = await this.suppliersService.removeSupplier(+id);

      if (delSupplier) {
        return res.send({ status: 'success', message: 'Supplier deleted' });
      }
    } catch (err) {
      return res.send({ status: 'error', message: err.message });
    }
  }

  @Get('count')
  async getSupplierCount() {
    return await this.suppliersService.supplierCount();
  }
}
