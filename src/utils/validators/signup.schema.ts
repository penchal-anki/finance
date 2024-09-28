import { z } from 'zod';
import {
  validateEmail,
} from '@/utils/validators/common-rules';
import { messages } from '@/config/messages';

// form zod validation schema
export const signUpSchema = z.object({
  // firstName: z.string().min(1, { message: messages.firstNameRequired }),
  // lastName: z.string().optional(),
  email: validateEmail,
  fullName: z.string().min(1, { message: messages.fullNameIsRequired }).refine(value => value?.trim(), { message: messages.fullNameIsRequired }),
  orgName: z.string().min(1, { message: messages.orgNameIsRequired }).refine(value => value?.trim(), { message: messages.orgNameIsRequired }),
  // password: validatePassword,
  // confirmPassword: validateConfirmPassword,
  // isAgreed: z.boolean(),
});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
