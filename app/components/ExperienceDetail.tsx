import  Badge  from "@/components/ui/badge"
import  Button  from "@/components/ui/button"
import { Heart, Building2, MapPin, Calendar, Monitor, ChevronRight, type LucideIcon } from "lucide-react"
import { type Experience, likeExperience } from "@/lib/db"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

interface ExperienceDetailProps {
  experience: Experience
  onLike: (id: number, likes: number) => void
}

interface InfoItemProps {
  Icon: LucideIcon
  label: string
  value: string
}

const InfoItem = ({ Icon, label, value }: InfoItemProps) => (
  <div className="flex items-center space-x-2 text-gray-400">
    <Icon className="w-4 h-4" />
    <span className="text-sm">{label}:</span>
    <span className="text-gray-300">{value}</span>
  </div>
)

export function ExperienceDetail({ experience, onLike }: ExperienceDetailProps) {
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async () => {
    try {
      setIsLiking(true)
      const updatedLikes = await likeExperience(experience.id)
      if (updatedLikes !== null) {
        onLike(experience.id, updatedLikes)
      }
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:border-gray-700 hover:shadow-blue-900/20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 border-b border-gray-800">
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">
              {experience.company} - {experience.role}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InfoItem Icon={Calendar} label="Date" value={new Date(experience.date).toLocaleDateString()} />
              <InfoItem Icon={MapPin} label="Location" value={experience.location} />
              <InfoItem Icon={Monitor} label="Type" value={experience.interview_type} />
              <InfoItem Icon={Building2} label="Company" value={experience.company} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-gray-800 text-gray-300 border border-gray-700">
              {experience.difficulty}
            </Badge>
            <Badge
              variant={experience.outcome === "Selected" ? "success" : "destructive"}
              className={`${
                experience.outcome === "Selected"
                  ? "bg-green-900/30 text-green-400 border-green-800"
                  : "bg-red-900/30 text-red-400 border-red-800"
              } border`}
            >
              {experience.outcome}
            </Badge>
          </div>
        </div>
      </div>

      {/* Interview Rounds */}
      <div className="p-6 space-y-6">
        <Accordion type="single" collapsible className="w-full">
          {experience.rounds.map((round, index) => (
            <AccordionItem value={`round-${index}`} key={index} className="border-gray-800">
              <AccordionTrigger className="text-gray-300 hover:text-blue-400 transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">Round {index + 1}:</span>
                  <span>{round.round_name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                <div className="space-y-4 pl-4 border-l-2 border-gray-800">
                  <p>{round.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-300">Questions Asked:</h4>
                    <ul className="space-y-2">
                      {round.questions.map((question, qIndex) => (
                        <li key={qIndex} className="flex items-start space-x-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Experience Details */}
        <div className="space-y-6">
          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Overall Experience</h3>
            <p className="text-gray-400 leading-relaxed">{experience.overall_experience}</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Tips and Preparation Strategies</h3>
            <p className="text-gray-400 leading-relaxed">{experience.tips}</p>
          </section>

          {experience.salary && (
            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Salary/Stipend</h3>
              <p className="text-gray-400">{experience.salary}</p>
            </section>
          )}
        </div>

        {/* Like Button */}
        <div className="flex justify-end items-center pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isLiking}
            className={`
              flex items-center space-x-2 text-gray-400 
              hover:text-blue-400 hover:bg-blue-400/10 
              transition-all duration-300
              ${isLiking ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <Heart className={`w-4 h-4 ${isLiking ? "animate-pulse" : ""}`} fill={isLiking ? "currentColor" : "none"} />
            <span>{experience.likes}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

