import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const addOrder = await this.prisma.orders.create({
        data: {
          customerId: createOrderDto.customerId,
          productId: createOrderDto.productId,
          totalAmount: createOrderDto.totalAmount,
          status: createOrderDto.status,
          quantity: createOrderDto.quantity,
          orderDate: createOrderDto.orderDate,
        },
        include: {
          customer: {
            select: {
              customerProfile: true,
              name: true,
              address: true,
            },
          },
          product: {
            select: {
              productImg: true,
              name: true,
              price: true,
              quantity: true,
            },
          },
        },
      });

      if (!addOrder) throw new BadRequestException();

      return addOrder;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.prisma.orders.findMany({
        include: {
          customer: {
            select: {
              customerProfile: true,
              name: true,
              address: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      if (!orders) throw new BadRequestException();

      return orders;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
