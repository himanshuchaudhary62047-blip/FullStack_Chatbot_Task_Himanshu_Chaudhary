-- DroneTV AI Support & Lead Assistant Database Schema

-- Drop table if exists (for easy reset/setup)
DROP TABLE IF EXISTS enquiries;

-- Create main enquiries table
CREATE TABLE enquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('Student', 'Customer', 'Other')),
    service_or_course VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for filtering and searching
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_user_type ON enquiries(user_type);
