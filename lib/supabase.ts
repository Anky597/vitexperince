import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://yyxjgkkhdxnthcaulqto.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eGpna2toZHhudGhjYXVscXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NzA4NzAsImV4cCI6MjA1MjU0Njg3MH0.UODnWyQAr_krCzwMjNPdW5wcZbSRdblvCh-oRBChEJc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

