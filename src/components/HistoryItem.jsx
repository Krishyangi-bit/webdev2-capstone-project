import { useState } from 'react';
import ScoreBadge from './ScoreBadge.jsx';
import ReviewCard from './ReviewCard.jsx';
import '../styles/History.css';

const HistoryItem = ({ review, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="history-item">
      <div className="history-summary">
        <ScoreBadge score={review.score} size="md" />
        <div className="history-meta">
          <span className="history-language">{review.language}</span>
          <span className="history-date">{review.date}</span>
          <span className="history-highlight">{review.issues[0] || 'No issues found 🎉'}</span>
        </div>
        <div className="history-actions">
          <button className="history-expand" onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? 'Hide Details ▲' : 'Details ▼'}
          </button>
          <button className="history-delete" onClick={() => onDelete(review.id)}>
            Delete
          </button>
        </div>
      </div>
      <div className={`history-details ${expanded ? 'expanded' : ''}`}>
        <div className="history-detail-grid">
          <ReviewCard title="Praise" items={review.praise} color="var(--success)" icon="✅" />
          <ReviewCard title="Warnings" items={review.warnings} color="var(--warning)" icon="⚠️" />
          <ReviewCard title="Issues" items={review.issues} color="var(--danger)" icon="❌" />
        </div>
        <div className="history-code-preview">
          <div className="preview-label">Code preview</div>
          <pre>{review.code.split('\n').slice(0, 10).join('\n')}</pre>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
