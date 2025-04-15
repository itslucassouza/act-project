import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: ({ access_token }) => {
      localStorage.setItem("token", access_token);
      router.push("/dashboard");
    },
  });
};
