"use client"

import { useState, useEffect } from "react"
import ExperienceList from "../components/ExperienceList"
import SearchFilters from "../components/SearchFilters"
import { getExperiences, type Experience } from "@/lib/db"
import { Loader2 } from "lucide-react"

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchExperiences() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getExperiences()
        setExperiences(data)
      } catch (err) {
        setError("Failed to load experiences. Please try again later.")
        console.error("Error fetching experiences:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchExperiences()
  }, [])

  const handleFilterChange = (filteredExperiences: Experience[]) => {
    setExperiences(filteredExperiences)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
            Interview Experiences
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Learn from real interview experiences shared by VIT students and alumni.
            Filter by company, role, or year to find relevant stories.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-800">
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Content Section */}
        <div className="relative min-h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="space-y-4 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto" />
                <p className="text-gray-400">Loading experiences...</p>
              </div>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 max-w-md text-center">
                <p className="text-red-400">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : experiences.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 max-w-md text-center">
                <p className="text-gray-300">No experiences found matching your filters.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-md transition-colors duration-200"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 animate-fadeIn">
              <ExperienceList experiences={experiences} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

