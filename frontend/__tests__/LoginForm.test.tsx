import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginForm } from "@/components/auth/LoginForm";

const mockSubmit = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

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
