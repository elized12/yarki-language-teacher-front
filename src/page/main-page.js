import "./main-page.css";

import Logo from "../components/other/logo";
import GreetingBlock from "../components/block/greeting-block";
import WordCounterBlock from "../components/block/word-counter-block";
import MainMenu from "../components/block/main-menu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/AuthProvider";
import { useNavigate } from "react-router";

export default function MainPage() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuth) {
            return navigate("/login");
        }
    }, [auth.isAuth, navigate]);

    const [activeLang, setActiveLang] = useState("ru");
    const languages = [
        { id: 1, code: "ru", label: "Русский", flag: "🇷🇺" },
        { id: 2, code: "en", label: "English", flag: "🇬🇧" },
    ];


    return (
        <div className="container">
            <Logo />
            <GreetingBlock name={"Крутяшка"} />

            <div className="lang-pair">
                {languages.map((lang) => {
                    return (
                        <span
                            key={lang.id}
                            className={`lang-btn ${activeLang === lang.code ? "active" : ""}`}
                            onClick={() => setActiveLang(lang.code)}
                        > {lang.flag} {lang.label}</span>);
                })}
            </div>

            <WordCounterBlock count={10} languageCode={"RU"} />
            <MainMenu />
        </div>
    );
}