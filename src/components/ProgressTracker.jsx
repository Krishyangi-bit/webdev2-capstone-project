import { useState, useEffect } from 'react';

const ProgressTracker = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('reviews');
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  const total = reviews.length;
  const average = total ? (reviews.reduce((sum, r) => sum + r.score, 0) / total).toFixed(1) : 0;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Progress Tracker</h2>
      <p>Total Reviews: {total}</p>
      <p>Average Score: {average}</p>
      <ul>
        {reviews.map((r, i) => <li key={i}>Review {i+1}: {r.score}/10</li>)}
      </ul>
    </div>
  );
};

export default ProgressTracker;