"use client";

import "../globals.css";
import { useAuthUser } from "@/queries/useAuthUser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { data: user, isLoading } = useAuthUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (isLoading) return <div className="text-center mt-10">Carregando...</div>;

  if (!user)
    return <div className="text-center mt-10">Usuário não encontrado.</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Bem-vindo, {user.name} 👋
        </h1>
        <p className="text-gray-600 mb-6">Você está logado com sucesso.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
