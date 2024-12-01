CREATE TABLE IF NOT EXISTS vendors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    certifications TEXT[],
    rating FLOAT DEFAULT 0
);

INSERT INTO vendors (name, location, certifications, rating) VALUES
('Vendor A', 'New York', '{"ISO9001"}', 4.5),
('Vendor B', 'Los Angeles', '{"ISO14001"}', 4.0);