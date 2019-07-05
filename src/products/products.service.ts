import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';

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
    const [product] = this.findProduct(id)

    if (!product) {
      throw new NotFoundException('Could not found a product');
    }

    return { ...product }
  }

  private findProduct(id: string): [Product, number] {
    const byId = (product: Product) => product.id === id;
    const index = this.products.findIndex(byId)
    const product = this.products[index]
    return [product, index]
  }
}