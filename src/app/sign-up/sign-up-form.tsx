'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold, PiSpinnerGap } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';
import { handleResponseMiddleWare, postOptions } from '@/services';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { clientHandleApiResponse } from '@/services';

const initialValues = {
  email: '',
  fullName: '',
};

export default function SignUpForm() {
  const [reset, setReset] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter();
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    try {
      setIsSubmitting(true)
      const response = await fetch(
        `${process.env.RS_API_URL}/user/signup`,
        postOptions({
          payload: {
            email: data?.email,
            name: data?.fullName?.trim(),
            orgName: data.orgName?.trim(),
          }
        })
      );

      await clientHandleApiResponse({ apiResponse: response })
      if (response.status === 201) {
        toast.success("Sign-up successful")
        router.push(routes.invitation);
      } else {
        setIsSubmitting(false)
        setError(true)
      }
    } catch (error) {
      setIsSubmitting(false)
      toast.error("Something went wrong..!")
    }
  };

  return (
    <>

      <div className='mb-8'>
        <div className='text-3xl font-semibold text-gray-900 mb-2'>Sign up</div>
        <div className='text-md text-gray-600'>Start journey</div>
      </div>

      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="text"
              size="lg"
              label="Full Name"
              className="[&>label>span]:font-medium border-gray-300 ring-gray-300 text-gray-500"
              inputClassName="h-11 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
              color="info"
              placeholder="Enter your full name"
              {...register('fullName')}
              error={errors.fullName?.message}
            />
            <Input
              type="email"
              size="lg"
              label="Email"
              className="[&>label>span]:font-medium border-gray-300 ring-gray-300 text-gray-500"
              inputClassName="h-11 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
              color="info"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              type="text"
              size="lg"
              label="Organization Name"
              className="[&>label>span]:font-medium border-gray-300 ring-gray-300 text-gray-500"
              inputClassName="h-11 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
              color="info"
              placeholder="Enter your organization name"
              {...register('orgName')}
              error={errors.orgName?.message}
            />
            <Button
              size="lg"
              color="primary"
              type="submit"
            // className="col-span-2 mt-2 bg-blue text-white"
            >
              <span>Sign Up</span>{' '}
              {
                isSubmitting ?
                  <PiSpinnerGap className="ml-2 mt-0.5 h-5 w-5 animate-spin" /> :
                  <PiArrowRightBold className="ml-2 h-5 w-5" />
              }
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-600 text-sm lg:mt-8 lg:text-start">
        Already have an account?{' '}
        <Link
          href={routes.signIn}
          className="!text-primary-700 hover:!text-primary-900 text-sm font-semibold"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
