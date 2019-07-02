import { Injectable } from "@nestjs/common";

import { Product } from "./product.model";

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insert(title: string, description: string, price: number) {
    const newProduct = new Product(
      String(Date.now()),
      title,
      description,
      price
    );
  }
}