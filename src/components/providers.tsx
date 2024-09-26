"use client"

import type { ReactNode } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./ui/toaster"

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <main className="container max-w-screen-xl">{children}</main>
      <Toaster />
    </QueryProvider>
  )
}
