// components/auth/SignupForm.tsx
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, SignupFormValues } from "@/lib/schemas/auth-schema"; // Importando o schema Zod
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => void;
  isPending: boolean;
  error: string;
}

export const SignupForm: FC<SignupFormProps> = ({ onSubmit, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          nome
        </label>
        <Input
          id="name"
          type="name"
          {...register("name")}
          className="p-2 border rounded-md w-full"
        />
        {errors.password && (
          <div className="text-sm text-red-600">{errors.password.message}</div>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="p-2 border rounded-md w-full"
        />
        {errors.email && (
          <div className="text-sm text-red-600">{errors.email.message}</div>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Senha
        </label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          className="p-2 border rounded-md w-full"
        />
        {errors.password && (
          <div className="text-sm text-red-600">{errors.password.message}</div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirmar Senha
        </label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className="p-2 border rounded-md w-full"
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <Button type="submit">Criar Conta</Button>
    </form>
  );
};
