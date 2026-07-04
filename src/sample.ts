// index.ts -- converted from sample.js for GT1 Part 1
// Task: convert to TS. Annotate all vars, params, return types

import type { User, Course, Submission } from "../types/sample";

type Grade = "A" | "B" | "C" | "F";

function getUser(id: number): User {
    return {
        id: id,
        name: "Juan dela Cruz",
        email: "juan@example.com",
        role: "student",
        isActive: true,
        score: 95.5,
    };
}

function calculateGrade(score: number, maxScore: number): Grade {
    const percentage: number = (score / maxScore) * 100;
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    return "F";
}

function formatCourse(course: Course): string {
    return `${course.title} (${course.units} units) - ${course.semester}`;
}

const user: User = getUser(1);
console.log(user);
console.log(calculateGrade(85, 100));

// ===== USING THE OTHER INTERFACES =====
const course: Course = {
    code: "ITELECT4",
    title: "IT Elective 4",
    units: 3,
    semester: "1st Semester 2026-2027",
};

console.log(formatCourse(course));