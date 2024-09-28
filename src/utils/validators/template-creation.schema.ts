import { z } from 'zod';
import { messages } from '@/config/messages';

export const templateCreationSchema = z.object({
    templateName: z.string().min(1, { message: messages.templateNameIsRequired }).refine(value => value?.trim(), { message: messages.templateNameIsRequired }),
    questionDescription: z.string().min(1, { message: messages.descriptionIsRequired }).refine(value => value?.trim(), { message: messages.descriptionIsRequired }),
    language: z.string().min(1, { message: messages.thisFieldIsRequired }).refine(value => value?.trim(), { message: messages.thisFieldIsRequired  }),
    codeInput: z.string().min(1, { message: messages.thisFieldIsRequired}).refine(value => value?.trim(), { message: messages.thisFieldIsRequired }),
    solution: z.string().min(1, { message: messages.thisFieldIsRequired}).refine(value => value?.trim(), { message: messages.thisFieldIsRequired })
  });
  
  // generate form types from zod validation schema
  export type TemplateCreationSchema = z.infer<typeof templateCreationSchema>;