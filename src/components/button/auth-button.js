import "./auth-button.css";

export default function AuthButton({ onClick, message, icon = "fa-arrow-right", ...props }) {
    return (
        <button type="submit" className="login-btn" onClick={onClick} {...props}>
            {message} <i className={"fas " + icon}></i>
        </button>
    );
}