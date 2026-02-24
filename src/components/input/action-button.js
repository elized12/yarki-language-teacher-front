import './action-button.css';

export default function ActionButton({
    onClick,
    disabled = false,
    variant = 'primary',
    children
}) {
    const getIcon = () => {
        if (variant === 'success') return 'fa-check';
        if (variant === 'secondary') return 'fa-arrow-right';
        return 'fa-check';
    };

    return (
        <button
            className={`action-btn ${variant}`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="btn-text">{children}</span>
            <i className={`fas ${getIcon()}`}></i>
        </button>
    );
}