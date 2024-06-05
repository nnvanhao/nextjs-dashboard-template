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
interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setLoading(true);
    try {
      // Simulate a registration request
      console.log(data);
      // Handle successful registration here
    } catch (error) {
      console.error(error);
      // Handle registration error here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-5">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Enter first name"
                {...register("firstName", {
                  required: "First name is required"
                })}
              />
              {errors.firstName && (
                <p className="text-red-600 text-[13px]">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Enter last name"
                {...register("lastName", {
                  required: "Last name is required"
                })}
              />
              {errors.lastName && (
                <p className="text-red-600 text-[13px]">
                  {errors.lastName.message}
                </p>
              )}
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
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
                "Create an account"
              )}
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
