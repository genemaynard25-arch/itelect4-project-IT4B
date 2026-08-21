import type { ApiSubmission } from "../types/index"; // <-- was Submission

interface SubmissionBadgeProps {
  submission: ApiSubmission; // <-- SESSION 7: data now comes over HTTP
  children?: React.ReactNode;
}

const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({
  submission,
  children,
}) => {
  return (
     <div
      className="rounded-lg border border-gray-200 bg-white p-5
      shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <p className="text-gray-600 dark:text-gray-300">
        Repo: {submission.repoUrl}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Score: {submission.score ?? "Not graded yet"}
      </p>
      <div className="mt-2 text-sm font-semibold text-green-600 dark:text-green-400">
        {children}
      </div>
    </div>
  );
};

export default SubmissionBadge;
