-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    description_en TEXT,
    description_id TEXT,
    category TEXT,
    year TEXT,
    frontend_repo TEXT,
    backend_repo TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Project Media Table
CREATE TABLE IF NOT EXISTS project_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    media_type TEXT CHECK (media_type IN ('image', 'video')),
    media_url TEXT
);

-- 3. Project Tech Table
CREATE TABLE IF NOT EXISTS project_tech (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tech_name TEXT
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    level TEXT
);

-- 5. Experience Table
CREATE TABLE IF NOT EXISTS experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT,
    role TEXT,
    period_en TEXT,
    period_id TEXT
);

-- 6. Experience Details Table
CREATE TABLE IF NOT EXISTS experience_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experience_id UUID REFERENCES experience(id) ON DELETE CASCADE,
    detail_en TEXT,
    detail_id TEXT
);

-- 7. About Table (Optional, for completeness since data exists in portfolioData)
CREATE TABLE IF NOT EXISTS about_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    role TEXT,
    profile_image TEXT,
    resume_url TEXT
);

-- 8. Personal Info Table (Age, Location, etc.)
CREATE TABLE IF NOT EXISTS personal_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    info_key TEXT,
    label_en TEXT,
    label_id TEXT,
    value_en TEXT,
    value_id TEXT
);

-- 9. Contact Table
CREATE TABLE IF NOT EXISTS contact_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT,
    phone TEXT,
    location TEXT,
    linkedin TEXT,
    github TEXT
);

-- Optional: Initial RLS policies
-- Allow public read access to all newly created tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);

ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON project_media FOR SELECT USING (true);

ALTER TABLE project_tech ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON project_tech FOR SELECT USING (true);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON skills FOR SELECT USING (true);

ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON experience FOR SELECT USING (true);

ALTER TABLE experience_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON experience_details FOR SELECT USING (true);

ALTER TABLE about_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON about_info FOR SELECT USING (true);

ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON personal_info FOR SELECT USING (true);

ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON contact_info FOR SELECT USING (true);
