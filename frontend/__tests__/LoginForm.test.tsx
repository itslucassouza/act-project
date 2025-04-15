import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginForm } from "@/components/auth/LoginForm";
import "@testing-library/jest-dom";

const mockSubmit = vi.fn();

const baseProps = {
  onSubmit: mockSubmit,
  isPending: false,
};

describe("LoginForm", () => {
  it("renders correctly", () => {
    render(<LoginForm {...baseProps} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<LoginForm {...baseProps} isPending={true} />);
    expect(screen.getByText("Aguarde...")).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    const error = "Credenciais inválidas";
    render(<LoginForm {...baseProps} error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
