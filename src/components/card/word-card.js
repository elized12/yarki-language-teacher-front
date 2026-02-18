// WordCard.jsx
import "./word-card.css";

export default function WordCard({ word, onClick }) {
    const colors = [
        'linear-gradient(135deg, #2563eb, #7c3aed)',
        'linear-gradient(135deg, #10b981, #059669)',
        'linear-gradient(135deg, #f59e0b, #d97706)',
        'linear-gradient(135deg, #ef4444, #dc2626)',
        'linear-gradient(135deg, #8b5cf6, #6d28d9)',
        'linear-gradient(135deg, #ec4899, #be185d)',
    ];

    const colorIndex = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    const cardColor = colors[colorIndex];

    const firstLetter = word.charAt(0).toUpperCase();

    return (
        <div className="word-card" onClick={onClick}>
            <div className="word-card-content">
                <div className="word-icon" style={{ background: cardColor }}>
                    <span>{firstLetter}</span>
                </div>
                <h3 className="word-title">{word}</h3>
            </div>
            <div className="word-card-arrow">
                <i className="fas fa-chevron-right"></i>
            </div>
        </div>
    );
}