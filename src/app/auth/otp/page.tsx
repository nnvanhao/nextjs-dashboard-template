"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { OtpStyledInput } from "@/components/extension/otp-input";
import { Card } from "@/components/ui/card";

const OtpTest = () => {
  const form = useForm({
    defaultValues: {
      otp: ""
    },
    mode: "onBlur" // Trigger validation on blur event
  });

  const onSubmit = (data: { otp: any; }) => {
    console.log(data);
    toast.success(`Success , Your Otp code is : ${data.otp}`);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="max-w-md h-fit flex items-center justify-center outline outline-1 outline-muted p-6 bg-background">
        <div className="w-[360px] space-y-6">
          <div className="space-y-4">
            <h1 className="text-xl font-semibold">OTP Verification</h1>
            <p className="text-sm">
              Enter the 6-digit code sent to your email address or phone number
            </p>
          </div>
          <Form {...form}>
            <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="otp"
                rules={{
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "OTP must be 6 digits"
                  },
                  maxLength: {
                    value: 6,
                    message: "OTP must be 6 digits"
                  }
                }}
                render={({ field }) => (
                  <FormControl>
                    <>
                      <FormItem>
                        <OtpStyledInput
                          numInputs={6}
                          inputType="number"
                          {...field}
                        />
                      </FormItem>
                      <FormMessage>
                        {form.formState.errors.otp && (
                          <p className="text-red-600">
                            {form.formState.errors.otp.message}
                          </p>
                        )}
                      </FormMessage>
                    </>
                  </FormControl>
                )}
              />
              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default OtpTest;
