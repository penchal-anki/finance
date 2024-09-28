import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const integrationSchema = z.object({
  accessToken: z.string().min(1, { message: messages.accessToken }).refine(value => value?.trim(), { message:  messages.accessToken }),
});

// generate form types from zod validation schema
export type IntegrationSchema = z.infer<typeof integrationSchema>;
