export interface Order {
  customerId: number;
  totalAmout: number;
  status: string;
  orderDate: Date;
  orderItems: OrderItems[];
}

interface OrderItems {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}
