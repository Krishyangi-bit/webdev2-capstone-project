import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllReviews } from '../utils/storage.js';
import StatCard from '../components/StatCard.jsx';
import LineChart from '../components/LineChart.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard — Cognita';
    setReviews(getAllReviews());
  }, []);

  const total = reviews.length;
  const average = total ? (reviews.reduce((sum, item) => sum + item.score, 0) / total).toFixed(1) : 0;
  const bestScore = total ? Math.max(...reviews.map((item) => item.score)) : 0;

  const currentStreak = useMemo(() => {
    if (!reviews.length) return 0;
    const ordered = [...reviews].sort((a, b) => b.timestamp - a.timestamp);
    let streak = 1;
    let prevDate = new Date(ordered[0].timestamp);
    for (let index = 1; index < ordered.length; index += 1) {
      const nextDate = new Date(ordered[index].timestamp);
      const diff = Math.round((prevDate - nextDate) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        streak += 1;
        prevDate = nextDate;
      } else if (diff === 0) {
        continue;
      } else {
        break;
      }
    }
    return streak;
  }, [reviews]);

  const recent = reviews.slice(0, 3);

  const issueFrequency = useMemo(() => {
    const counts = reviews.reduce((acc, review) => {
      review.issues.forEach((issue) => {
        acc[issue] = (acc[issue] || 0) + 1;
      });
      return acc;
    }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([issue, count]) => ({ issue, count }));
  }, [reviews]);

  const chartData = reviews.slice(0, 7).reverse().map((review) => ({ date: review.date, score: review.score }));

  return (
    <section className="dashboard-page page-enter">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Your Progress Dashboard</p>
          <h1>Track how your coding quality improves over time</h1>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        <StatCard label="Total Reviews" value={total} icon="📊" color="var(--accent)" />
        <StatCard label="Average Score" value={average} icon="⭐" color="var(--accent-secondary)" suffix="" />
        <StatCard label="Best Score" value={bestScore} icon="🏆" color="var(--success)" />
        <StatCard label="Current Streak" value={currentStreak} icon="🔥" color="var(--warning)" />
      </div>

      <div className="dashboard-section">
        <div className="dashboard-panel">
          <div className="panel-heading">
            <h2>Score progression</h2>
            <p>Recent reviews over the last seven sessions.</p>
          </div>
          <LineChart data={chartData} />
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <h2>Most common issues</h2>
            <p>Top problems discovered across your saved reviews.</p>
          </div>
          <div className="issue-list">
            {issueFrequency.length === 0 ? (
              <p className="empty-text">Add more reviews to populate issue trends.</p>
            ) : (
              issueFrequency.map((item) => {
                const width = Math.min(100, item.count * 18);
                return (
                  <div key={item.issue} className="issue-row">
                    <span>{item.issue}</span>
                    <div className="issue-bar-shell">
                      <div className="issue-bar-fill" style={{ width: `${width}%` }} />
                    </div>
                    <span>{item.count}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <section className="recent-activity">
        <div className="panel-heading">
          <h2>Recent activity</h2>
          <button className="button-secondary" type="button" onClick={() => navigate('/history')}>
            View All →
          </button>
        </div>
        <div className="activity-grid">
          {recent.map((review) => (
            <div key={review.id} className="activity-card">
              <div className="activity-card-top">
                <span className="activity-language">{review.language}</span>
                <ScoreBadge score={review.score} size="sm" />
              </div>
              <p className="activity-date">{review.date}</p>
              <p className="activity-issue">{review.issues[0] || 'No issues found 🎉'}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
