import './error-message.css';

import { useEffect } from 'react';

export default function ErrorMessage({ message, onClose }) {
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            onClose?.();
        }, 2000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className={"error-message" + (message !== "" ? " show" : "")}>
            <span className="error-text">{message}</span>
        </div>
    );
}