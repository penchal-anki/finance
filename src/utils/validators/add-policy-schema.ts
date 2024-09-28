import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const addPolicySchema = z.object({
    category: z.string().min(1, { message: "Category is required" }).refine(value => value?.trim(), { message: "Category is required" }),
    policy: z.string().min(1, { message: "Policy is required" }).refine(value => value?.trim(), { message: "Policy is required" }),
    severity: z.string().min(1, { message: "Severity is required" }).refine(value => value?.trim(), { message: "Severity is required" }),
    description: z.string().min(1, { message: messages.descriptionIsRequired }).refine(value => value?.trim(), { message: messages.descriptionIsRequired }),
});

// generate form types from zod validation schema
export type AddPolicySchema = z.infer<typeof addPolicySchema>;
