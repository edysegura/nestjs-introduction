import { Injectable } from "@nestjs/common";

import { Product } from "./product.model";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(product: Product): Product {
    const newProduct: Product = {
      id: String(Date.now()),
      ...product
    };
    this.products.push(newProduct)
    return newProduct;
  }

  list(): Product[] {
    return [...this.products];
  }
}