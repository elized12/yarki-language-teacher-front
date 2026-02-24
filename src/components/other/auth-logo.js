import './auth-logo.css';

export default function AuthLogo({...props}) {
    return (
        <div className="auth-logo" {...props}>
            <div className="auth-logo-icon">
                <i className="fas fa-book-open"></i>
            </div>
            <div className="auth-logo-text">
                Yarki<span>Language</span>
            </div>
        </div>
    );
}