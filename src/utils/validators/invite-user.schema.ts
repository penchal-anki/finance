import { z } from 'zod';
import {
  validateEmail,
} from '@/utils/validators/common-rules';
import { messages } from '@/config/messages';

// form zod validation schema
export const inviteUserSchema = z.object({
  email: validateEmail,
  name: z.string().min(1, { message: messages.fullNameIsRequired }).refine(value => value?.trim(), { message: messages.fullNameIsRequired }),
  role: z.string().min(1, { message: messages.userRoleIsRequired }).refine(value => value?.trim(), { message: 'Custom error message for role field' })

});

// generate form types from zod validation schema
export type InviteUserInput = z.infer<typeof inviteUserSchema>;
