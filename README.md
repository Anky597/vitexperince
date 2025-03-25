# VIT Interview Experiences 🚀🚀🚀🚀
**VIT Interview Experiences** is a web application designed exclusively for VIT University students. It provides a platform to share and access real-world interview experiences, enabling students to prepare effectively for job interviews while learning from their peers.

## Visit Application at : - https://vitinterview.vercel.app/
---
<img width="1418" alt="Screenshot 2025-03-25 at 10 22 51 PM" src="https://github.com/user-attachments/assets/6713c36f-e717-4998-bcb9-48927c30c48e" />
<img width="1417" alt="Screenshot 2025-03-25 at 10 23 03 PM" src="https://github.com/user-attachments/assets/e129a4b8-60ae-4a34-aa10-3dd0819bcf49" />
<img width="1422" alt="Screenshot 2025-03-25 at 10 23 18 PM" src="https://github.com/user-attachments/assets/48147901-e63b-479c-a0b9-3890712e8462" />
<img width="1411" alt="Screenshot 2025-03-25 at 10 23 32 PM" src="https://github.com/user-attachments/assets/89215f53-da91-41d3-a192-13628a8711aa" />
<img width="1424" alt="Screenshot 2025-03-25 at 10 23 53 PM" src="https://github.com/user-attachments/assets/a5025c87-e769-4ba8-9d97-69d03bb8b7f0" />


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
  - [Frontend Architecture](#frontend-architecture)
  - [Backend Architecture](#backend-architecture)
  - [Database Schema](#database-schema)
  - [Authentication Flow](#authentication-flow)
  - [Data Flow](#data-flow)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage & API Documentation](#usage--api-documentation)
- [Deployment](#deployment)
- [Performance Optimizations](#performance-optimizations)
- [Security Measures](#security-measures)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**VIT Interview Experiences** is built to empower VIT University students with insights into the interview process. By allowing students to browse, search, and filter interview experiences by company, role, location, and more, the platform fosters a community of shared learning. In addition, users can contribute their own experiences, which helps build a comprehensive resource for interview preparation.

---

## Features

- **User Authentication:**  
  Secure login and registration via Firebase Authentication. Only users with a `@vitstudent.ac.in` email are allowed to sign up. Email verification is enforced for account activation.

- **Browse & Search Experiences:**  
  View a comprehensive list of interview experiences with options to filter by company, role, location, and other criteria.

- **Detailed Experience View:**  
  Access in-depth details of each interview experience including interview rounds, questions, tips, and outcomes.

- **Submit Experiences:**  
  Students can share their interview experiences using an intuitive submission form.

- **Like System:**  
  Engage with content by liking experiences, providing instant UI feedback through optimistic updates.

- **Responsive Design & Mobile Navigation:**  
  The UI is fully responsive and includes a slide-in menu for mobile devices.

- **Dark Theme:**  
  A modern dark mode is available to enhance readability in low-light conditions.

- **Analytics:**  
  Integrated Vercel Analytics tracks usage and performance, ensuring data-driven improvements.

---

## Tech Stack

### Frontend

- **Framework:** Next.js 13+ (App Router)
- **UI Library:** React 18+
- **Styling:** Tailwind CSS
- **Component Library:** shadcn/ui (customized components)
- **Animation:** Framer Motion
- **State Management:** React Hooks
- **Form Handling:** React Hook Form
- **Analytics:** Vercel Analytics

### Backend

- **Server:** Next.js API Routes (Serverless Functions)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Firebase Authentication
- **Hosting:** Vercel

---

## Architecture

### Frontend Architecture

The frontend is built using Next.js with the App Router, ensuring a modern, efficient structure for both server-side rendering and client-side navigation.

**Key Components:**

- **Layout (`app/layout.tsx`):**  
  Provides the overall structure including Header, Footer, and Analytics integration.

- **Pages:**
  - **Home (`app/page.tsx`):** Landing page offering an overview of the platform.
  - **Experiences (`app/experiences/page.tsx`):** Displays the list of interview experiences.
  - **Submit (`app/submit/page.tsx`):** Contains the form for submitting new interview experiences.
  - **About (`app/about/page.tsx`):** Provides information about the platform.
  - **Login (`app/login/page.tsx`):** Handles user authentication.

- **Reusable Components:**
  - **Header (`app/components/Header.tsx`):** Navigation and user authentication status.
  - **Footer (`app/components/Footer.tsx`):** Consistent footer across the site.
  - **ExperienceList (`app/components/ExperienceList.tsx`):** Renders a list of experiences.
  - **ExperienceDetail (`app/components/ExperienceDetail.tsx`):** Detailed view for a single experience.
  - **SearchFilters (`app/components/SearchFilters.tsx`):** Filtering options for experiences.

### Backend Architecture

The backend utilizes Next.js API Routes for serverless functions, working seamlessly with Supabase for database operations.

**Key Features:**

- **Server-side Rendering:**  
  Improves SEO and performance by rendering pages on the server.

- **API Routes:**  
  Dedicated endpoints for data fetching, mutations, and form submissions.

- **Server Actions:**  
  Handle critical operations like submitting new interview experiences.

### Database Schema

The project uses Supabase (PostgreSQL) to store data with the following schema:

- **Users Table:**
  - `id` (UUID, primary key)
  - `email` (text, unique)
  - `created_at` (timestamp)

- **Experiences Table:**
  - `id` (bigint, primary key)
  - `user_id` (UUID, foreign key referencing Users)
  - `company` (text)
  - `role` (text)
  - `date` (date)
  - `location` (text)
  - `interview_type` (text)
  - `branch` (text)
  - `overall_experience` (text)
  - `tips` (text)
  - `salary` (text, nullable)
  - `difficulty` (text)
  - `outcome` (text)
  - `likes` (integer)
  - `created_at` (timestamp)

- **Rounds Table:**
  - `id` (bigint, primary key)
  - `experience_id` (bigint, foreign key referencing Experiences)
  - `round_name` (text)
  - `description` (text)

- **Questions Table:**
  - `id` (bigint, primary key)
  - `round_id` (bigint, foreign key referencing Rounds)
  - `question` (text)

### Authentication Flow

1. **Sign Up:**  
   Users sign up with their VIT student email (`@vitstudent.ac.in`).

2. **Email Verification:**  
   A verification email is sent; the account becomes active only after verification.

3. **Login:**  
   Firebase Authentication manages user sessions and provides client-side session tracking using `onAuthStateChanged`.

### Data Flow

- **Fetching Experiences:**
  - The `getExperiences` function (in `lib/db.ts`) calls a Supabase RPC function.
  - Data is fetched server-side on the Experiences page and rendered via the `ExperienceList` component.

- **Submitting Experiences:**
  - Form data is collected on the Submit page.
  - The `createExperience` function (in `lib/db.ts`) processes submissions and inserts data into multiple tables (Experiences, Rounds, Questions).

- **Liking Experiences:**
  - The `likeExperience` function (in `lib/db.ts`) updates the likes count using optimistic UI updates for immediate feedback.

---

## Getting Started

### Prerequisites

- **Node.js:** Version 16.8.0 or later
- **Package Manager:** npm or yarn
- **Accounts:** Supabase and Firebase accounts are required

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/vit-interview-experiences.git
   cd vit-interview-experiences
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file in the root directory and add the following variables (replace placeholder values with your configuration):

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Supabase Configuration
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Usage & API Documentation

- **User Flow:**  
  Once authenticated, users can browse interview experiences, use filters to refine search results, view detailed experiences, and submit their own experiences.

- **API Endpoints:**  
  Detailed API documentation is provided within the project codebase (e.g., comments in Next.js API routes). Review the `/pages/api` directory for endpoints handling data fetching, mutations, and authentication.

---

## Deployment

The application is deployed on [Vercel](https://vercel.com/):

- **Automatic Deployments:**  
  Push changes to the GitHub repository and Vercel will automatically deploy the latest version.

- **Monitoring:**  
  Integrated Vercel Analytics provides real-time insights into user traffic and performance.

---

## Performance Optimizations

- **Server-Side Rendering (SSR):**  
  Leverages Next.js SSR to improve SEO and reduce initial load times.
- **Optimistic UI Updates:**  
  Provides a smooth user experience during operations like liking an experience.
- **Efficient Data Fetching:**  
  Utilizes serverless functions and Supabase’s efficient query handling.

---

## Security Measures

- **Email Domain Restriction:**  
  Only `@vitstudent.ac.in` emails are allowed for authentication.
- **Firebase Authentication:**  
  Ensures secure user session management.
- **Environment Variables:**  
  Sensitive keys and configurations are securely managed via environment variables.

---

## Future Enhancements

- **Enhanced Filtering:**  
  Add more granular filters based on additional interview parameters.
- **User Profiles:**  
  Implement detailed user profiles for personalized experience.
- **Community Features:**  
  Introduce comments and discussion forums for richer user interaction.
- **Improved Analytics:**  
  Further refine analytics to include user behavior insights and trend analysis.

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**
2. **Create a Feature Branch:**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes:**

   ```bash
   git commit -m "Add some feature"
   ```

4. **Push to the Branch:**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request:**  
   Provide a detailed description of your changes and the problem they solve.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or feedback, please open an issue in this repository or contact the maintainer at [your_email@vitstudent.ac.in](mailto:vitexperince@gmail.com).

---

This README provides a comprehensive and professional overview of the VIT Interview Experiences project, covering everything from architecture and installation to usage and future plans. Enjoy contributing and using the platform!
