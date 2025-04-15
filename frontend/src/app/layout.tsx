import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="border border-red-600">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
