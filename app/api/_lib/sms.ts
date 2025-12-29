import Twilio from "twilio";

export async function sendSMS(to: string, body: string) {
  // For now, Twilio is the implementation
  const client = Twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  return client.messages.create({
    to,
    from: process.env.TWILIO_FROM_NUMBER!,
    body,
  });
}

