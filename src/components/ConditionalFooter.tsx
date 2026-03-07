// components/ConditionalNav.tsx
"use client"

import { usePathname } from "next/navigation"
import Footer from "./footer"

export default function ConditionalFooter() {
  const pathname = usePathname()

  // Hide footer on /admin and anything after it
  if (pathname.startsWith("/admin") || pathname.startsWith("/home") ) {
    return null
  }

  return <Footer />
}