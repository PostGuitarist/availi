"use client"

import { useTheme } from "@/components/theme-provider"
import { Toaster } from "sonner"

export function ToasterWithTheme() {
  const { theme } = useTheme()
  
  return (
    <Toaster 
      position="bottom-right" 
      richColors 
      closeButton
      className="toaster group" 
      theme={theme as "light" | "dark" | "system"} 
    />
  )
}