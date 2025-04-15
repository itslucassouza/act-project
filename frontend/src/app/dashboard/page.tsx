"use client";

import { useAuthUser } from "@/queries/useAuthUser";

export default function Page() {
  const { data: user, isLoading } = useAuthUser();

  if (isLoading) return <div>Carregando...</div>;

  if (!user) return <div>Usuário não encontrado.</div>;

  return <div>Bem-vindo, {user.name}</div>;
}
