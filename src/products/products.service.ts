import { Injectable, NotFoundException } from "@nestjs/common";

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

  getById(id: string): Product {
    const byId = (product: Product) => product.id === id;
    const product = this.products.find(byId)

    if (!product) {
      throw new NotFoundException('Could not found a product');
    }

    return { ...product }
  }
}