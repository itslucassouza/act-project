import { ReactNode } from "react";

interface ErrorMessageProps {
  children: ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div
      className="text-sm text-destructive font-medium border border-destructive rounded-md bg-destructive/10 p-2"
      role="alert"
      aria-live="polite"
    >
      {children}
    </div>
  );
};
