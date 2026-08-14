// src/pages/DashboardPage.tsx
import { useState } from "react";
import type { User } from "../types/index";
import UserCard from "../components/UserCard";
import SubmissionBadge from "../components/SubmissionBadge";
import useToggle from "../hooks/useToggle";
import { student, allSubmissions } from "../data/mockData";

function DashboardPage() {
  // These came straight from GT2's App.tsx, unchanged
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, toggleDetails] = useToggle(false);

  const latestSubmission = allSubmissions[0];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>

      <div className="flex flex-wrap items-start gap-4">
        <UserCard user={student} onSelect={setSelectedUser} />
        <div className="flex flex-col items-start gap-2 pt-2">
          {selectedUser && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Selected: {selectedUser.name} ({selectedUser.role})
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

      {showDetails && (
        <div className="mt-6 max-w-sm">
          <SubmissionBadge submission={latestSubmission}>
            <p>Latest submission</p>
          </SubmissionBadge>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
