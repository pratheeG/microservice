import { IsNumber } from 'class-validator';

export class CartDto {
  @IsNumber()
  productId: number;
  @IsNumber()
  quantity: number;
}
