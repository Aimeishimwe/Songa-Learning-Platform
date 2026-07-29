# Songa Academy Frontend Development Build Instructions

## Version 1.0
**Product Name:** Songa Academy
**Organization:** Songa Scholars Foundation
**Tagline:** Building a lifelong learning ecosystem for young Africans.

## 1. Project Objective
Build the first frontend version of Songa Academy, the official digital learning platform of Songa Scholars Foundation.

The goal is to create a realistic, professional, working frontend prototype that represents how the final platform will function.

This version will use mock data instead of a backend database.

## 2. Technology Requirements
Build using:

- React + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- React Context API
- Axios (prepared for future API integration)
- ESLint
- Git

## 3. Project Setup
Create a Vite React + TypeScript project, then install:

```bash
npm install react-router-dom lucide-react axios
```

## 4. Folder Architecture
Use this structure:

```text
src/
  assets/
  components/
  layouts/
  pages/
  routes/
  context/
  hooks/
  services/
  data/
  types/
  utils/
  styles/
  App.tsx
```

## 5. Design System
The platform should feel professional, modern, warm, clean, youth-friendly, and learning-focused.

### Color System
- Primary: #5B3CC4
- Main text: #111827
- Background: #F8FAFC
- Card: #FFFFFF
- Achievement: #F4B942
- Success: #10B981
- Information: #3B82F6
- Warning: #F59E0B
- Error: #EF4444

### Typography
Use Plus Jakarta Sans with heading sizes of 32px, 24px, 18px, 16px, and 14px.

## 6. Platform Structure
Songa Academy has four user experiences:
1. Scholar
2. Graduate
3. Mentor
4. Administrator

## 7. Navigation
### Scholar
- Dashboard
- My Learning
- Programs
- Announcements
- Events
- Profile
- Settings

### Mentor
- Dashboard
- My Cohorts
- Courses
- Assignments
- Announcements
- Events
- Profile
- Settings

### Administrator
- Dashboard
- Programs
- Academies
- Courses
- Cohorts
- Users
- Content Management
- Announcements
- Events
- Reports
- Settings

## 8. Pages To Build
### Authentication
- Login
- Forgot Password

### Scholar Pages
- Dashboard
- My Learning
- Programs
- Program Details
- Academy Details
- Course Details
- Module Details
- Assignment
- Assessment
- Announcements
- Events
- Profile
- Settings

### Mentor Pages
- Dashboard
- My Cohorts
- Cohort Details
- Scholar Details
- Assignments Management
- Course Content
- Announcements
- Profile

### Administrator Pages
- Dashboard
- Programs Management
- Academies Management
- Courses Management
- Content Management
- Cohorts Management
- Users Management
- Enrollment Management
- Announcements Management
- Events Management
- Reports
- Settings

## 9. Demo Data Requirements
Create realistic mock data in src/data/:
- users.ts
- programs.ts
- courses.ts
- modules.ts
- lessons.ts
- assignments.ts
- announcements.ts
- events.ts

## 10. Demo Programs
Create two programs:
- Songa Girls Initiative
- Songa Leadership Academy

## 11. Demo Users
Create:
- 20 scholars
- 3 mentors
- 1 administrator

## 12. Authentication Simulation
Create fake login using mock credentials:
- Scholar: scholar@songa.org / password
- Mentor: mentor@songa.org / password
- Admin: admin@songa.org / password
- Graduate: graduate@songa.org / password

Store the current user and role using Context API.

## 13. Role Protection
Implement protected routes so scholars cannot access admin routes, and admins can access everything.

## 14. Build Order
Follow this sequence:
1. Project setup
2. Design system
3. Authentication
4. Scholar experience
5. Mentor experience
6. Administrator experience

## 15. Code Quality Requirements
The code must:
- use reusable components
- avoid duplicated UI
- use TypeScript types
- keep pages separated from components
- prepare services for future APIs
- be responsive on mobile, tablet, and desktop

## 16. Final Expected Result
After completion, opening Songa Academy should feel like a professional learning platform where scholars can learn, mentors can support learners, and administrators can manage the ecosystem.

## Important Instruction to the AI Agent
Do not build only static pages. Create a functional frontend prototype with navigation, routing, role switching, mock authentication, realistic data, interactive components, and responsive layouts.
