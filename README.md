# Exam App

A web app for taking exams and quizzes, built with **Next.js 15** and a modern UI. It connects to an external API for auth, diplomas, exams, questions, and results.

---

## Features

- **Authentication**  
  Login, sign up, forgot password (reset via OTP), and secure sign out.

- **Diplomas & Subjects**  
  Browse diplomas and subjects with infinite scroll.

- **Exams**  
  View available exams per subject and open exam pages.

- **Questions & Results**  
  Take exams (multiple-choice questions), submit answers, and view results with a countdown timer.

- **Account**  
  Edit profile, change password, and delete account.

- **UI**  
  Responsive layout, sidebar navigation, skeleton loading, and error handling.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org) | Framework (App Router) |
| [React 19](https://react.dev) | UI |
| [NextAuth.js](https://next-auth.js.org) | Auth (Credentials) |
| [TanStack Query](https://tanstack.com/query) | API state & caching |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Forms & validation |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Radix UI](https://www.radix-ui.com) | Accessible components |
| [Lucide React](https://lucide.dev) | Icons |
| [Recharts](https://recharts.org) | Charts (results) |
| [Sonner](https://sonner.emilkowal.ski) | Toasts |

---

## Requirements

- **Node.js** 18.x or newer  
- **Yarn**

---

## Installation & Running

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/exam-app.git
cd exam-app
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Environment variables

Copy the example env file and create a local one:

```bash
cp .env.example .env.local
```

Edit `.env.local` with the correct values:

| Variable | Description |
|----------|-------------|
| `API_BASE_URL` | API base URL (e.g. `https://exam.elevateegy.com/api/v1`) |
| `NEXTAUTH_URL` | App URL locally (e.g. `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | NextAuth secret (e.g. run `openssl rand -base64 32`) |

### 4. Start the dev server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects the root to `/diplomas`.

---

## Scripts

| Command | Description |
|--------|-------------|
| `yarn dev` | Start dev server |
| `yarn build` | Build for production |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |

---

## Project structure (overview)

```
src/
├── app/
│   ├── (auth)/           # Login, sign up, forgot password
│   ├── (home)/           # Diplomas, exams, questions, account
│   ├── api/              # NextAuth + API routes (exams, subjects, questions)
│   ├── layout.tsx
│   └── page.tsx
├── auth.ts               # NextAuth config (Credentials, callbacks)
├── components/           # Shared & UI components
├── lib/
│   ├── actions/          # Auth actions (signup, forgot, reset)
│   ├── api/              # API clients (exams, questions, profile, …)
│   ├── schemas/          # Zod schemas for forms
│   ├── types/            # TypeScript types
│   └── utils/
├── hooks/                # Custom hooks
└── middleware.ts         # Route protection & auth
```

---

## Deploy on Vercel

1. Push the project to GitHub and import it as a new project on [Vercel](https://vercel.com).
2. In **Settings → Environment Variables**, add:
   - `API_BASE_URL`
   - `NEXTAUTH_URL` = your deployment URL (e.g. `https://exam-app.vercel.app`)
   - `NEXTAUTH_SECRET`
3. Deploy. After the first deploy, set `NEXTAUTH_URL` to the final URL and redeploy if needed.

---

## License

This project is private. Use it according to your project and organization policy.
