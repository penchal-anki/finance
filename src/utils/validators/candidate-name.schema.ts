import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const candidateNameSchema = z.object({
  name: z.string().min(1, { message: messages.interViewNameIsRequired }).refine(value => value?.trim(), { message: messages.interViewNameIsRequired }),
});

// generate form types from zod validation schema
export type CandidateNameSchema = z.infer<typeof candidateNameSchema>;
