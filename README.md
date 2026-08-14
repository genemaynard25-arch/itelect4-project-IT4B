# ITELECT4 Project - IT4B

## Project Concept

This project is the running TypeScript foundation for the ITELECT4 course, built session by session on top of the class demo domain (`User`, `Course`, `Submission`). It models students and instructors (`User`), the courses they're enrolled in or teaching (`Course`), and the graded task submissions tied to those courses (`Submission`).

As of GT2, the project is a Vite + React + TypeScript app styled with Tailwind CSS v4, with typed state/effects/refs and a class-based dark mode toggle. As of GT3 Part 1, the single-page app became a multi-page app: React Router v8 handles navigation, a Zustand store tracks login state, and a `ProtectedRoute` gates the Submissions page behind login.

## Project Structure

```
src/
├── App.tsx                 <- ONLY the route table now
├── main.tsx                <- wraps <App /> in <BrowserRouter>
├── components/
│   ├── UserCard.tsx        <- typed props + typed event handlers, Tailwind styled
│   ├── CourseCard.tsx      <- typed props + "default"/"compact" variant, Tailwind styled
│   ├── SubmissionBadge.tsx <- React.FC + children, Tailwind styled
│   ├── Layout.tsx           <- shared nav bar, dark mode toggle, <Outlet />
│   └── ProtectedRoute.tsx   <- redirects to /login when there's no token
├── pages/
│   ├── DashboardPage.tsx    <- index route "/"
│   ├── CoursesPage.tsx      <- "/courses" -- search + filtered grid
│   ├── CourseDetailPage.tsx <- "/courses/:code" -- typed useParams + useNavigate
│   ├── LoginPage.tsx        <- "/login" -- calls the Zustand login() action
│   ├── SubmissionsPage.tsx  <- "/submissions" -- behind ProtectedRoute
│   └── NotFoundPage.tsx     <- "*" catch-all, fixes the blank-page-on-typo problem
├── store/
│   └── authStore.ts         <- Zustand store: token, userName, login, logout
├── data/
│   └── mockData.ts          <- shared student/allCourses/allSubmissions
├── hooks/
│   ├── useToggle.ts         <- powers both "Show Details" and dark mode
│   └── usePrevious.ts       <- tracks the previous search term
├── types/
│   └── index.ts             <- moved from GT1
└── index.css                 <- @import "tailwindcss"; + dark-mode custom variant
```

## Routing

React Router v8 (`react-router`, **not** `react-router-dom` -- that package was removed in v8). `Layout` renders the shared nav bar and an `<Outlet />`; every page nests under it in `App.tsx`. `ProtectedRoute` is a pathless layout route that redirects to `/login` when the Zustand store has no `token`, otherwise renders its own `<Outlet />`.

Try it locally: `/`, `/courses`, `/courses/ITELECT4`, `/courses/BANANA` (handled gracefully), `/submissions` (redirects to `/login` until you log in with any name), and any nonsense URL (shows the 404 page, nav bar still attached).

## Types & Interfaces Defined So Far

**Interfaces**
- `User` - id, name, email, role (`"student" | "admin" | "instructor"`), isActive
- `Course` - code, title, units, semester
- `Submission` - id, studentId, courseCode, repoUrl, submittedAt, optional score
- `ApiResponse<T>` - generic wrapper (`success`, `data: T`, optional `message`) reused for every API response shape

**Type Aliases**
- `ID` - `number | string`
- `Coordinate` - `{ x: number; y: number }`
- `Formatter` - `(value: number) => string`
- `StringOrNumber` - `string | number`
- `Status` - `"pending" | "active" | "inactive"`
- `StudentWithCourse` - intersection of `User` and course enrollment fields

**Utility Types**
- `UserUpdate` - `Partial<User>`
- `UserPreview` - `Pick<User, "id" | "name" | "role">`
- `PublicUser` - `Omit<User, "email" | "isActive">`
- `RoleCount` - `Record<"student" | "admin" | "instructor", number>`

**Enums**
- `SubmissionStatus` - regular enum (`Pending`, `Graded`, `Late`)
- `Role` - const enum (`Student`, `Admin`, `Instructor`)

## How to Install and Run

```bash
npm install
npm run dev              # starts the Vite dev server with hot reload
npx tsc -b               # type-check the whole project, no output emitted
npm run build            # production build
```