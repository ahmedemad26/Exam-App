import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextAuthProvider from "./_components/next-auth.providers";
import ReactQueryProviders from "./_components/react-query-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProviders>
      {/* DevTools */}
      <ReactQueryDevtools />
      <NextAuthProvider>{children}</NextAuthProvider>
    </ReactQueryProviders>
  );
}
