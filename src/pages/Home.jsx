import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const featureCards = [
  {
    title: 'Instant Code Review',
    icon: '⚡',
    description: 'Paste any code and get a structured breakdown of issues, warnings, and good practices in seconds.',
  },
  {
    title: 'Score Tracking',
    icon: '📈',
    description: 'Every review is scored out of 100. Watch your personal score chart climb as you improve your habits.',
  },
  {
    title: 'Full History Log',
    icon: '📋',
    description: 'Every review is saved locally. Go back, compare, and see exactly how far you\'ve come.',
  },
];

const steps = [
  {
    label: '01',
    title: 'Paste Your Code',
    description: 'Copy any snippet, function, or file into the editor and select your language.',
  },
  {
    label: '02',
    title: 'Get Reviewed',
    description: 'The engine checks for common issues instantly and assigns a score.',
  },
  {
    label: '03',
    title: 'Track Progress',
    description: 'Your score is saved and plotted over time so you can improve every session.',
  },
];

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Cognita — Code Review Tracker';
  }, []);

  return (
    <section className="home-page page-enter">
      <div className="home-hero">
        <div className="home-hero-copy">
          <span className="eyebrow">YOUR PERSONAL CODING REPORT CARD</span>
          <h1>
            Review. Track.<br />
            <span className="accent-text">Improve.</span>
          </h1>
          <p className="home-copy">
            Paste your code. Get instant structured feedback. Watch your score climb week after week.
          </p>
          <div className="home-hero-buttons">
            <button className="button-primary" onClick={() => navigate('/review')}>
              Start Reviewing →
            </button>
            <button className="button-secondary" onClick={() => navigate('/dashboard')}>
              View Dashboard
            </button>
          </div>
        </div>
        <div className="home-hero-card">
          <div className="code-card">
            <div className="code-card-header">
              <span className="dot green" />
              <span className="dot yellow" />
              <span className="dot red" />
            </div>
            <pre>
              <code>
                <span className="code-keyword">function</span> greet(name) {'{'}
                {'\n'}  <span className="code-keyword">const</span> x = <span className="code-string">"Hello "</span> + name
                {'\n'}  console.log(x)
                {'\n'}  <span className="code-keyword">if</span> (x == null) <span className="code-keyword">return</span>
                {'\n'}{'}'}
              </code>
            </pre>
            <div className="score-pill">Score: 42</div>
          </div>
        </div>
      </div>

      <section className="stats-bar">
        <div className="stat-block">
          <div className="stat-value">2,400+</div>
          <div className="stat-label">Reviews</div>
        </div>
        <div className="stat-block">
          <div className="stat-value">87</div>
          <div className="stat-label">Avg Score</div>
        </div>
        <div className="stat-block">
          <div className="stat-value">12</div>
          <div className="stat-label">Languages</div>
        </div>
        <div className="stat-block">
          <div className="stat-value">100%</div>
          <div className="stat-label">Free</div>
        </div>
      </section>

      <section className="feature-grid">
        <h2>Everything you need to level up</h2>
        <div className="feature-cards">
          {featureCards.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="process-section">
        <h2>How it works</h2>
        <div className="process-grid">
          {steps.map((step) => (
            <div key={step.label} className="process-card">
              <div className="process-number">{step.label}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <h2>Ready to meet your code's report card?</h2>
          <p>Start a review session and turn every code snippet into a learning opportunity.</p>
        </div>
        <button className="button-primary" onClick={() => navigate('/review')}>
          Review My Code Now →
        </button>
      </section>
    </section>
  );
};

export default Home;
