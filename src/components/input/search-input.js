
import "./search-input.css";

export default function SearchInput({ placeholder, onChange, onClick, value }) {
    return (
        <div className="search-wrapper">
            <i className="fas fa-search search-icon"></i>
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {value && (
                <button className="search-clear" onClick={onClick}>
                    <i className="fas fa-times"></i>
                </button>
            )}
        </div>
    );
}