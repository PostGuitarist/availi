"use client"

import { Toaster as SonnerToaster } from "sonner"

export function SonnerProvider() {
  return <SonnerToaster position="bottom-right" richColors closeButton theme="system" className="toaster group" />
}

