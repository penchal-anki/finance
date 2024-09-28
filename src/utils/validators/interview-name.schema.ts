import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const interviewNameSchema = z.object({
  interviewName: z.string().min(1, { message: messages.interViewNameIsRequired }).refine(value => value?.trim(), { message: messages.interViewNameIsRequired }),
});

// generate form types from zod validation schema
export type InterviewNameSchema = z.infer<typeof interviewNameSchema>;
