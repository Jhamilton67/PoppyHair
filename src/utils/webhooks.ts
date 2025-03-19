import { Database } from '../types/database.types';

type Appointment = Database['public']['Tables']['appointments']['Row'];

/**
 * Sends appointment data to a Make.com webhook
 * @param appointmentData The appointment data to send
 * @returns A promise that resolves when the webhook is called
 */
export const sendToMakeWebhook = async (appointmentData: Omit<Appointment, 'id' | 'created_at'> & {
  booking_source?: string;
  timestamp?: string;
}): Promise<boolean> => {
  const webhookUrl = 'https://hook.eu2.make.com/cx7030ccdoxpxhsyqsblkxxfbwdpmlao';
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    
    if (!response.ok) {
      console.error('Webhook call failed:', await response.text());
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending data to webhook:', error);
    return false;
  }
};