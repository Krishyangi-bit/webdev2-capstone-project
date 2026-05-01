const STORAGE_KEY = 'cognita_reviews';

const demoReviews = [
  {
    id: 'demo-1',
    date: 'Apr 27, 2026',
    timestamp: 1714185600000,
    language: 'JavaScript',
    code: 'const greet = (name) => {\n  return `Hello ${name}`\n};',
    score: 78,
    praise: ['Good job! Code includes comments for clarity.', 'Modern arrow function syntax detected.'],
    warnings: ['No comments found. Add comments to explain complex logic.'],
    issues: ['Avoid using \'var\'. Use \'let\' or \'const\' instead.'],
  },
  {
    id: 'demo-2',
    date: 'Apr 28, 2026',
    timestamp: 1714272000000,
    language: 'React JSX',
    code: 'function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}',
    score: 85,
    praise: ["Great use of const for immutable variables.", "Correct use of strict equality '==='. Keep it up!"],
    warnings: [],
    issues: [],
  },
  {
    id: 'demo-3',
    date: 'Apr 29, 2026',
    timestamp: 1714358400000,
    language: 'Python',
    code: 'def process(items):\n    for item in items:\n        if item is None:\n            continue\n        print(item)',
    score: 67,
    praise: ['Concise code! Short functions are easier to test.'],
    warnings: ['Deep nesting detected. Consider refactoring for readability.'],
    issues: ['No comments found. Add comments to explain complex logic.'],
  },
  {
    id: 'demo-4',
    date: 'Apr 30, 2026',
    timestamp: 1714444800000,
    language: 'CSS',
    code: '.card {\n  display: grid;\n  gap: 16px;\n  padding: 24px;\n}',
    score: 92,
    praise: ['Concise code! Short functions are easier to test.', 'Good job! Code includes comments for clarity.'],
    warnings: [],
    issues: [],
  },
];

export const getAllReviews = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoReviews));
    return demoReviews;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.sort((a, b) => b.timestamp - a.timestamp) : [];
  } catch {
    return [];
  }
};

export const saveReview = (review) => {
  const reviews = getAllReviews();
  reviews.unshift(review);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

export const deleteReview = (id) => {
  const reviews = getAllReviews().filter((review) => review.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  return reviews;
};

export const clearAllReviews = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
};
