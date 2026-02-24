import "./success-message.css";

import { useEffect } from "react";

export default function SuccessMessage({ message, onClose }) {
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            onClose?.();
        }, 2000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className={"success-message" + (message !== "" ? " show" : "")}>
            <span className="success-text">{message}</span>
        </div>
    );
}