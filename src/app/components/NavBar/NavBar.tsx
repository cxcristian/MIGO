"use client"
import Link from "next/link";
import { useState } from "react"
import ApiKeyInput from "../ApiKeyInput/ApiKeyInput";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 justify-between items-center">
      {/* Logo */}
      <div className="flex-shrink-0 text-xl font-bold text-[#294380]">
        MIGO
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-gray-700 hover:text-[#69d2cd]">Home</Link>
        <Link href="../pages/Repaso" className="text-gray-700 hover:text-[#69d2cd]">Learning</Link>
        <ApiKeyInput />
      </div>

      {/* Botón hamburguesa - Mobile */}
      <div className="md:hidden flex items-center">
        <ApiKeyInput />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#294380] hover:text-[#69d2cd] focus:outline-none text-2xl ml-4"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
    </div>
  </div>

  {/* Links - Mobile */}
  {isOpen && (
    <div className="md:hidden px-4 pb-4 space-y-2">
      <Link href="/" className="block text-gray-700 hover:text-[#69d2cd]">Home</Link>
        <Link href="../pages/Repaso" className="block text-gray-700 hover:text-[#69d2cd]">Learning</Link>
      
    </div>
  )}
</nav>

  )
}
