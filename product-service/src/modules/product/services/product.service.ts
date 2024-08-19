import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateProductDto } from '../dto/product.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Product } from '../../../models/product.interface';

const delay = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, timeout);
  });
};
@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getProductDetails(productId: number): Promise<Product> {
    const product = await this.prismaService.product.findFirst({
      where: { id: productId },
    });
    if (!product) {
      throw new BadRequestException('No product found with id ' + productId);
    }
    return product;
  }
  public async getAllProducts(
    name: string,
    page: number,
    limit: number,
  ): Promise<Product[]> {
    await delay(2000);
    return await this.prismaService.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  public async createNewProduct(
    newProduct: CreateProductDto,
  ): Promise<Product> {
    return await this.prismaService.product.create({
      data: newProduct,
    });
  }

  public async deleteProduct(productId: number): Promise<Product> {
    return await this.prismaService.product.delete({
      where: { id: productId },
    });
  }
}
