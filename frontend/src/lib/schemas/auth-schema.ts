import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(3, "Senha deve conter no mínimo 3 caracteres"),
});

export const signupFormSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string(),
  password: z.string().min(3, "Senha deve conter no mínimo 3 caracteres"),
  confirmPassword: z
    .string()
    .min(3, "Confirmar senha deve conter no mínimo 3 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type SignupFormValues = z.infer<typeof signupFormSchema>;
