// components/ConditionalNav.tsx
"use client"

import { usePathname } from "next/navigation"
import Navber from "./navbar"

export default function ConditionalNav() {
  const pathname = usePathname()

  // Hide navbar on /admin and anything after it
  if (pathname.startsWith("/admin") || pathname.startsWith("/home") ) {
    return null
  }

  return <Navber />
}