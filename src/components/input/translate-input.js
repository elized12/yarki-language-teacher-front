import './translate-input.css';

export default function TranslateInput({ title, word, onChange, error, icon, ...props }) {
    return (
        <div className="form-section">
            <label className="form-label">
                {title} <span className="required">*</span>
            </label>
            <div className="input-wrapper">
                <i className={`fas ${icon || "fa-language"} input-icon`}></i>
                <input
                    type="text"
                    className={`form-input ${error ? 'error' : ''}`}
                    value={word}
                    onChange={onChange}
                    {...props}
                />
            </div>
            {error && <span className="error-text">{error}</span>}
        </div>
    );
}