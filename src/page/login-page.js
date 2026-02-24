import "./login-page.css";

import { useContext, useEffect, useState } from "react";
import AuthHeaderBlock from "../components/block/auth-header-block";
import InputField from "../components/input/input-field";
import AuthLogo from "../components/other/auth-logo";
import AuthButton from "../components/button/auth-button";
import AuthFooterBlock from "../components/block/auth-footer-block";
import { AuthContext } from "../store/AuthProvider";
import ErrorMessage from "../components/popup/error-message";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessagePopup, setErrorMessagePopup] = useState("");

    const onClickLoginButton = async () => {
        try {
            await auth.login(email, password);
            navigate("/");
        }
        catch (ex) {
            const error = ex.toJSON();

            if (500 <= error.status) {
                setErrorMessagePopup("Произошла ошибка на сервере. Попробуйте позже.");
                return;
            }
            else if (400 <= error.status < 500) {
                setErrorMessagePopup(ex.response?.data?.message);
                return;
            }

            setErrorMessagePopup("Неизвестная ошибка");
        }
    }

    return (
        <div className="container">
            <div className="content">
                <AuthLogo />
                <AuthHeaderBlock />
                <form className="login-form">
                    <InputField
                        title="email"
                        type="email"
                        placeholder={"test@mail.ru"}
                        value={email}
                        onChange={(event) => { setEmail(event.target.value); }}
                        icon="fa-envelope"
                        isRequired={true}
                    />
                    <InputField
                        title="password"
                        type="password"
                        placeholder={""}
                        value={password}
                        onChange={(event) => { setPassword(event.target.value); }}
                        icon="fa-lock"
                    />
                </form>
                <ErrorMessage message={errorMessagePopup} onClose={() => (setErrorMessagePopup(""))} />
                <AuthButton message={"Войти"} onClick={onClickLoginButton} />
                <AuthFooterBlock />
            </div>
        </div>
    );
}