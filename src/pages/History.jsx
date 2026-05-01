import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAllReviews, deleteReview, getAllReviews } from '../utils/storage.js';
import HistoryItem from '../components/HistoryItem.jsx';
import '../styles/History.css';

const languages = ['All Languages', 'JavaScript', 'Python', 'HTML', 'CSS', 'React JSX'];
const scoreFilters = ['All', 'High (≥80)', 'Medium (60-79)', 'Low (<60)'];
const sortOptions = ['Newest First', 'Oldest First', 'Highest Score', 'Lowest Score'];

const History = () => {
  const [reviews, setReviews] = useState([]);
  const [languageFilter, setLanguageFilter] = useState('All Languages');
  const [scoreFilter, setScoreFilter] = useState('All');
  const [sortOption, setSortOption] = useState('Newest First');
  const [modalOpen, setModalOpen] = useState(false);
  const [targetDelete, setTargetDelete] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'History — Cognita';
    setReviews(getAllReviews());
  }, []);

  const filteredReviews = useMemo(() => {
    let items = [...reviews];

    if (languageFilter !== 'All Languages') {
      items = items.filter((review) => review.language === languageFilter);
    }

    if (scoreFilter === 'High (≥80)') {
      items = items.filter((review) => review.score >= 80);
    } else if (scoreFilter === 'Medium (60-79)') {
      items = items.filter((review) => review.score >= 60 && review.score <= 79);
    } else if (scoreFilter === 'Low (<60)') {
      items = items.filter((review) => review.score < 60);
    }

    if (sortOption === 'Newest First') {
      items.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortOption === 'Oldest First') {
      items.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortOption === 'Highest Score') {
      items.sort((a, b) => b.score - a.score);
    } else {
      items.sort((a, b) => a.score - b.score);
    }

    return items;
  }, [reviews, languageFilter, scoreFilter, sortOption]);

  const handleDelete = (id) => {
    setModalOpen(true);
    setTargetDelete(id);
  };

  const confirmDelete = () => {
    const updated = deleteReview(targetDelete);
    setReviews(updated);
    setModalOpen(false);
    setToast({ visible: true, message: 'Deleted review successfully.' });
    setTimeout(() => setToast({ visible: false, message: '' }), 2200);
  };

  const handleClearAll = () => {
    setModalOpen(true);
    setTargetDelete('clear-all');
  };

  const confirmClear = () => {
    clearAllReviews();
    setReviews([]);
    setModalOpen(false);
    setToast({ visible: true, message: 'Cleared all reviews.' });
    setTimeout(() => setToast({ visible: false, message: '' }), 2200);
  };

  return (
    <section className="history-page page-enter">
      {toast.visible && <div className="toast">{toast.message}</div>}

      <div className="history-header">
        <div>
          <p className="eyebrow">Review History</p>
          <h1>Browse saved code reviews and compare your progress.</h1>
        </div>
        <button className="button-secondary" type="button" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      <div className="history-filters">
        <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
          {languages.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select value={scoreFilter} onChange={(e) => setScoreFilter(e.target.value)}>
          {scoreFilters.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          {sortOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="history-empty">
          <div className="empty-illustration">{`{ }`}</div>
          <h2>No reviews found</h2>
          <p>Search your saved reviews or start a new code review session.</p>
          <button className="button-primary" type="button" onClick={() => navigate('/review')}>
            Review Your First Code →
          </button>
        </div>
      ) : (
        <div className="history-list">
          {filteredReviews.map((review) => (
            <HistoryItem key={review.id} review={review} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-panel page-enter">
            <h2>{targetDelete === 'clear-all' ? 'Clear all reviews?' : 'Delete this review?'}</h2>
            <p>
              {targetDelete === 'clear-all'
                ? 'This will remove every saved review from your dashboard.'
                : 'This action cannot be undone.'}
            </p>
            <div className="modal-actions">
              <button className="button-secondary" type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="button-danger" type="button" onClick={targetDelete === 'clear-all' ? confirmClear : confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default History;
