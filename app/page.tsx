"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Briefcase } from "lucide-react"

export default function Home() {
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

  const cardVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  }

  return (
    <motion.div
      className="page-container section-padding bg-gray-900 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center mb-6 gradient-text font-display"
        variants={itemVariants}
      >
        VIT Interview Experiences
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-center mb-10 text-gray-400 font-light max-w-2xl mx-auto"
        variants={itemVariants}
      >
        Prepare for your dream job with insights from your peers. Gain access to the experience and knowledge of other
        students at VIT.
      </motion.p>

      <motion.div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto" variants={itemVariants}>
        <motion.div
          className="bg-gray-800 p-6 rounded-xl shadow-lg card-hover transition-transform duration-200 flex flex-col items-center justify-center text-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <BookOpen className="w-10 h-10 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-white">Learn from Peers</h2>
          <p className="text-gray-300 font-light">Gain real-world interview insights shared by VIT students.</p>
        </motion.div>
        <motion.div
          className="bg-gray-800 p-6 rounded-xl shadow-lg card-hover transition-transform duration-200 flex flex-col items-center justify-center text-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <Users className="w-10 h-10 text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-white">Community Driven</h2>
          <p className="text-gray-300 font-light">Join a supportive network of VIT students helping each other.</p>
        </motion.div>
        <motion.div
          className="bg-gray-800 p-6 rounded-xl shadow-lg card-hover transition-transform duration-200 flex flex-col items-center justify-center text-center"
          variants={cardVariants}
          whileHover="hover"
        >
          <Briefcase className="w-10 h-10 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-white">Career Boost</h2>
          <p className="text-gray-300 font-light">Elevate your job search with valuable firsthand knowledge.</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 max-w-lg mx-auto"
        variants={itemVariants}
      >
        <Link href="/experiences">
          <Button
            size="lg"
            variant="outline"
            className="w-full md:w-auto bg-transparent text-white hover:bg-gray-800  hover:border-gray-800 transition-colors border-white py-3 "
          >
            Browse Experiences <ArrowRight className="ml-2" />
          </Button>
        </Link>
        <Link href="/submit">
          <Button
            size="lg"
            variant="outline"
            className="w-full md:w-auto bg-transparent text-white hover:bg-gray-800  hover:border-gray-800 transition-colors border-white py-3"
          >
            Submit Your Experience <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

