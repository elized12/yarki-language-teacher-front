import './language-selector.css';
import { useState } from 'react';

export default function LanguageSelector({ title, languages, activeLang, onSelect, error }) {
    const [selectedLang, setSelectedLang] = useState(activeLang);

    const handleSelect = (lang) => {
        setSelectedLang(lang);
        onSelect?.(lang);
    };

    return (
        <div className="form-section">
            <label className="form-label">{title}</label>
            <div className="language-grid">
                {languages.map(lang => (
                    <button
                        key={lang.code}
                        type="button"
                        className={`lang-option ${selectedLang === lang.code ? 'active' : ''}`}
                        onClick={() => handleSelect(lang.code)}
                    >
                        <span className="lang-flag">{lang.flag}</span>
                        <span className="lang-name">{lang.name}</span>
                    </button>
                ))}
            </div>
            {error && <span className="error-text">{error}</span>}
        </div>
    );
}