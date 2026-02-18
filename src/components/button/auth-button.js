import "./auth-button.css";

export default function AuthButton({ onClick, message, icon = "fa-arrow-right" }) {
    return (
        <button type="submit" className="login-btn" onClick={onClick}>
            {message} <i className={"fas " + icon}></i>
        </button>
    );
}