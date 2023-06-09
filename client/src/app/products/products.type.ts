export interface Product {
  productImg: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: Category;
  Supplier: Supplier;
}

export interface Category {
  id?: number;
  name: string;
  description?: string;
}

export interface Supplier {
  supplierName?: string;
  contactName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}
