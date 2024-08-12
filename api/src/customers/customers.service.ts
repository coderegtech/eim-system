import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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
  ): Promise<any> {
    try {
      const { name, email, address, phoneNumber, city, postalCode, country } =
        createCustomerDto;

      const foundCustomer = await this.findOneCustomer(email);

      if (foundCustomer) {
        return res
          .status(HttpStatus.CONFLICT)
          .send({ message: 'Customer already exist' });
      }

      const customeProfileImg = req.file.filename;
      const customer = await this.prisma.customers.create({
        data: {
          customerProfile: customeProfileImg,
          name,
          email,
          address,
          phoneNumber,
          city,
          postalCode,
          country,
        },
      });

      if (customer) {
        return res.send({
          status: 'success',
          message: 'Customer added',
        });
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
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
        orderBy: {
          createdAt: 'asc',
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

  async customersCount() {
    try {
      return await this.prisma.customers.count();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
