"use server"

import { StripeRepository } from "@/lib/stripe/stripe-repository"

export type PricingData = {
  monthlyPrice: string
  yearlyPrice: string
  monthlyPriceInCents: number
  yearlyPriceInCents: number
}

const stripeRepository = new StripeRepository()

function formatPrice(amountInCents: number, currency: string) {
  const amount = amountInCents / 100
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace(/\s/g, "")
}

export async function getPricingDataAction(): Promise<PricingData> {
  const monthlyPriceId = process.env.STRIPE_PRICE_PRO_MONTHLY
  const yearlyPriceId = process.env.STRIPE_PRICE_PRO_YEARLY

  if (!monthlyPriceId || !yearlyPriceId) {
    throw new Error("Missing STRIPE_PRICE_PRO_MONTHLY or STRIPE_PRICE_PRO_YEARLY environment variables")
  }

  const [monthlyPrice, yearlyPrice] = await Promise.all([
    stripeRepository.getRecurringPrice(monthlyPriceId),
    stripeRepository.getRecurringPrice(yearlyPriceId),
  ])

  return {
    monthlyPrice: formatPrice(monthlyPrice.amountInCents, monthlyPrice.currency),
    yearlyPrice: formatPrice(yearlyPrice.amountInCents, yearlyPrice.currency),
    monthlyPriceInCents: monthlyPrice.amountInCents,
    yearlyPriceInCents: yearlyPrice.amountInCents,
  }
}
