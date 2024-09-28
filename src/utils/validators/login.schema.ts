import { z } from 'zod';
import {
  validateEmail,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const loginSchema = z.object({
  email: validateEmail,
});

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
