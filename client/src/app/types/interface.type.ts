export interface User {
  id?: number;
  username: string;
  password?: string;
}

export interface Product {
  id?: number;
  productImg?: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  categoryId: number;
  SupplierId: number;
  category?: Category;
  supplier?: Supplier;
}

export interface Category {
  id?: number;
  name: string;
  description: string;
}

export interface Supplier {
  id?: number;
  supplierName?: string;
  contactName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface Customers {
  customerProfile: string;
  name: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface Order {
  id?: number;
  customerId: number;
  productId: number;
  totalAmout: number;
  status: string;
  quantity: number;
  orderDate: Date;
}
