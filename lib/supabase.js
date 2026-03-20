import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://glmtyywrjunhyqkwmimg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsbXR5eXdyanVuaHlxa3dtaW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMjQwMjcsImV4cCI6MjA4OTYwMDAyN30.yggQrU2uCa7q4ID61DfYpZmD7zUl4nFDjs9yaI5btTY'

export const supabase = createClient(supabaseUrl, supabaseKey)