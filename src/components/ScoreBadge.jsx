import '../styles/ScoreBadge.css';

const ScoreBadge = ({ score, size = 'md' }) => {
  let variant = 'success';
  if (score < 60) variant = 'danger';
  else if (score < 80) variant = 'warning';

  return (
    <span className={`score-badge score-${variant} score-${size}`}>
      {score}
    </span>
  );
};

export default ScoreBadge;
