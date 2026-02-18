import "./auth-footer-block.css";

import { Link } from "react-router";

export default function AuthFooterBlock({ }) {
    return (
        <div className="auth-footer">
            Нет аккаунта?
            <Link to="/register">Зарегистрироваться</Link>
        </div>
    );
}