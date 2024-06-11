/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderIcon } from "lucide-react";
import { useSignIn } from "@/hooks/auth/hooks";
import { encrypt } from "@/utils/securities";
import { useRouter } from "next/navigation";
import useEnterKey from "@/hooks/useEnterKey";
import { useEffect, useState } from "react";
import { IError } from "@/hooks/auth/types";

// Define the form data type
interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginFormInputs>({ mode: "all" });

  useEffect(() => {
    setErrorMessage("");
  }, [watch("email"), watch("password")]);

  const [errorMessage, setErrorMessage] = useState<string>();

  const { mutate, isPending } = useSignIn();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    const passwordEncrypt = encrypt(data?.password, secretKey!);

    mutate(
      { email: data.email, password: passwordEncrypt },
      {
        onSuccess: () => {
          push("/dashboard");
        },
        onError: (error: IError | any) => {
          setErrorMessage(error.data.message);
        }
      }
    );
  };

  useEnterKey(() => {
    handleSubmit(onSubmit)();
  });

  return (
    <div className="h-screen w-full flex items-center">
      <Card className="mx-auto w-[380px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-[13px]">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required"
                })}
              />
              {errors.password && (
                <p className="text-red-600 text-[13px]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <p className="text-red-600 text-[13px]">{errorMessage}</p>
            <Button
              type="submit"
              className="w-full mt-10"
              onClick={handleSubmit(onSubmit)}
            >
              {isPending ? (
                <LoaderIcon className="animate-spin w-5 h-5" />
              ) : (
                "Login"
              )}
            </Button>
            {/* <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                serverSignIn("github");
              }}
            >
              Login with Github
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
