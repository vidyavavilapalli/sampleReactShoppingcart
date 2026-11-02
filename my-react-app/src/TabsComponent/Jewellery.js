import './Jewellery.css';

const reviews = [
  {
    item: 'Golden Glow Ring',
    reviewer: 'Ananya',
    feedback: 'The finish is beautiful. I honestly did not expect this quality!',
    rating: 5,
    design: 'ring',
  },
  {
    item: 'Rose Pendant',
    reviewer: 'Maya',
    feedback: 'Such a lovely piece. It looks elegant and feels really well made.',
    rating: 5,
    design: 'pendant',
  },
  {
    item: 'Starlight Earrings',
    reviewer: 'Priya',
    feedback: 'They sparkle so nicely and are comfortable enough to wear all day.',
    rating: 5,
    design: 'earrings',
  },
  {
    item: 'Classic Gold Bracelet',
    reviewer: 'Nisha',
    feedback: 'Beautiful quality for the price. I have already received compliments!',
    rating: 5,
    design: 'bracelet',
  },
];

function JewelleryIllustration({ design, label }) {
  return (
    <svg
      className="jewellery-illustration"
      viewBox="0 0 280 160"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={`gold-${design}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f8e29a" />
          <stop offset="48%" stopColor="#c28a2c" />
          <stop offset="100%" stopColor="#f2d879" />
        </linearGradient>
        <linearGradient id={`gem-${design}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff4fa" />
          <stop offset="100%" stopColor="#d883a4" />
        </linearGradient>
      </defs>
      {design === 'ring' && (
        <>
          <ellipse cx="140" cy="104" rx="50" ry="25" fill="none" stroke={`url(#gold-${design})`} strokeWidth="10" />
          <path d="M140 47 157 66 140 84 123 66Z" fill={`url(#gem-${design})`} stroke="#b77c36" strokeWidth="3" />
          <path d="m140 47 0 37m-17-18h34" stroke="#fff" strokeWidth="2" opacity=".8" />
        </>
      )}
      {design === 'pendant' && (
        <>
          <path d="M88 25c6 56 24 83 52 83s46-27 52-83" fill="none" stroke={`url(#gold-${design})`} strokeWidth="5" />
          <path d="m140 91 19 20-19 27-19-27Z" fill={`url(#gem-${design})`} stroke="#b77c36" strokeWidth="3" />
          <path d="m140 91 0 47m-19-27h38" stroke="#fff" strokeWidth="2" opacity=".8" />
        </>
      )}
      {design === 'earrings' && (
        <>
          {[100, 180].map((x) => (
            <g key={x}>
              <circle cx={x} cy="43" r="7" fill="none" stroke={`url(#gold-${design})`} strokeWidth="4" />
              <path d={`M${x} 51v22`} stroke={`url(#gold-${design})`} strokeWidth="4" />
              <path d={`m${x} 70 15 18-15 26-15-26Z`} fill={`url(#gem-${design})`} stroke="#b77c36" strokeWidth="3" />
              <path d={`m${x} 70 0 44m-15-26h30`} stroke="#fff" strokeWidth="2" opacity=".8" />
            </g>
          ))}
        </>
      )}
      {design === 'bracelet' && (
        <>
          <ellipse cx="140" cy="83" rx="73" ry="39" fill="none" stroke={`url(#gold-${design})`} strokeWidth="8" />
          {[80, 110, 140, 170, 200].map((x) => (
            <path key={x} d={`m${x} 43 7 9-7 9-7-9Z`} fill={`url(#gem-${design})`} stroke="#b77c36" strokeWidth="2" />
          ))}
        </>
      )}
    </svg>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="jewellery-review-card">
      <div className="jewellery-image">
        <JewelleryIllustration design={review.design} label={review.item} />
      </div>
      <div className="jewellery-review-content">
        <h3>{review.item}</h3>
        <div className="jewellery-rating" aria-label={`${review.rating} out of 5 stars`}>
          {'★'.repeat(review.rating)}
        </div>
        <p>“{review.feedback}”</p>
        <span className="jewellery-reviewer">— {review.reviewer}</span>
      </div>
    </article>
  );
}

export default function Jewellery() {
  return (
    <section className="jewellery-section" aria-label="Jewellery customer reviews">
      <h2 className="jewellery-heading">Jewellery loved by our customers</h2>
      <div className="jewellery-marquee">
        <div className="jewellery-track">
          {[0, 1].map((copy) => (
            <div className="jewellery-review-group" key={copy} aria-hidden={copy === 1}>
              {reviews.map((review) => (
                <ReviewCard key={`${copy}-${review.design}`} review={review} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
