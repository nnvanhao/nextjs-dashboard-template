"use client";

import { useState } from "react";
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

// Define the form data type
interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      // Simulate a login request
      console.log(data);
      // Handle successful login here
    } catch (error) {
      console.error(error);
      // Handle login error here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-5">
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
                <p className="text-red-600 text-[13px]">{errors.email.message}</p>
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
            <Button type="submit" className="w-full mt-10">
              {loading ? (
                <LoaderIcon className="animate-spin w-5 h-5" />
              ) : (
                "Login"
              )}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
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
