import './answer-input.css';

import { useState, useEffect, useRef } from 'react';

export default function AnswerInput({
    value,
    onChange,
    onSubmit,
    disabled = false,
    placeholder = "Введите перевод..."
}) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (!disabled) {
            inputRef.current?.focus();
        }
    }, [disabled]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !disabled && value.trim()) {
            onSubmit();
        }
    };

    return (
        <div className="answer-input-wrapper">
            <div className="input-container">
                <i className="fas fa-pencil-alt input-icon"></i>
                <input
                    ref={inputRef}
                    type="text"
                    className="answer-input"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}