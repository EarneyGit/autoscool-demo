import { api } from './api';

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface CreatePaymentIntentRequest {
  courseId: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  metadata?: Record<string, string>;
}

export interface PaymentConfirmation {
  paymentIntentId: string;
  enrollmentId?: string;
  status: string;
  message: string;
}

class PaymentService {
  async createPaymentIntent(data: CreatePaymentIntentRequest): Promise<PaymentIntent> {
    try {
      const response = await api.post('/payments/create-payment-intent', data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to create payment intent';
      throw new Error(errorMessage);
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<PaymentConfirmation> {
    try {
      const response = await api.post('/payments/confirm-payment', {
        paymentIntentId,
      });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to confirm payment';
      throw new Error(errorMessage);
    }
  }

  async getPaymentStatus(paymentIntentId: string): Promise<unknown> {
    try {
      const response = await api.get(`/payments/${paymentIntentId}`);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to get payment status';
      throw new Error(errorMessage);
    }
  }

  async getPaymentHistory(): Promise<unknown[]> {
    try {
      const response = await api.get('/payments/history');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to get payment history';
      throw new Error(errorMessage);
    }
  }
}

export const paymentService = new PaymentService();