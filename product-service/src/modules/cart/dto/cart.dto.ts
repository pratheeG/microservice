import { IsNumber } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CartDto {
  @IsNumber()
  productId: number;
  @IsNumber()
  quantity: number;
}

export class OrderDto {
  cartIds: number[];
  @Optional()
  price: number;
}
