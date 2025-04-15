"use client";

import "./globals.css";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginUser } from "@/lib/auth";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email("email invalido"),
  password: z.string().min(3, "senha deve conter 3 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ token, email }) => {
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      router.push("/dashboard");
    },
    onError: (error: Error) => setError(error.message),
  });

  const onSubmit = useCallback(
    (values: FormValues) => {
      setError("");
      mutate(values);
    },
    [mutate]
  );

  return (
    <AuthLayout>
      <Card className="w-full max-w-md mx-auto shadow-xl rounded-2xl border border-muted bg-background">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-muted-foreground ">
            Entre com sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu email"
                        {...field}
                        className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                        className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div
                  className="text-sm text-destructive font-medium border border-destructive rounded-md bg-destructive/10 p-2"
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold transition-all duration-300"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    aguarde...
                  </>
                ) : (
                  "entrar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
