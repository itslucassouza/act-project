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

  return data;
};

export const signup = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<{ userId: string; email: string; message: string }> => {
  const res = await fetch("http://localhost:3001/users", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "Erro ao se cadastrar");
  }

  const data = await res.json();
  return data;
};
