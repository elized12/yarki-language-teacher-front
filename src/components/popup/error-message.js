import './error-message.css';

import { useEffect } from 'react';

export default function ErrorMessage({ message, onClose }) {
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            onClose?.();
        }, 4000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="error-message">
            <span className="error-icon">⚠</span>
            <span className="error-text">{message}</span>
            <button className="error-close" onClick={onClose}>×</button>
        </div>
    );
}