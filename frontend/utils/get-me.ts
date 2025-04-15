export async function getMe() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  const res = await fetch("http://localhost:3001/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar usuário autenticado");
  }

  return res.json();
}
