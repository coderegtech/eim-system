import { BadRequestException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    req: Request,
    res: Response,
  ) {
    const { name, email, address, phoneNumber, city, postalCode, country } =
      createCustomerDto;

    const foundCustomer = await this.findOneCustomer(email);

    if (foundCustomer) throw new BadRequestException('Customer already exist');

    const filename = req.file.filename;
    const addCustomer = await this.prisma.customers.create({
      data: {
        customerProfile: filename,
        name,
        email,
        address,
        phoneNumber,
        city,
        postalCode,
        country,
      },
    });

    if (!addCustomer) throw new BadRequestException();

    // display the added customer but  exclude password
    const addedCustomer = await this.findOneCustomer(addCustomer.email);
    console.log(addedCustomer);

    return addedCustomer;
  }

  async getAllCustomers() {
    try {
      return await this.prisma.customers.findMany({
        select: {
          customerProfile: true,
          id: true,
          name: true,
          email: true,
          address: true,
          phoneNumber: true,
          city: true,
          postalCode: true,
          country: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneCustomer(email: string) {
    try {
      const customer = await this.prisma.customers.findUnique({
        where: {
          email,
        },
        select: {
          customerProfile: true,
          id: true,
          name: true,
          email: true,
          address: true,
          phoneNumber: true,
          city: true,
          postalCode: true,
          country: true,
        },
      });

      console.log(customer);
      return customer;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchCustomer(name: string) {
    try {
      const customers = await this.prisma.customers.findMany({
        where: {
          name: { contains: name },
        },
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          phoneNumber: true,
          city: true,
          postalCode: true,
          country: true,
        },
      });

      console.log(customers);
      return customers;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateCustomer(id: number, updateCostumerDto: UpdateCustomerDto) {
    try {
      return await this.prisma.customers.update({
        where: { id },
        data: {
          ...updateCostumerDto,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeCustomer(id: number) {
    try {
      return await this.prisma.customers.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
