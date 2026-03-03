import "./translate-card.css";

export default function TranslateCard({ translation, onClickDelete, ...props }) {
    const colors = [
        'linear-gradient(135deg, #10b981, #059669)',
        'linear-gradient(135deg, #f59e0b, #d97706)',
        'linear-gradient(135deg, #8b5cf6, #6d28d9)',
        'linear-gradient(135deg, #ec4899, #be185d)',
        'linear-gradient(135deg, #06b6d4, #0891b2)',
        'linear-gradient(135deg, #14b8a6, #0d9488)',
    ];

    const colorIndex = translation.word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    const cardColor = colors[colorIndex];

    const firstLetter = translation.word.charAt(0).toUpperCase();

    const onDelete = () => {
        onClickDelete(translation.id);
    };

    return (
        <div className="translate-card" {...props}>
            <div className="translate-card-content">
                <div className="translate-icon" style={{ background: cardColor }}>
                    <span>{firstLetter}</span>
                </div>
                <div className="translate-info">
                    <span className="translate-text">{translation.word}</span>
                    <span className="translate-lang">
                        <i className="fas fa-globe"></i>
                        {translation.flag}
                    </span>
                </div>
            </div>
            <button
                className="translate-delete-btn"
                title="Удалить перевод"
                onClick={onDelete}
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
}