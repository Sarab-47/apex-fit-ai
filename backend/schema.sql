-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    weight_kg FLOAT NOT NULL,
    height_cm FLOAT NOT NULL,
    gender VARCHAR(50) NOT NULL,
    goal VARCHAR(50) NOT NULL, -- 'lose_fat', 'maintain', 'gain_muscle'
    activity_level VARCHAR(50) NOT NULL,
    training_experience_months INT NOT NULL,
    days_per_week INT NOT NULL
);

-- Meals table
CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    calories INT NOT NULL,
    protein_g FLOAT NOT NULL,
    carbs_g FLOAT NOT NULL,
    fat_g FLOAT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);
