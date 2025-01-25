"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const socialLinks = [
    {
      icon: <Github />,
      href: "https://github.com/Anky597",
      label: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      icon: <Linkedin />,
      href: "https://www.linkedin.com/in/nikamaniket/",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: <Instagram />,
      href: "https://www.instagram.com/a.nik.e.t/",
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    {
      icon: <Mail />,
      href: "mailto:vitexperince@gmail.com",
      label: "Email",
      color: "hover:text-red-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                VIT Interview Experiences
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Your go-to resource for real, unfiltered interview experiences from VIT alumni who've been in your shoes.
              Built With Special LOVE ♥️
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 space-y-6">
              <h2 className="text-3xl font-bold text-white">Our Story</h2>
              <p className="text-gray-300">
                Hey there! I'm just like you - a VIT student who went through the nerve-wracking journey of interviews.
                After countless sleepless nights and interview experiences (both good and embarrassing), I decided to
                create something I wish I had during my preparation.
              </p>
              <p className="text-gray-300">
                This platform isn't just about success stories. It's about the real, unfiltered experiences - the
                mistakes, the learning, and everything in between. Because let's face it, we learn more from our "oops"
                moments than our perfect ones!
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-8 text-white space-y-6">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p>We're on a mission to make sure no VIT student walks into an interview unprepared. We believe in:</p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Sharing real experiences</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Building confidence through preparation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Creating a supportive community</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Making interview prep less scary</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-white">Let's Connect</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Got questions? Want to share your interview experience? Or just need some interview prep motivation? Reach
            out!
          </p>
          <div className="flex justify-center space-x-8">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transform transition-all duration-300 hover:-translate-y-1 text-gray-400 ${link.color}`}
                aria-label={link.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHoveredCard(link.label)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

