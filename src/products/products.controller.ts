import { Body, Controller, Get, Param, Post, Patch, Res, Req } from "@nestjs/common";

import { Product } from "./product.model";
import { ProductsService } from "./products.service";
import { Request, Response } from "express";

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  add(@Body() product: Product): Product {
    const newProduct = { ...this.productsService.create(product)};
    newProduct.links = this.productsService.fillHateoas();
    return newProduct;
  }

  @Get()
  getAll(@Req() request: Request, @Res() response: Response): Response {
    response.set('Links', `<${request.protocol}://${request.hostname}${request.url}?page=2>; rel="next"`);
    return response.send(this.productsService.list());
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