import { Body, Controller, Post, Get } from "@nestjs/common";

import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  add(@Body() product: Product): Product {
    const newProduct = this.productsService.create(product)
    return newProduct;
  }

  @Get()
  getAll(): Product[] {
    return this.productsService.list();
  }
}