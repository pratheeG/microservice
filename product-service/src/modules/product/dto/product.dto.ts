import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  name: string;
  price: number;
}

export class ListProductDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsNumber()
  page: number = 1;
  @IsNumber()
  limit: number = 20;
}
