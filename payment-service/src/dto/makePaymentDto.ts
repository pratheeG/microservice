import { IsNotEmpty, IsNumber } from 'class-validator';

import { PaymentMode } from 'src/models/types/PaymentMode';
import { PaymentStatus } from 'src/models/types/PaymentStatus';

export class MakePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  status: PaymentStatus = PaymentStatus.PROCESSING;
  paymentMode: PaymentMode = PaymentMode.CASHONDELIVERY;
}
