// lib/auth.ts
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "Erro ao fazer login");
  }

  const data = await res.json();

  return data; // { token: string }
};
