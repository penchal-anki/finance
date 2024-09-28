"use client";

import Link from "next/link";
import { useContext, useState, useEffect } from "react";
// import { signIn } from 'next-auth/react';
import { SubmitHandler } from "react-hook-form";
import { PiArrowRightBold, PiSpinnerGap } from "react-icons/pi";
// import { Checkbox } from '@/components/ui/checkbox';
// import { Password } from '@/components/ui/password';
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { routes } from "@/config/routes";
import { loginSchema, LoginSchema } from "@/utils/validators/login.schema";
import { useRouter } from "next/navigation";
import {
  postOptions,
  envData,
  handleResponseMiddleWare,
  clientHandleApiResponse,
} from "@/services";
import { AppContext } from "../root-lib";
import { setContextApiData } from "@/utils/form-utils";
import toast from "react-hot-toast";

export default function SignInForm() {
  const [reset] = useState({});
  const { appContextData, setAppContextData } = useContext<any>(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `${process.env.RS_API_URL}/user/login`,
        postOptions({
          payload: data,
        })
      );

      const rJson: any = await clientHandleApiResponse({
        apiResponse: response,
      });

      if (rJson.session) {
        router.push(routes.verifyOtp);
        setContextApiData(setAppContextData, {
          loginUser: rJson,
          loginEmail: data.email,
        });
      } else {
        setIsSubmitting(false);
        setError(true);
        setErrorMessage(rJson.message);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Something went wrong..!");
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="text-3xl font-semibold text-gray-900 mb-2">Sign in</div>
        <div className="text-md text-gray-600">
          Welcome back! Please enter your details.
        </div>
      </div>

      {error && (
        <Alert color="danger" variant="flat" className="mb-8">
          <Text className="font-semibold ml-2 text-red-500">
            {errorMessage || "User details not found"}
          </Text>
        </Alert>
      )}
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={(data) => onSubmit(data)}
        useFormProps={{
          defaultValues: { email: appContextData.loginEmail || "" },
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium border-gray-300 ring-gray-300 text-gray-500"
              inputClassName="text-sm h-11 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
              {...register("email")}
              error={errors.email?.message}
            />
            <Button type="submit" size="lg" color="primary">
              <span>Sign in</span>{" "}
              {isSubmitting ? (
                <PiSpinnerGap className="ml-2 mt-0.5 h-5 w-5 animate-spin" />
              ) : (
                <PiArrowRightBold className="ml-2 h-5 w-5" />
              )}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-600 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.signUp}
          className="!text-primary-700 hover:!text-primary-900 text-sm font-semibold"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
