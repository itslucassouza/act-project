import { useMutation } from "@tanstack/react-query";
import { signup } from "../auth";

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface SignupResponse {
  userId: string;
  email: string;
  message: string;
}

export const useSignup = () => {
  const { mutate, isPending } = useMutation<SignupResponse, Error, SignupData>({
    mutationFn: signup,
  });

  return { mutate, isPending };
};
