import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './services/product.service';
import { Product } from '../../models/product.interface';
import { CreateProductDto, ListProductDto } from './dto/product.dto';
import { CustomLoggerService } from '../logger.service';
import { plainToClass } from 'class-transformer';
// import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

// @UseInterceptors(CacheInterceptor)
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Get(':productId')
  @UseInterceptors(ClassSerializerInterceptor)
  async getProductDetails(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<Product> {
    return this.productService.getProductDetails(productId);
  }

  @Get('')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  // @CacheKey('products')
  getAllProducts(@Query() query: ListProductDto): Promise<Product[]> {
    console.log('Inside get all');
    this.logger.log('Handling GET request for /product');
    return this.productService.getAllProducts(
      query.name,
      query.page,
      query.limit,
    );
  }

  @Post('')
  createNewProduct(@Body() newProduct: CreateProductDto): Promise<Product> {
    return this.productService.createNewProduct(newProduct);
  }

  @Delete(':id')
  removeProduct(@Param('id') productId: string) {
    return this.productService.deleteProduct(+productId);
  }
}
