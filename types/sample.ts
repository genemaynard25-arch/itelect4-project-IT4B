export interface User {
    id: number;
    name: string;
    email: string;
    role: "student" | "admin" | "instructor";
    isActive: boolean;
    score: number;
}

export interface Course {
    code: string;
    title: string;
    units: number;
    semester: string;
}

export interface Submission {
    id: number;
    studentId: number;
    courseCode: string;
    repoUrl: string;
    submittedAt: Date;
    score?: number;
}

export type Grade = "A" | "B" | "C" | "F";
export type StringOrNumber = string | number;
export type ID = number | string;
export type Status = "pending" | "active" | "inactive";

export type Coordinate = {
    x: number;
    y: number;
};

export type Formatter = (value: number) => string;

export type StudentWithCourse = User & {
    enrolledCourse: Course;
    gpa: number;
};

export function printId(id: StringOrNumber): void {
    console.log(`ID: ${id}`);
}