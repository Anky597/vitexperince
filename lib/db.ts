import { supabase } from "./supabase"

export interface User {
  id: string
  email: string
  created_at: string
}

export interface Experience {
  id: number
  user_id: string
  company: string
  role: string
  date: string
  location: string
  interview_type: string
  rounds: {
    round_name: string
    description: string
    questions: string[]
  }[]
  overall_experience: string
  tips: string
  salary: string | null
  difficulty: string
  outcome: string
  likes: number
  created_at: string
}

// Helper function to serialize BigInt
const serializeBigInt = (data: any): any => {
  return JSON.parse(JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v)))
}

export async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase.rpc("get_all_experiences")

  if (error) {
    console.error("Error fetching experiences:", error)
    return []
  }

  return serializeBigInt(data) || []
}

export async function getExperienceById(id: number): Promise<Experience | null> {
  const { data, error } = await supabase.rpc("get_complete_experience", { experience_id: id }).single()

  if (error) {
    console.error("Error fetching experience:", error)
    return null
  }

  return serializeBigInt(data)
}

export async function createExperience(
  experience: Omit<Experience, "id" | "likes" | "created_at">,
  userId: string,
): Promise<Experience | null> {
  const { data: experienceData, error: experienceError } = await supabase
    .from("experiences")
    .insert({
      user_id: userId,
      company: experience.company,
      role: experience.role,
      date: experience.date,
      location: experience.location,
      interview_type: experience.interview_type,
      overall_experience: experience.overall_experience,
      tips: experience.tips,
      salary: experience.salary,
      difficulty: experience.difficulty,
      outcome: experience.outcome,
    })
    .select()
    .single()

  if (experienceError) {
    console.error("Error creating experience:", experienceError)
    return null
  }

  const experienceId = experienceData.id

  for (const round of experience.rounds) {
    const { data: roundData, error: roundError } = await supabase
      .from("rounds")
      .insert({
        experience_id: experienceId,
        round_name: round.round_name,
        description: round.description,
      })
      .select()
      .single()

    if (roundError) {
      console.error("Error creating round:", roundError)
      return null
    }

    const roundId = roundData.id

    for (const question of round.questions) {
      const { error: questionError } = await supabase.from("questions").insert({
        round_id: roundId,
        question: question,
      })

      if (questionError) {
        console.error("Error creating question:", questionError)
        return null
      }
    }
  }

  return getExperienceById(experienceId)
}

export async function updateExperience(id: number, updates: Partial<Experience>): Promise<Experience | null> {
  const { error } = await supabase.from("experiences").update(updates).eq("id", id)

  if (error) {
    console.error("Error updating experience:", error)
    return null
  }

  return getExperienceById(id)
}

export async function deleteExperience(id: number): Promise<boolean> {
  const { error } = await supabase.from("experiences").delete().eq("id", id)

  if (error) {
    console.error("Error deleting experience:", error)
    return false
  }

  return true
}

export async function likeExperience(id: number): Promise<number | null> {
  const { data, error } = await supabase.rpc("increment_likes", { row_id: id })

  if (error) {
    console.error("Error liking experience:", error)
    return null
  }

  const updatedExperience = await getExperienceById(id)
  return updatedExperience?.likes || null
}

export async function createUser(email: string): Promise<User | null> {
  const { data, error } = await supabase.from("users").insert({ email }).select().single()

  if (error) {
    console.error("Error creating user:", error)
    return null
  }

  return data
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

  if (error) {
    console.error("Error fetching user:", error)
    return null
  }

  return data
}

export async function getFilterOptions(): Promise<{
  companies: string[]
  roles: string[]
  locations: string[]
  interview_types: string[]
  difficulties: string[]
  outcomes: string[]
}> {
  try {
    const { data: experiences, error } = await supabase
      .from("experiences")
      .select("company, role, location, interview_type, difficulty, outcome")

    if (error) {
      console.error("Error fetching filter options:", error)
      throw error
    }

    const options = {
      companies: [...new Set(experiences.map((e) => e.company))],
      roles: [...new Set(experiences.map((e) => e.role))],
      locations: [...new Set(experiences.map((e) => e.location))],
      interview_types: [...new Set(experiences.map((e) => e.interview_type))],
      difficulties: [...new Set(experiences.map((e) => e.difficulty))],
      outcomes: [...new Set(experiences.map((e) => e.outcome))],
    }

    return options
  } catch (error) {
    console.error("Error in getFilterOptions:", error)
    return {
      companies: [],
      roles: [],
      locations: [],
      interview_types: [],
      difficulties: [],
      outcomes: [],
    }
  }
}

export async function getFilteredExperiences(filters: {
  search?: string
  company?: string
  role?: string
  location?: string
  interview_type?: string
  difficulty?: string
  outcome?: string
}): Promise<Experience[]> {
  const { data, error } = await supabase.rpc("get_all_experiences")

  if (error) {
    console.error("Error fetching experiences:", error)
    return []
  }

  let filteredData = data

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredData = filteredData.filter(
      (exp: Experience) =>
        exp.company.toLowerCase().includes(searchLower) ||
        exp.role.toLowerCase().includes(searchLower) ||
        exp.location.toLowerCase().includes(searchLower),
    )
  }

  if (filters.company) {
    filteredData = filteredData.filter((exp: Experience) => exp.company === filters.company)
  }

  if (filters.role) {
    filteredData = filteredData.filter((exp: Experience) => exp.role === filters.role)
  }

  if (filters.location) {
    filteredData = filteredData.filter((exp: Experience) => exp.location === filters.location)
  }

  if (filters.interview_type) {
    filteredData = filteredData.filter((exp: Experience) => exp.interview_type === filters.interview_type)
  }

  if (filters.difficulty) {
    filteredData = filteredData.filter((exp: Experience) => exp.difficulty === filters.difficulty)
  }

  if (filters.outcome) {
    filteredData = filteredData.filter((exp: Experience) => exp.outcome === filters.outcome)
  }

  return filteredData
}

