const CodeInput = ({ code, setCode, onReview, loading }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">Paste Your Code Here</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-64 p-4 border border-slate-700 rounded-xl bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your code..."
      />
      <button
        onClick={onReview}
        disabled={loading || !code.trim()}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-2xl border border-blue-400/30 shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.55)] disabled:opacity-50 disabled:shadow-none transition-all"
      >
        {loading ? 'Reviewing...' : 'Review Code'}
      </button>
    </div>
  );
};

export default CodeInput;