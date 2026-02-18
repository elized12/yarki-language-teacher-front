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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessagePopup, setErrorMessagePopup] = useState("");

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (!auth.isAuth) {
            navigate("/");
        }
    }, [auth.isAuth, navigate]);


    const onClickLoginButton = async () => {
        try {
            await auth.login(email, password);
            navigate("/");
        }
        catch (ex) {
            setErrorMessagePopup(ex.response?.data?.message);
        }
    }

    return (
        <div className="container">
            <AuthLogo />
            <AuthHeaderBlock />
            <form>
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
    );
}