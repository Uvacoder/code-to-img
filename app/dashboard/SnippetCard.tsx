import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const SnippetCard = () => {
  return (
    <Link
      href="/"
      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border-gray-100 dark:border-gray-700 border hover:border-gray-200 dark:hover:border-gray-600 min-h-[120px]"
    >
      <h3 className="text-gray-900 dark:text-gray-50 text-lg font-medium mb-1">
        ColorScheme React Context
      </h3>
      <p>{formatDistanceToNow(new Date())}</p>
    </Link>
  );
};

export default SnippetCard;
