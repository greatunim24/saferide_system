'use server';
/**
 * @fileOverview A flow for generating a ride-sharing message.
 *
 * - shareRide - A function that creates a shareable text message with ride details.
 * - ShareRideInput - The input type for the shareRide function.
 * - ShareRideOutput - The return type for the shareRide function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ShareRideInputSchema = z.object({
  destination: z.string().describe('The final destination of the ride.'),
  driverName: z.string().describe("The driver's name."),
  licensePlate: z.string().describe("The vehicle's license plate number."),
  provider: z.string().describe('The e-hailing service provider (e.g., Uber, Bolt).'),
});
export type ShareRideInput = z.infer<typeof ShareRideInputSchema>;

export type ShareRideOutput = z.infer<typeof ShareRideOutputSchema>;
const ShareRideOutputSchema = z.object({
  message: z.string().describe('The generated shareable message.'),
});

export async function shareRide(input: ShareRideInput): Promise<ShareRideOutput> {
  return shareRideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'shareRidePrompt',
  input: { schema: ShareRideInputSchema },
  output: { schema: ShareRideOutputSchema },
  prompt: `
    You are a helpful assistant for a ride-hailing app called SafeRide.
    Your task is to generate a concise and clear safety message that a user can share with a friend or family member.
    The message should include all the necessary details for the recipient to know the user's whereabouts.

    Generate a message with the following information:
    - E-hailing provider: {{{provider}}}
    - Destination: {{{destination}}}
    - Driver's name: {{{driverName}}}
    - Vehicle license plate: {{{licensePlate}}}

    The tone should be friendly and reassuring. Start the message with "Hi! Just sharing my ride details with you for safety:".
  `,
});

const shareRideFlow = ai.defineFlow(
  {
    name: 'shareRideFlow',
    inputSchema: ShareRideInputSchema,
    outputSchema: ShareRideOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
