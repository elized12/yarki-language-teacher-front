import './main-loader.css';

export default function MainLoader() {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-logo">
                    <div className="loading-logo-icon">
                        <i className="fas fa-book-open"></i>
                    </div>
                    <div className="loading-logo-text">
                        Yarki<span>Language</span>
                    </div>
                </div>

                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            </div>
        </div>
    );
}