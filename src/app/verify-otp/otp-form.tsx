'use client';
import React, { useContext, useEffect, useState } from 'react';
import { PinCode } from '@/components/ui/pin-code';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { otpSchema, OtpSchema } from '@/utils/validators/otp-schema';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { clientHandleApiResponse, handleResponseMiddleWare, postOptions } from '@/services';
import { setContextApiData } from '@/utils/form-utils';
import { AppContext } from '../root-lib';
import toast from 'react-hot-toast';
import { PiSpinnerGap } from 'react-icons/pi';

type FormValues = {
  otp: string;
};

type ResetState = {
  reset: boolean;
  otp: string;
};

// ... (imports and types)

export default function OtpForm() {
  const [resetState, setResetState] = useState<ResetState>({ reset: false, otp: '' });
  const { reset, otp: otpInfo } = resetState;
  const router = useRouter();
  const { appContextData, setAppContextData } = useContext<any>(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { loginUser, loginEmail } = appContextData
  console.log(">>>>>>>>>appContextData", appContextData)


  useEffect(() => {
    if (!loginEmail) {
      router.push(routes.signIn);
      setContextApiData(setAppContextData, {});
      localStorage.clear();
      sessionStorage.clear();
    }
  }, [])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true)
    const { authId, session } = loginUser
    const response = await fetch(
      `${process.env.RS_API_URL}/user/validate`,
      postOptions({
        payload: {
          authId: authId || '',
          code: data.otp,
          session: session
        },
        token: session
      })
    );

    const rJson = await clientHandleApiResponse({ apiResponse: response })
    if (rJson.idToken) {
      setIsSubmitting(false)
      if (rJson.status === "PENDING") {
        router.push('/dashboard');
      } else {
          router.push("/dashboard");
      }
      setContextApiData(setAppContextData, {
        currentUserInfo: rJson
      })
    } else {
      if (rJson.session) {
        setContextApiData(setAppContextData, {
          loginUser: {
            ...loginUser,
            session: rJson.session
          },
        })
      }
      // if (response?.status === 401) {
      //   toast.error("Your OTP has expired. Please request a new one.")
      // }
      setError('Invalid OTP')
      setIsSubmitting(false)

      // Resetting the PinCode value to an empty string
      setResetState((prevResetState) => ({
        reset: !prevResetState.reset, // Toggle the reset flag
        otp: '', // Reset the OTP value
      }));
    }
  };

  const handleReset = async () => {
    setError('')
    // Resetting the PinCode value to an empty string
    setResetState((prevResetState) => ({
      reset: !prevResetState.reset, // Toggle the reset flag
      otp: '', // Reset the OTP value
    }));

    const response = await fetch(
      `${process.env.RS_API_URL}/user/login`,
      postOptions({
        payload: {
          email: loginEmail
        }
      })
    );
    const rJson = await handleResponseMiddleWare(response)
    if (rJson.session) {
      setContextApiData(setAppContextData, {
        loginUser: rJson
      })
      toast.success('OTP sent check the email to get the OTP')
    } else {
      toast.error('Something went wrong')
    }
  };

  return (
    <>
      <Form<OtpSchema>
        onSubmit={onSubmit}
        validationSchema={otpSchema}
        resetValues={resetState}
        useFormProps={{
          defaultValues: { otp: otpInfo },
        }}
      >
        {({ setValue, formState: { errors } }) => (
          <div className="space-y-10">
            <PinCode
              key={reset ? 'reset-key' : 'normal-key'} // Change key to force remount
              setValue={(value) => {
                setValue('otp', String(value));
              }}
              size="lg"
              color="primary"
              // className="lg:justify-center"
              className="lg:justify-center text-gray-500"
              inputClassName="h-11 ring-[0.6] border-primary-300 ring-primary-300 text-base text-gray-500"
              length={6}
              type="number"
              center={true}
              error={error || errors.otp?.message}

            />
            <Button
              type="submit"
              size="lg"
              color="info"
            >
              <span>Verify OTP</span>{' '}
              {isSubmitting &&
                <PiSpinnerGap className="ml-2 mt-0.5 h-5 w-5 animate-spin" />
              }
            </Button>
            <div
              className="-mt-1 mb-9 text-center text-[15px] leading-[1.85] text-gray-600 md:text-base md:!leading-loose lg:text-start xl:-mt-6">
              Didn’t receive the OTP?
              <Button
                className="-mt-4 w-full p-0 text-base font-medium text-primary underline lg:inline-flex lg:w-auto ml-2"
                type="button"
                variant="text"
                onClick={handleReset}
              >
                Resend OTP
              </Button>
            </div>
          </div>
        )}
      </Form>
    </>
  );
}
