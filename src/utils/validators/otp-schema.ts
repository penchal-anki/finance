import { messages } from '@/config/messages';
import { z } from 'zod';

// form zod validation schema
export const otpSchema = z.object({
  otp: z.string().refine((value: string | any[]) => value.length === 6, messages.otpRequired)
});

// generate form types from zod validation schema
export type OtpSchema = z.infer<typeof otpSchema>;
