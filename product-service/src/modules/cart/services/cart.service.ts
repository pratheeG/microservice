import { Cart } from 'src/models/cart.interface';
import { CartDto } from '../dto/cart.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CartService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('CART_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}
  public async addProductToCart(cart: CartDto): Promise<Cart> {
    return await this.prismaService.cart.create({
      data: cart,
    });
  }
  public async getCartProductsOfUser(): Promise<Cart[]> {
    return await this.prismaService.cart.findMany({
      include: {
        product: true,
      },
    });
  }

  public async buyProduct(cartIds: number[]): Promise<void> {
    this.authClient.emit('create_user', 'Hello');
    return;
  }
}
