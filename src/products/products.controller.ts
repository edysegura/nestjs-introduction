import { Body, Controller, Get, Param, Post, Patch } from "@nestjs/common";

import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  add(@Body() product: Product): Product {
    const newProduct = this.productsService.create(product);
    return newProduct;
  }

  @Get()
  getAll(): Product[] {
    return this.productsService.list();
  }

  @Get(':id')
  getById(@Param('id') productId: string): Product {
    return this.productsService.getById(productId);
  }

  @Patch(':id')
  update(@Param('id') productId: string, @Body() product: Product) {
    return this.productsService.update(product, productId);
  }
}