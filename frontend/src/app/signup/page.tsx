"use client";
import "../globals.css";
import { useState } from "react";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { AuthCard } from "@/components/auth/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";
import { useSignup } from "@/lib/hooks/useSignup";
import { SignupFormValues } from "@/lib/schemas/auth-schema";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { mutate, isPending } = useSignup();

  const handleSubmit = (values: SignupFormValues) => {
    setError("");
    mutate(values, {
      onError: (error: Error) => setError(error.message),
    });
    router.push("/");
  };

  return (
    <AuthLayout>
      <AuthCard title="Cadastro" description="Crie uma nova conta">
        <SignupForm
          onSubmit={handleSubmit}
          isPending={isPending}
          error={error}
        />
      </AuthCard>
    </AuthLayout>
  );
}
