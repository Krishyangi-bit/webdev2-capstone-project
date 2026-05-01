import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeCode } from '../utils/reviewEngine.js';
import { saveReview } from '../utils/storage.js';
import ReviewCard from '../components/ReviewCard.jsx';
import '../styles/Review.css';

const languages = ['JavaScript', 'Python', 'HTML', 'CSS', 'React JSX'];

const Review = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Review Code — Cognita';
    textareaRef.current?.focus();
  }, []);

  const charCount = code.length;
  const lineCount = code.split('\n').length;

  const scoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const handleReview = () => {
    if (!code.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const review = analyzeCode(code, language);
      const stored = {
        id: Date.now().toString(),
        date: review.reviewedAt,
        timestamp: Date.now(),
        language,
        code: code.trim().slice(0, 500),
        score: review.score,
        praise: review.praise,
        warnings: review.warnings,
        issues: review.issues,
      };
      setResult(stored);
      saveReview(stored);
      setLoading(false);
      setToast({ visible: true, message: '✅ Review saved successfully!' });
      setTimeout(() => setToast({ visible: false, message: '' }), 2500);
    }, 800);
  };

  const handleClear = () => {
    setCode('');
    setResult(null);
  };

  const praise = result?.praise || [];
  const warnings = result?.warnings || [];
  const issues = result?.issues || [];

  return (
    <section className="review-page page-enter">
      {toast.visible && <div className="toast">{toast.message}</div>}

      <div className="review-grid">
        <div className="review-panel">
          <div className="review-panel-header">
            <div>
              <p className="eyebrow">Code Input</p>
              <h2>Paste your code and choose a language.</h2>
            </div>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`// Paste your code here...\n// Supports JavaScript, Python, HTML, CSS`}
          />
          <div className="review-footer">
            <span>{charCount} characters | {lineCount} lines</span>
            <div className="review-buttons">
              <button className="button-secondary" onClick={handleClear} type="button">
                Clear & Reset
              </button>
              <button className="button-primary" onClick={handleReview} disabled={!code.trim() || loading} type="button">
                {loading ? 'Analysing...' : 'Review My Code →'}
              </button>
            </div>
          </div>
        </div>

        <div className="review-output">
          {result ? (
            <div className="review-result-card slide-in-right">
              <div className={`score-header score-${scoreColor(result.score)}`}>
                <div className={`score-ring score-ring-${scoreColor(result.score)}`}>
                  <span className="score-number">{result.score}</span>
                  <span className="score-sub">/ 100</span>
                </div>
                <div>
                  <p className="result-meta">Language: {result.language}</p>
                  <p className="result-meta">Reviewed: {result.date}</p>
                </div>
              </div>

              <div className="review-cards-row">
                <ReviewCard title="Praise" items={praise} color="var(--success)" icon="✅" />
                <ReviewCard title="Warnings" items={warnings} color="var(--warning)" icon="⚠️" />
                <ReviewCard title="Issues" items={issues} color="var(--danger)" icon="❌" />
              </div>
            </div>
          ) : (
            <div className="review-placeholder">
              <div className="placeholder-icon">{`{ }`}</div>
              <h3>Your review will appear here</h3>
              <p>Paste your code and click Review to get instant feedback.</p>
            </div>
          )}
          <button className="button-secondary margin-top" onClick={() => navigate('/history')}>
            View Review History
          </button>
        </div>
      </div>
    </section>
  );
};

export default Review;
