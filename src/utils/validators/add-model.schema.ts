import { z } from 'zod';

// form zod validation schema
export const addModelSchema = z.object({
  modelName: z.string().min(1, { message: 'Enter model name' }).refine(value => value?.trim(), { message: 'Enter model name' }),
  modelDescription: z.string().min(1, { message: 'Enter model description' }).refine(value => value?.trim(), { message: 'Enter model description' }),
});

// generate form types from zod validation schema
export type AddModelSchema = z.infer<typeof addModelSchema>;
