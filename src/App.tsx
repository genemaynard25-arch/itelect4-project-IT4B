import { useState, useEffect, useRef } from "react";
import type { User, Course, Submission } from "./types/index";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";
import "./App.css";

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
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== TYPED DOM REFERENCE =====
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ===== CUSTOM HOOKS =====
  const [showDetails, toggleDetails] = useToggle(false);
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
  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="app">
      <div className="search-bar">
        <input
          ref={searchInputRef}
          value={searchTerm}
          type="text"
          placeholder="Search courses..."
          onChange={handleSearchChange}
        />
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="previous-search">Previous search: "{previousSearch}"</p>
        )}
      </div>

      <div className="user-section">
        <UserCard user={student} onSelect={setSelectedUser} />
        <div className="user-section-side">
          {selectedUser && <p>Selected: {selectedUser.name}</p>}
          <button onClick={toggleDetails}>
            {showDetails ? "Hide" : "Show"} Details
          </button>
        </div>
      </div>

      <div className="course-grid">
        {filteredCourses.map((c) => (
          <CourseCard key={c.code} course={c} />
        ))}
      </div>

      {showDetails && (
        <SubmissionBadge submission={submission}>
          <p>On time!</p>
        </SubmissionBadge>
      )}
    </div>
  );
}

export default App;
