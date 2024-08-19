import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartDto } from './dto/cart.dto';
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
  getCartProducts() {
    return this.cartService.getCartProductsOfUser();
  }

  @Post('buy')
  buyProductInCart(@Body() cartIds: number[]): Promise<void> {
    return this.cartService.buyProduct(cartIds);
  }
}
