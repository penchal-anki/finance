import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const linkAccountSchema = z.object({
  companyName: z.string().min(1, { message: messages.companyNameIsRequired }),
  webSite: z.string().min(1, { message: messages.webSiteIsRequired }),
  phoneNumber: z
    .string({
      required_error: messages.phoneNumberIsRequired,
    })
    .min(2, { message: messages.phoneNumberIsRequired }),
  fullName: z.string().min(1, { message: messages.fullNameIsRequired }),
  email: validateEmail,
  address: z.string().min(1, { message: messages.addressIsRequired }),
  zipCode: z.string().min(1, { message: messages.zipCodeRequired }),
  city: z.string().min(1, { message: messages.cityIsRequired }),
  country: z.string().min(1, { message: messages.countryIsRequired }),
});

// generate form types from zod validation schema
export type CreateLinkAccount = z.infer<typeof linkAccountSchema>;
