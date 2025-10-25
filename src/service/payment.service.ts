import axiosInstance from "./axiosInstance";

class PaymentService {
  // Capture payment and create Razorpay order
  public async capturePayment(courses: string[], token: string) {
    try {
      const res = await axiosInstance.post(`/payment/capturePayment`, { courses }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }

  // Verify payment signature
  public async verifyPayment(paymentData: any, token: string) {
    try {
      const res = await axiosInstance.post(`/payment/verifyPayment`, paymentData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }

  // Send payment success email
  public async sendPaymentSuccessEmail(paymentData: any, token: string) {
    try {
      const res = await axiosInstance.post(`/payment/sendPaymentSuccessEmail`, paymentData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }


}

export const paymentService = new PaymentService();