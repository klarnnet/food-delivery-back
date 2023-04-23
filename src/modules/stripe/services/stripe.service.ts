import { Config } from '@core/config';
import type { Cart } from '@models/types';
import { Injectable } from '@nestjs/common';

import Stripe from 'stripe';


@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(Config.get.stripe, {
      apiVersion: '2022-11-15',
    });
  }

  checkout(cart: Cart) {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.count * item.coast,
      0,
    );

    console.log(this.stripe)

    return this.stripe.paymentIntents.create({
      amount: +totalPrice.toFixed(2) * 100, 
      currency: 'usd', 
      payment_method_types: ['card'],
    });
  }
}