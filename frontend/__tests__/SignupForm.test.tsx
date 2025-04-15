import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignupForm } from "@/components/auth/SignupForm";
import "@testing-library/jest-dom";

const mockSubmit = vi.fn();

const baseProps = {
  onSubmit: mockSubmit,
  isPending: false,
  error: "",
};

describe("SignupForm", () => {
  it("renders all form fields", () => {
    render(<SignupForm {...baseProps} />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /criar conta/i })
    ).toBeInTheDocument();
  });

  it("displays error message when provided", () => {
    const error = "E-mail já cadastrado";
    render(<SignupForm {...baseProps} error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
