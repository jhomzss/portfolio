CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE profile (
  id INT AUTO_INCREMENT PRIMARY KEY,
  greeting VARCHAR(100),
  full_name VARCHAR(100),
  role_title VARCHAR(150),
  bio TEXT,
  photo VARCHAR(255)
);

CREATE TABLE education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year_range VARCHAR(50),
  title VARCHAR(150),
  institution VARCHAR(150),
  sort_order INT DEFAULT 0
);

CREATE TABLE experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_range VARCHAR(50),
  title VARCHAR(150),
  company VARCHAR(150),
  sort_order INT DEFAULT 0
);

CREATE TABLE experience_bullets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  experience_id INT,
  bullet_text VARCHAR(255),
  FOREIGN KEY (experience_id) REFERENCES experience(id) ON DELETE CASCADE
);

CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category ENUM('technical','software','personal') NOT NULL,
  name VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE interests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE project_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES project_categories(id) ON DELETE SET NULL
);

CREATE TABLE project_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  tag VARCHAR(50),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE contact_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(50),
  value VARCHAR(255),
  link VARCHAR(255)
);

-- Seed data from your resume
INSERT INTO profile (greeting, full_name, role_title, bio, photo) VALUES
('Hi, I''m', 'Jhomel Togado', 'Incoming BSIT Graduate · Web Developer',
'Seeking an entry-level position where I can apply my skills in Information Technology. I''m a fast learner, dependable, and willing to take on tasks assigned to me.',
'file/profile.png');

INSERT INTO education (year_range, title, institution, sort_order) VALUES
('2022 — Present', 'Bachelor of Science in Information Technology (BSIT)', 'Pamantasan ng Lungsod ng Valenzuela', 1),
('2020 — 2022', 'Information and Communication Technology', 'Datamex College of Saint Adeline', 2),
('2016 — 2020', 'Junior High School Education', 'Dalandanan National High School', 3),
('2010 — 2016', 'Elementary Education', 'Sitio Santo Rosario Elementary School', 4);

INSERT INTO experience (date_range, title, company, sort_order) VALUES
('Aug — Dec 2025 (5 months)', 'Finance & Insurance Intern', 'Toyota Marilao, Bulacan Inc.', 1);

INSERT INTO experience_bullets (experience_id, bullet_text) VALUES
(1, 'Encoded and updated financing data into the TFS (Toyota Financial Services)'),
(1, 'Organized and scanned financing documents including sales invoices and credit advice'),
(1, 'Prepared and printed load forms (PNCM, ADA, TFS)'),
(1, 'Filed and labeled financing records; coordinated routing with the Accounting Department');

INSERT INTO skills (category, name, sort_order) VALUES
('technical','Web Development',1),('technical','Computer Hardware Knowledge',2),
('technical','Ethernet Cabling',3),('technical','UI/UX Design',4),
('software','Visual Studio Code',1),('software','XAMPP',2),('software','Adobe Photoshop',3),
('software','Adobe After Effects',4),('software','Adobe Lightroom',5),('software','Adobe Illustrator',6),
('software','Adobe Premiere Pro',7),('software','Alight Motion',8),('software','Canva',9),
('software','Figma',10),('software','Unity',11),('software','Blender',12),
('personal','Time Management',1),('personal','Teamwork',2),('personal','Adaptability',3),
('personal','Accountability',4),('personal','Reliability',5);

INSERT INTO interests (name) VALUES
('Graphic Design'),('Photography'),('Video Editing'),
('Gaming & Entertainment'),('Videography'),('Skill Development'),('Photo Editing');

INSERT INTO project_categories (name, sort_order) VALUES
('Web Development', 1),
('UI/UX Design', 2),
('Graphic Design & Video Editing', 3), 
('Mobile App Development', 4),
('Capstone / Thesis Project', 5),
('School / Academic Projects', 6),
('Game Development', 7),
('Photography', 8),
('3D Design & Animation', 9),
('Branding & Logo Design', 10),
('Personal Projects', 11),
('Freelance Work', 12),
('Networking / Hardware Projects', 13);

INSERT INTO contact_info (label, value, link) VALUES
('Email', 'togadojhomel28@gmail.com', 'mailto:togadojhomel28@gmail.com'),
('Location', 'Valenzuela City, Philippines', NULL);

-- Default admin: username "admin", password "admin123" (change after first login!)
INSERT INTO admins (username, password) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');