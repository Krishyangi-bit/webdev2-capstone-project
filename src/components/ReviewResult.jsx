const ReviewResult = ({ result }) => {
  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">Review Result</h2>
      <p>Score: {result.score}/10</p>
      <h3>Strengths:</h3>
      <ul>
        {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
      <h3>Suggestions:</h3>
      <ul>
        {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
};

export default ReviewResult;