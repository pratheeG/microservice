import { Cart } from 'src/models/cart.interface';
import { CartDto } from '../dto/cart.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CartService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('PAYMENT_MICROSERVICE') private readonly paymentClient: ClientKafka,
  ) {}
  public async addProductToCart(cart: CartDto): Promise<Cart> {
    return await this.prismaService.cart.create({
      data: cart,
    });
  }
  public async getCartProducts(cartIds: number[] = []): Promise<Cart[]> {
    const filterCondition = {
      include: {
        product: true,
      },
    };
    if (cartIds.length) {
      filterCondition['where'] = {
        id: { in: cartIds },
      };
    }
    return await this.prismaService.cart.findMany(filterCondition);
  }

  public calculateTotalCartPrice(cartElements: Cart[]) {
    return cartElements.reduce(
      (acc, val) => acc + val.quantity * val.product.price,
      0,
    );
  }

  public async makeOrder(cartIds: number[]): Promise<void> {
    const data = {
      productId: 12,
      amount: 2,
      status: 'Processing',
      paymentMode: 'Card',
    };
    const cartDetails = await this.getCartProducts(cartIds);
    console.log('cartDetails', cartDetails);
    this.paymentClient.emit('process_payment', data);
    return;
  }
}
