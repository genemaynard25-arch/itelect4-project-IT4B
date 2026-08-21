// src/pages/CoursesPage.tsx
import { useQuery } from "@tanstack/react-query"; // <-- SESSION 7
import { Link } from "react-router";
import type { Course } from "../types/index";
import CourseCard from "../components/CourseCard";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore"; // <-- SESSION 7
import { fetchCourses } from "../api/client"; // <-- SESSION 7
// useState, useEffect, useRef and the mockData import are GONE --
// courses now come from json-server, and the search box lives in uiStore

function CoursesPage() {
  // These four lines replace ALL of GT3 Part 1's fetching state
  const { data, isPending, isError, error } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  // The search box now reads and writes the store, not local state
  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const previousSearch = usePrevious(searchTerm);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(e.target.value);

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500">
        Loading courses...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} -- is json-server running on port 3001?
      </div>
    );
  }

  // Below this line data is Course[], never undefined -- the two
  // returns above ruled the other cases out, and TypeScript followed.
  const filteredCourses = data.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Courses
      </h2>

      <input
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

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((c) => (
          <Link key={c.code} to={`/courses/${c.code}`}>
            <CourseCard course={c} variant="compact" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
