'use client'

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
interface ForgotPasswordFormInputs {
  email: string;
}

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    setLoading(true);
    try {
      // Simulate a password reset request
      console.log(data);
      // Handle successful password reset here
    } catch (error) {
      console.error(error);
      // Handle password reset error here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
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
            <Button type="submit" className="w-full">
              {loading ? (
                <LoaderIcon className="animate-spin w-5 h-5" />
              ) : (
                "Reset"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {`Back to `}
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPasswordForm;
