"use client"

import { useState } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Heart, Building2, MapPin, Calendar, ExternalLink } from "lucide-react"
import { type Experience, likeExperience } from "@/lib/db"
import { ExperienceDetail } from "./ExperienceDetail"
import { cn } from "@/lib/utils"

interface ExperienceListProps {
  experiences: Experience[]
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  const [likedExperiences, setLikedExperiences] = useState<number[]>([])
  const [openDialog, setOpenDialog] = useState<number | null>(null)
  const likeControls = useAnimation() // Animation controls for like button

  const handleLike = async (id: number, currentLikes: number) => {
    if (likedExperiences.includes(id)) return

    // Optimistic update for immediate UI feedback
    setLikedExperiences((prev) => [...prev, id])
    likeControls.start({ scale: 1.2, transition: { duration: 0.2, ease: "easeOut" } }) // Animate like button
    setTimeout(() => {
      likeControls.start({ scale: 1, transition: { duration: 0.1 } }) // Return to normal scale
    }, 200)

    try {
      const updatedLikes = await likeExperience(id)
      if (updatedLikes === null) {
        // Revert optimistic update if backend fails (optional, depends on desired UX)
        setLikedExperiences((prev) => prev.filter((expId) => expId !== id))
        console.error("Error liking experience: Could not update likes in database")
      }
    } catch (error) {
      // Revert optimistic update if error
      setLikedExperiences((prev) => prev.filter((expId) => expId !== id))
      console.error("Error liking experience:", error)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Slightly smoother stagger
        delayChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { y: 15, opacity: 0 }, // Slightly less initial Y for smoother entrance
    show: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }, // Ease out for smoother entrance
  }

  const dialogVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }, // Spring animation for dialog
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }, // Fade out on exit
  }

  if (experiences.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }} // Smoother transition for empty state
        className="text-center py-20" // Increased padding for better visual spacing
      >
        <div className="bg-gray-900/50 rounded-xl p-10 max-w-md mx-auto border border-gray-800 shadow-md">
          {" "}
          {/* More rounded and shadow */}
          <p className="text-gray-300 text-lg font-semibold mb-2">No experiences found.</p> {/* More prominent text */}
          <p className="text-gray-500 text-sm">
            It seems like there are no experiences matching your criteria. <br />
            Try adjusting your filters or check back later for new opportunities.
          </p>{" "}
          {/* More helpful message */}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence>
        {experiences.map((experience) => (
          <motion.div key={experience.id} variants={item} layout className="group">
            <Card className="bg-gray-900 border border-gray-800 overflow-hidden rounded-xl transition-all duration-300 hover:border-gray-700 hover:shadow-xl hover:shadow-blue-500/10 transform hover:scale-[1.02]">
              {" "}
              {/* More shadow and scale on hover */}
              <CardHeader className="pb-2">
                {" "}
                {/* Reduced padding bottom */}
                <CardTitle className="text-xl text-gray-100 font-semibold flex items-center justify-between">
                  {" "}
                  {/* Lighter text and font weight */}
                  <span className="line-clamp-1">
                    {experience.company} - {experience.role}
                  </span>
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-gray-800 text-gray-400 border border-gray-700 rounded-md px-2 py-1 text-xs font-medium" // Adjusted badge styling
                  >
                    {experience.difficulty}
                  </Badge>
                  <Badge
                    variant={
                      experience.outcome === "Selected"
                        ? "success"
                        : experience.outcome === "Pending"
                          ? "warning"
                          : "destructive"
                    }
                    className={cn(
                      "rounded-md px-2 py-1 text-xs font-medium border", // Adjusted badge styling
                      experience.outcome === "Selected"
                        ? "bg-green-900/30 text-green-400 border-green-800"
                        : experience.outcome === "Pending"
                          ? "bg-yellow-900/30 text-yellow-400 border-yellow-800"
                          : "bg-red-900/30 text-red-400 border-red-800",
                    )}
                  >
                    {experience.outcome}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {" "}
                {/* Reduced padding top in content */}
                <div className="space-y-1 text-sm">
                  {" "}
                  {/* Reduced spacing in text content */}
                  <div className="flex items-center text-gray-500">
                    {" "}
                    {/* Slightly lighter text color */}
                    <Calendar className="w-4 h-4 mr-2 text-gray-600" /> {/* Adjusted icon color */}
                    <span>{new Date(experience.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Building2 className="w-4 h-4 mr-2 text-gray-600" />
                    <span>{experience.company}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-800">
                  {" "}
                  {/* Added subtle border */}
                  <Dialog
                    open={openDialog === experience.id}
                    onOpenChange={(open) => setOpenDialog(open ? experience.id : null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="group-hover:border-blue-500 text-gray-400 hover:text-white border-gray-700 rounded-md text-sm px-3 py-2 hover:bg-gray-800 transition-colors duration-200" // Refined button style
                      >
                        <span>Read More</span>
                        <ExternalLink className="w-4 h-4 ml-2 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" />{" "}
                        {/* Icon color transition */}
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-3xl max-h-[85vh] overflow-y-auto bg-gray-950 border-gray-800 rounded-xl p-6" // Slightly darker dialog background, rounded corners
                      variants={dialogVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      <ExperienceDetail experience={experience} onLike={handleLike} />
                    </DialogContent>
                  </Dialog>
                  <motion.div animate={likeControls} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                    {" "}
                    {/* Animation wrapper for like button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(experience.id, experience.likes)}
                      disabled={likedExperiences.includes(experience.id)}
                      className={cn(
                        `flex items-center space-x-2 rounded-full px-3 py-1.5`, // Rounded button
                        likedExperiences.includes(experience.id)
                          ? "text-blue-400 hover:bg-blue-900/30" // More subtle hover for liked state
                          : "text-gray-400 hover:text-blue-400 hover:bg-blue-900/10", // More subtle hover for unliked state
                        "transition-colors duration-200",
                      )}
                    >
                      <Heart
                        className="w-4 h-4"
                        fill={likedExperiences.includes(experience.id) ? "currentColor" : "none"}
                      />
                      <span className="text-xs font-medium">{experience.likes}</span> {/* Smaller like count text */}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

