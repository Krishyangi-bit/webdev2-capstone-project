import '../styles/LineChart.css';

const getPoint = (index, total, width, height, padding) => {
  const x = padding + (index * (width - padding * 2)) / Math.max(total - 1, 1);
  return x;
};

const LineChart = ({ data, width = 600, height = 260 }) => {
  if (!data || data.length < 2) {
    return (
      <div className="chart-empty">
        Review more code to see your chart!
      </div>
    );
  }

  const scores = data.map((item) => item.score);
  const maxScore = 100;
  const padding = 40;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;
  const points = data.map((item, index) => {
    const x = getPoint(index, data.length, width, height, padding);
    const y = padding + plotHeight - (item.score / maxScore) * plotHeight;
    return { ...item, x, y };
  });

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(' ');
  const fillPoints = `${padding},${height - padding} ${linePoints} ${plotWidth + padding},${height - padding}`;

  return (
    <div className="line-chart-wrapper">
      <svg viewBox={`0 0 ${width} ${height}`} className="line-chart-svg">
        <rect x="0" y="0" width="100%" height="100%" rx="20" ry="20" fill="var(--bg-card)" />
        {[0, 25, 50, 75, 100].map((value) => {
          const y = padding + plotHeight - (value / maxScore) * plotHeight;
          return (
            <g key={value}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="var(--border)" strokeDasharray="4 6" />
              <text x="12" y={y + 4} fill="var(--text-muted)" fontSize="10" fontFamily="JetBrains Mono">{value}</text>
            </g>
          );
        })}
        <polygon points={fillPoints} fill="var(--accent-glow)" />
        <polyline points={linePoints} fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.id || point.date}>
            <circle cx={point.x} cy={point.y} r="5" fill="var(--accent)" />
            <title>{`${point.date}: ${point.score}`}</title>
          </g>
        ))}
      </svg>
      <div className="line-chart-labels">
        {points.map((point) => (
          <span key={point.date}>{point.date}</span>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
