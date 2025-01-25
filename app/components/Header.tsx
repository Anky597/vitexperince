"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import Logo from "./Logo"
import { motion } from "framer-motion"

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <motion.header
      className="bg-black bg-opacity-50 backdrop-blur-md fixed w-full z-10 h-16"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Link href="/">
            <Logo />
          </Link>
        </motion.div>
        <div className="space-x-4">
          <Link href="/experiences">
            <Button variant="ghost" className="text-white hover:text-black hover:bg-white transition-colors">
              Experiences
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="text-white hover:text-black hover:bg-white transition-colors">
              About
            </Button>
          </Link>
          {user ? (
            <>
              <Link href="/submit">
                <Button variant="ghost" className="text-white hover:text-black hover:bg-white transition-colors">
                  Submit Experience
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="text-white border-white hover:text-black hover:bg-white transition-colors"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button className="bg-white text-black hover:bg-opacity-80 transition-colors">Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </motion.header>
  )
}

