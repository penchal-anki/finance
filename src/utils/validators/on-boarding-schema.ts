import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const onBoardingSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().optional(),
  phoneNumber: z
  .string({
    required_error: messages.phoneNumberIsRequired,
  })
  .min(2, { message: messages.phoneNumberIsRequired }),
  // gender: z.enum(['Male', 'Female']).refine(data => data !== undefined, {
  //   message: 'Please select a valid gender.',
  // }),
});

// generate form types from zod validation schema
export type OnBoardingSchemaCreate = z.infer<typeof onBoardingSchema>;
