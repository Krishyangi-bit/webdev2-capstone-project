import { useEffect, useState } from 'react';
import '../styles/StatCard.css';

const StatCard = ({ label, value, icon, color, suffix }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    let current = 0;
    const step = Math.max(1, Math.round(target / 20));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setDisplayValue(current);
    }, 25);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="stat-card" style={{ borderColor: color }}>
      <div className="stat-card-icon">{icon}</div>
      <div>
        <div className="stat-card-value">{displayValue}{suffix}</div>
        <div className="stat-card-label">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
