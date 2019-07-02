import { Body, Controller, Post } from "@nestjs/common";

import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  add(@Body() product: Product): Product {
    // this.productsService.insert();
    product.id = String(Date.now())
    return product;
  }
}