import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bdhmccihycmqfkbgwxph.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkaG1jY2loeWNtcWZrYmd3eHBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODA5MjQsImV4cCI6MjA4ODU1NjkyNH0.Pi3YaFpBAZR1sDyPe1-w-IU5a1Ra2lRmEh-QWnNRTaI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
