# T3-Prolecom-App Development Guidelines

## Project Scope & Focus
- This mobile application is a secondary component of the Prolecom platform, serving as a "pocket study tool".
- The primary target user for the mobile experience is the **Student** role. Features prioritize content consumption, self-evaluation, and gamification tracking.

## Project Tech Stack
- Frontend Framework: React Native (Expo Blank Template)
- Target Platform: Android / iOS (via Expo Go client app)
- API Integration: External connection via HTTPS to Laravel Backend API (JWT Authentication)

## Project Directory Architecture
We will enforce a clean components/screens architecture:
- `/screens`: Modular application views (Login, Dashboard, Course, MaterialViewer, Leaderboard, QuestionBank, Quiz, Flashcards)
- `/components`: Reusable UI elements (Buttons, Cards, Inputs, Custom Viewers, FlipCards)
- `/services`: API consumption layer, endpoints handlers, and configuration
- `/context` or `/hooks`: Global state and JWT authentication token persistence
- `/utils`: Helpers for time formatting, AI prompt formatting, etc.

## Development Milestones

### Milestone 1: MOB-01 (Login & Dashboard)
1. Set up basic Tailwind/NativeWind or custom StyleSheet standard guidelines.
2. Build an API client service using `fetch` or `axios` with interceptors for JWT.
3. Create the Login Screen validating with the `/api/login` endpoint (Focus on Student access).
4. Persistent session storage using `Expo SecureStore` or `AsyncStorage`.
5. Develop Student Dashboard showing enrolled courses.

### Milestone 2: MOB-02 (Course View & Learning Materials)
1. Build the specific Course View navigating from the Dashboard.
2. Implement PDF viewer optimized for mobile screens.
3. Implement video link redirect/viewer for class recordings.

### Milestone 3: MOB-03 (Gamification & Leaderboard)
1. Build the "Podio" (Leaderboard) screen for each course.
2. Fetch and list students sorted by XP/points gained from coding challenges.

### Milestone 4: MOB-04 (Question Bank & Quizzes)
1. Integrate logic to auto-generate multiple-choice questions from topic materials.
2. Build a timed Quiz interface for students to self-evaluate privately.
3. Create a Quiz Results screen.

### Milestone 5: MOB-05 (Flashcards Mode - US-STU-12)
1. Develop an interactive "Flip" card component for studying.
2. Implement a swipe/carousel navigation for the flashcards generated from the quiz questions.
