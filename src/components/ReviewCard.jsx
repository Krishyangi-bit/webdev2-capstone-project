import '../styles/ReviewCard.css';

const ReviewCard = ({ title, items, color, icon }) => {
  return (
    <div className="review-card">
      <div className="review-card-header" style={{ borderColor: color }}>
        <span className="review-card-icon">{icon}</span>
        <div>
          <h3>{title}</h3>
          <p>{items.length} item{items.length === 1 ? '' : 's'}</p>
        </div>
      </div>
      <div className="review-card-body">
        {items.length === 0 ? (
          <div className="review-card-empty">No items found</div>
        ) : (
          items.map((item, index) => (
            <span key={`${title}-${index}`} className="review-chip" style={{ borderColor: color, color: color }}>
              {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
