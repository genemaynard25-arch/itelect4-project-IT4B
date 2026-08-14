// src/data/mockData.ts
// Session 5 kept `student` and `allCourses` at the top of App.tsx. Several
// pages need that data now, so it moves into its own shared file.
import type { User, Course, Submission } from "../types/index";

export const student: User = {
    id: 1,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "student",
    isActive: true,
};

export const allCourses: Course[] = [
    {
        code: "ITELECT4",
        title: "IT Elective 4",
        units: 3,
        semester: "1st Semester 2026-2027",
    },
    {
        code: "DISMATH",
        title: "Discrete Mathematics",
        units: 3,
        semester: "1st Semester 2026-2027",
    },
    {
        code: "WINSERVER",
        title: "Windows Server Administration",
        units: 3,
        semester: "1st Semester 2026-2027",
    },
];

export const allSubmissions: Submission[] = [
    {
        id: 1,
        studentId: 1,
        courseCode: "ITELECT4",
        repoUrl: "github.com/juandc/itelect4-project",
        submittedAt: new Date(),
        score: 95,
    },
    {
        id: 2,
        studentId: 1,
        courseCode: "DISMATH",
        repoUrl: "github.com/juandc/discmath-bst",
        submittedAt: new Date(),
    },
];
