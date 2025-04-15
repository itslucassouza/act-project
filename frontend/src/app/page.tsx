"use client";

import "./globals.css";
import { useState } from "react";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { useLogin } from "@/lib/hooks/useLogin";
import { LoginFormValues } from "@/lib/schemas/auth-schema";

export default function LoginPage() {
  const [error, setError] = useState("");

  const { mutate, isPending } = useLogin();

  const handleSubmit = (values: LoginFormValues) => {
    setError("");
    mutate(values, {
      onError: (error: Error) => setError(error.message),
    });
  };

  return (
    <AuthLayout>
      <AuthCard title="Login" description="Entre com sua conta">
        <LoginForm
          onSubmit={handleSubmit}
          isPending={isPending}
          error={error}
        />
      </AuthCard>
    </AuthLayout>
  );
}
