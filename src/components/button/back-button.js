import './back-button.css';

export default function BackButton({...props}) {
    return (
        <button className="back-button" {...props}>
            <i className="fas fa-arrow-left"></i>
        </button>
    );
}