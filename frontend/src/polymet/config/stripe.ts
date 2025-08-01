import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const stripePublishableKey = 'pk_test_your_stripe_publishable_key_here';

// Initialize Stripe
export const stripePromise = loadStripe(stripePublishableKey);

// Stripe configuration
export const stripeConfig = {
  publishableKey: stripePublishableKey,
  apiVersion: '2023-10-16' as const,
  locale: 'en' as const,
};

// Payment methods configuration
export const paymentMethodsConfig = {
  card: {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  },
};

// Currency configuration
export const currencyConfig = {
  default: 'CHF',
  symbol: 'CHF',
  locale: 'de-CH',
};