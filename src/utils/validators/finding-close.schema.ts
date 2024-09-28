import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const closeFindingSchema = z.object({
    closedComments: z.string().min(1, { message: messages.closedComment }).refine(value => value?.trim(), { message: messages.closedComment }),
});

// generate form types from zod validation schema
export type CloseFindingSchema = z.infer<typeof closeFindingSchema>;
