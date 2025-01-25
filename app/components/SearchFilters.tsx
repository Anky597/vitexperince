"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getFilterOptions, getFilteredExperiences } from "@/lib/db"

interface FilterOptions {
  companies: string[]
  roles: string[]
  locations: string[]
  interview_types: string[]
  difficulties: string[]
  outcomes: string[]
}

interface SearchFiltersProps {
  onFilterChange: (experiences: any[]) => void
}

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [search, setSearch] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [location, setLocation] = useState("")
  const [interviewType, setInterviewType] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [outcome, setOutcome] = useState("")
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    companies: [],
    roles: [],
    locations: [],
    interview_types: [],
    difficulties: [],
    outcomes: [],
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const options = await getFilterOptions()
        setFilterOptions(options)
        setError(null)
      } catch (err) {
        console.error("Error fetching filter options:", err)
        setError("Failed to load filter options. Please try again later.")
      }
    }
    fetchFilterOptions()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const filters = {
        search,
        company,
        role,
        location,
        interview_type: interviewType,
        difficulty,
        outcome,
      }
      const filteredExperiences = await getFilteredExperiences(filters)
      onFilterChange(filteredExperiences)
      setError(null)
    } catch (err) {
      console.error("Error filtering experiences:", err)
      setError("Failed to filter experiences. Please try again later.")
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="flex space-x-4">
        <Input
          type="text"
          placeholder="Search experiences..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={company} onValueChange={setCompany}>
          <SelectTrigger>
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {filterOptions.companies.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {filterOptions.roles.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {filterOptions.locations.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={interviewType} onValueChange={setInterviewType}>
          <SelectTrigger>
            <SelectValue placeholder="Interview Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {filterOptions.interview_types.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            {filterOptions.difficulties.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={outcome} onValueChange={setOutcome}>
          <SelectTrigger>
            <SelectValue placeholder="Outcome" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Outcomes</SelectItem>
            {filterOptions.outcomes.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  )
}

