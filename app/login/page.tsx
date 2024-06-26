"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ButtonLoading } from "@/components/ui/buttonLoading";
import { axiosInstance } from "@/axios";
import { APIEndpoints } from "@/apiEndpoints";
import { handleSessionError } from "@/utils";
import { useAppContext } from "@/context";
import { REDUCER_ACTION_TYPE } from "@/types";
import { saveBearer } from "@/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "kminchelle",
      password: "0lelplR",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(APIEndpoints.LOGIN, {
        username: data.username,
        password: data.password,
      });
      toast({
        title: "Success",
        description: "Login Successful",
        duration: 2000,
      });
      const name = res.data?.firstName + " " + res.data?.lastName;
      dispatch?.({
        type: REDUCER_ACTION_TYPE.SET_USER,
        payload: { name, email: res.data?.email, image: res.data?.image },
      });
      saveBearer(res.data?.token, name, res.data?.image);
      router.push("/products");
    } catch (error) {
      handleSessionError(error, router, toast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F4F4F7] h-screen flex justify-center items-center">
      <div className="">
        <div className="mx-auto my-auto bg-white p-8 rounded-2xl min-w-[480px]">
          <div className="flex flex-col gap-3 items-center">
            <h1 className="mt-4 font-bold text-3xl">Welcome Back!</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {loading ? (
                <ButtonLoading />
              ) : (
                <Button className="w-full">Login</Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
