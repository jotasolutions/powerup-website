import "server-only"

import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable")
}

const stripe = new Stripe(stripeSecretKey)

export type StripeRecurringPrice = {
  amountInCents: number
  currency: string
  interval: "day" | "week" | "month" | "year"
}

export class StripeRepository {
  async getRecurringPrice(priceId: string): Promise<StripeRecurringPrice> {
    const price = await stripe.prices.retrieve(priceId)

    if (!price.unit_amount) {
      throw new Error(`Stripe price ${priceId} has no unit_amount`)
    }

    if (!price.recurring) {
      throw new Error(`Stripe price ${priceId} is not recurring`)
    }

    return {
      amountInCents: price.unit_amount,
      currency: price.currency.toUpperCase(),
      interval: price.recurring.interval,
    }
  }
}
