# ITELECT4 Project - IT4B

## Project Concept

This project is the running TypeScript foundation for the ITELECT4 course, built session by session on top of the class demo domain (`User`, `Course`, `Submission`). It models students and instructors (`User`), the courses they're enrolled in or teaching (`Course`), and the graded task submissions tied to those courses (`Submission`). The `src/types/index.ts` file is the single source of truth for these shapes, and every future graded task (GT2-GT6) will import from it directly, so it's kept strictly typed and error-free under `strict` mode.

As of GT2, the project is a Vite + React + TypeScript app. The GT1 types moved from `types/index.ts` into `src/types/index.ts`, and the GT1 plain-TS demo code (`src/index.ts`, run with `ts-node`) has been superseded by React components rendered from `src/App.tsx`.

## Project Structure

```
src/
├── components/
│   ├── UserCard.tsx        <- typed props + event handlers
│   ├── CourseCard.tsx      <- typed props
│   └── SubmissionBadge.tsx <- React.FC + children
├── types/
│   └── index.ts            <- moved from GT1
├── App.tsx                 <- renders all 3 components with mock data
└── main.tsx
```

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