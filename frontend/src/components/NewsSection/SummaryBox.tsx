interface SummaryBoxProps {
  /** The summary text to display */
  summaryText: string;
  /** Whether the summary is currently loading */
  loading: boolean;
}

/**
 * SummaryBox component displays a summary of filtered news items
 * Shows a loading spinner when loading is true, otherwise displays the summary text
 */
export const SummaryBox = ({ summaryText, loading }) => {
  if (loading) {
    return (
      <div
        className="bg-white p-4 mt-4 rounded-lg shadow-sm border border-gray-200"
        role="status"
        aria-label="Generating summary"
      >
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Generating summary...</span>
        </div>
      </div>
    );
  }

  if (!summaryText) {
    return null;
  }

  return (
    <div className="bg-white p-4 mt-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">News Summary</h3>
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700 whitespace-pre-line">{summaryText}</p>
      </div>
    </div>
  );
};
