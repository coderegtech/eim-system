export interface Order {
  customerId: number;
  productId: number;
  totalAmout: number;
  status: string;
  quantity: number;
  orderDate: Date;
}

// interface OrderItems {
//   orderId: number;
//   productId: number;
//   quantity: number;
//   price: number;
// }
