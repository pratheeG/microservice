import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartDto, OrderDto } from './dto/cart.dto';
import { CartService } from './services/cart.service';
import { Cart } from '@prisma/client';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post('')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  addProductsToCart(@Body() cart: CartDto): Promise<Cart> {
    return this.cartService.addProductToCart(cart);
  }

  @Get('')
  async getCartProducts() {
    const cartElements = await this.cartService.getCartProducts();
    const totalCartPrice =
      this.cartService.calculateTotalCartPrice(cartElements);
    return { cartElements, totalCartPrice };
  }

  @Post('make-order')
  makeOrder(@Body() order: OrderDto): Promise<void> {
    return this.cartService.makeOrder(order.cartIds);
  }
}
