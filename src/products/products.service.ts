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
    const [product] = this.findProduct(id);

    this.checkProduct(product);

    return { ...product };
  }

  update(updatedProduct: Product, id: string) {
    const [product, index] = this.findProduct(id);

    this.checkProduct(product);

    const mergedProject = { ...product, ...updatedProduct };
    this.products[index] = mergedProject;

    return { ...mergedProject };
  }

  fillHateoas(): any[] {
    return [
      {
        "rel": "add_product",
        "href": "/product",
        "method": "POST"
      },
      {
        "rel": "delete_product",
        "href": "/product/{?productId}",
        "method": "DELETE"
      },
      {
        "rel": "update_product",
        "href": "/product/{?productId}",
        "method": "PATCH"
      },
      {
        "rel": "get_product",
        "href": "/product/{?productId}",
        "method": "GET"
      },
      {
        "rel": "list_product",
        "href": "/product",
        "method": "GET"
      }
    ];
  }

  private findProduct(id: string): [Product, number] {
    const byId = (product: Product) => product.id === id;
    const index = this.products.findIndex(byId);
    let product: Product;

    if (index > -1) {
      product = this.products[index];
    }

    return [product, index];
  }

  private checkProduct(product: Product) {
    if (!product) {
      throw new NotFoundException('Could not found a product');
    }
  }
}