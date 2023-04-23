import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from '../services';
import type { Cart } from '@models/types';


@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  checkout(@Body() body: { cart: Cart }) {
    try {
      return this.stripeService.checkout(body.cart);
    } catch (error) {
      return error;
    }
  }
}