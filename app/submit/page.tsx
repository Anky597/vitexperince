"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusCircle, MinusCircle, ChevronDown } from "lucide-react"
import { createExperience, createUser, getUserByEmail } from "@/lib/db"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { motion } from "framer-motion"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface Round {
  round_name: string
  description: string
  questions: string[]
}

export default function SubmitExperiencePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    date: "",
    location: "",
    interview_type: "",
    rounds: [{ round_name: "Round 1", description: "", questions: [""] }],
    overall_experience: "",
    tips: "",
    salary: "",
    difficulty: "",
    outcome: "",
  })
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push("/login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Date) => {
    if (e instanceof Date) {
      setFormData((prev) => ({ ...prev, date: e.toISOString().split("T")[0] }))
    } else {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoundChange = (index: number, field: keyof Round, value: string) => {
    setFormData((prev) => {
      const newRounds = [...prev.rounds]
      newRounds[index] = { ...newRounds[index], [field]: value }
      return { ...prev, rounds: newRounds }
    })
  }

  const handleQuestionChange = (roundIndex: number, questionIndex: number, value: string) => {
    setFormData((prev) => {
      const newRounds = [...prev.rounds]
      newRounds[roundIndex].questions[questionIndex] = value
      return { ...prev, rounds: newRounds }
    })
  }

  const addRound = () => {
    setFormData((prev) => ({
      ...prev,
      rounds: [...prev.rounds, { round_name: `Round ${prev.rounds.length + 1}`, description: "", questions: [""] }],
    }))
  }

  const removeRound = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      rounds: prev.rounds.filter((_, i) => i !== index),
    }))
  }

  const addQuestion = (roundIndex: number) => {
    setFormData((prev) => {
      const newRounds = [...prev.rounds]
      newRounds[roundIndex].questions.push("")
      return { ...prev, rounds: newRounds }
    })
  }

  const removeQuestion = (roundIndex: number, questionIndex: number) => {
    setFormData((prev) => {
      const newRounds = [...prev.rounds]
      newRounds[roundIndex].questions = newRounds[roundIndex].questions.filter((_, i) => i !== questionIndex)
      return { ...prev, rounds: newRounds }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !user.emailVerified) {
      alert("Please verify your email before submitting an experience.")
      return
    }

    let dbUser = await getUserByEmail(user.email)
    if (!dbUser) {
      dbUser = await createUser(user.email)
    }

    if (dbUser) {
      const result = await createExperience(formData, dbUser.id)
      if (result) {
        router.push("/experiences")
      } else {
        console.error("Failed to submit experience")
      }
    } else {
      console.error("Failed to create or fetch user")
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null // This should not happen as the user will be redirected to login page
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Submit Interview Experience
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" name="role" value={formData.role} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Interview Date</Label>
                  <DatePicker
                    id="date"
                    selected={formData.date ? new Date(formData.date) : null}
                    onChange={(date: Date) =>
                      setFormData((prev) => ({ ...prev, date: date.toISOString().split("T")[0] }))
                    }
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interview_type">Interview Type</Label>
                <Select
                  value={formData.interview_type}
                  onValueChange={(value) => handleSelectChange("interview_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on-campus">On-Campus</SelectItem>
                    <SelectItem value="off-campus">Off-Campus</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {formData.rounds.map((round, index) => (
                  <AccordionItem
                    value={`round-${index}`}
                    key={index}
                    className="border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors">
                      <div className="flex items-center justify-between w-full">
                        <span>{round.round_name}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-gray-800/50">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`round-name-${index}`}>Round Name</Label>
                          <Input
                            id={`round-name-${index}`}
                            value={round.round_name}
                            onChange={(e) => handleRoundChange(index, "round_name", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`round-description-${index}`}>Round Description</Label>
                          <Textarea
                            id={`round-description-${index}`}
                            value={round.description}
                            onChange={(e) => handleRoundChange(index, "description", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Questions</Label>
                          {round.questions.map((question, qIndex) => (
                            <div key={qIndex} className="flex items-center space-x-2">
                              <Input
                                value={question}
                                onChange={(e) => handleQuestionChange(index, qIndex, e.target.value)}
                                placeholder={`Question ${qIndex + 1}`}
                                required
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeQuestion(index, qIndex)}
                              >
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button type="button" variant="outline" onClick={() => addQuestion(index)}>
                            Add Question
                          </Button>
                        </div>
                      </div>
                      {formData.rounds.length > 1 && (
                        <Button type="button" variant="destructive" onClick={() => removeRound(index)} className="mt-4">
                          Remove Round
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button type="button" variant="outline" onClick={addRound} className="w-full mt-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Round
              </Button>
              <div className="space-y-2">
                <Label htmlFor="overall_experience">Overall Experience</Label>
                <Textarea
                  id="overall_experience"
                  name="overall_experience"
                  value={formData.overall_experience}
                  onChange={handleChange}
                  placeholder="Describe your overall interview experience"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tips">Tips and Preparation Strategies</Label>
                <Textarea
                  id="tips"
                  name="tips"
                  value={formData.tips}
                  onChange={handleChange}
                  placeholder="Share your tips for preparing for this interview"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary/Stipend (Optional)</Label>
                <Input
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Enter the offered salary or stipend"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Overall Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => handleSelectChange("difficulty", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outcome">Final Outcome</Label>
                  <Select value={formData.outcome} onValueChange={(value) => handleSelectChange("outcome", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="selected">Selected</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                Submit Experience
              </Button>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
;<style jsx global>{`
  .react-datepicker {
    font-family: inherit;
    background-color: #1f2937;
    border: 1px solid #374151;
    border-radius: 0.375rem;
    color: #fff;
  }
  .react-datepicker__header {
    background-color: #111827;
    border-bottom: 1px solid #374151;
  }
  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day {
    color: #fff;
  }
  .react-datepicker__day:hover {
    background-color: #3b82f6;
  }
  .react-datepicker__day--selected {
    background-color: #3b82f6;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: #3b82f6;
  }
`}</style>

