import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  totalWords,
  setCurrentPage,
}) {
  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-600 kobita">
        Showing {Math.min(currentPage * 10, totalWords)} of {totalWords} words
      </p>
      <div className="flex space-x-2">
        <button
          className="px-3 py-1 border border-indigo-400 rounded hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed kobita"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5 text-indigo-600" />
        </button>
        <span className="px-4 py-2 text-indigo-500  kobita">
          {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 border border-indigo-400 rounded hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed kobita"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5 text-indigo-600" />
        </button>
      </div>
    </div>
  );
}
