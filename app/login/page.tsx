"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState("")

  const isValidEmail = (email: string) => {
    const domainRegex = /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/
    return domainRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isValidEmail(email)) {
      setError("Please use a valid @vitstudent.ac.in email address.")
      return
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
        router.push("/experiences")
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(userCredential.user)
        setError("Verification email sent. Please check your inbox and verify your email before logging in.")
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <motion.div className="w-full max-w-md" variants={containerVariants} initial="hidden" animate="visible">
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {isLogin ? "Welcome back" : "Create an account"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="email" className="text-gray-200">
                  VIT Student Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@vitstudent.ac.in"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </motion.div>
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </motion.div>
              {error && (
                <motion.p
                  className="text-red-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.p>
              )}
              <motion.div variants={itemVariants}>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  {isLogin ? "Login" : "Sign Up"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </form>
            <motion.div className="mt-4 text-center text-sm" variants={itemVariants}>
              <span className="text-gray-400">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
              <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-blue-400 hover:text-blue-300">
                {isLogin ? "Sign Up" : "Login"}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

