import { useState, useEffect, useRef } from "react";
import type { User, Course, Submission } from "./types/index";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";
import "./index.css";

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const allCourses: Course[] = [
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

const submission: Submission = {
  id: 1,
  studentId: 1,
  courseCode: allCourses[0].code,
  repoUrl: "github.com/juandc/itelect4-project",
  submittedAt: new Date(),
  score: 95,
};

function App() {
  // ===== TYPED STATE =====
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== TYPED DOM REFERENCE =====
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ===== CUSTOM HOOKS =====
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // ===== LOAD MOCK DATA ON MOUNT =====
  useEffect(() => {
    setTimeout(() => {
      // Reusing GT1's course mock data as the "fetched" result
      setCourses(allCourses);
      setIsLoading(false);
    }, 500);
  }, []);

  // ===== TYPED EVENT HANDLER =====
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  // Derived value -- recomputed every render, not stored in state
  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="animate-pulse p-6 text-gray-500">
        Loading courses...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700">
        Could not load courses. Please try again.
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white
              dark:bg-gray-200 dark:text-gray-900"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={() => setIsError(true)}
            className="rounded bg-red-100 px-2 py-1 text-xs text-red-700"
          >
            Simulate Error
          </button>
        </div>

        <div className="mt-4">
          <input
            ref={searchInputRef}
            value={searchTerm}
            type="text"
            placeholder="Search courses..."
            onChange={handleSearchChange}
            className="w-full rounded border border-gray-300 p-2 text-sm
              dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          {previousSearch !== undefined && previousSearch !== searchTerm && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Previous search: "{previousSearch}"
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-start gap-4">
          <UserCard user={student} onSelect={setSelectedUser} />
          <div className="flex flex-col items-start gap-2 pt-2">
            {selectedUser && (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Selected: {selectedUser.name}
              </p>
            )}
            <button
              onClick={toggleDetails}
              className="rounded bg-gray-200 px-3 py-1.5 text-sm
                text-gray-800 hover:bg-gray-300
                dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              {showDetails ? "Hide" : "Show"} Details
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((c) => (
            <CourseCard key={c.code} course={c} variant="compact" />
          ))}
        </div>

        {showDetails && (
          <div className="mt-6 max-w-sm">
            <SubmissionBadge submission={submission}>
              <p>On time!</p>
            </SubmissionBadge>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
