import { z } from 'zod';

// form zod validation schema
export const categorySchema = z.object({
    categoryName: z.string().min(1, { message: 'Enter category name' }).refine(value => value?.trim(), { message: 'Enter category name' }),
    categoryDescription: z.string().min(1, { message: 'Enter category description' }).refine(value => value?.trim(), { message: 'Enter category description' }),
});

// generate form types from zod validation schema
export type AddCategorySchema = z.infer<typeof categorySchema>;
