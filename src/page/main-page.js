import "./main-page.css";

import Logo from "../components/other/logo";
import GreetingBlock from "../components/block/greeting-block";
import WordCounterBlock from "../components/block/word-counter-block";
import MainMenu from "../components/block/main-menu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/AuthProvider";
import LanguageService from "../service/LanguageService";
import WordService from "../service/WordService";
import ErrorMessage from "../components/popup/error-message";

export default function MainPage() {
    const auth = useContext(AuthContext);

    const [activeLang, setActiveLang] = useState("ru");
    const languages = LanguageService.getLanguages();

    const [countWord, setCountWord] = useState(0);

    const [errorMessagePopup, setErrorMessagePopup] = useState("");

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await WordService.getCount(activeLang);
                setCountWord(response.data.count);
            } catch (ex) {
                const error = ex.toJSON();
                if (500 <= error.status) {
                    setErrorMessagePopup("Ошибка сервера: Не удалось получить количество слов");
                    return;
                }
                else if (400 <= error.status < 500) {
                    setErrorMessagePopup(ex?.response?.data?.message);
                    return;
                }

                setErrorMessagePopup("Неизвестная ошибка: не удалось получить кол-во слов");
            }
        };
        fetchCount();
    }, [activeLang]);

    return (
        <div className="container">
            <Logo />
            <GreetingBlock name={auth.user?.nickname ?? ""} />

            <div className="lang-pair">
                {languages.map((lang) => {
                    return (
                        <span
                            key={lang.id}
                            className={`lang-btn ${activeLang === lang.code ? "active" : ""}`}
                            onClick={() => setActiveLang(lang.code)}
                        > {lang.flag} {lang.name}</span>);
                })}
            </div>

            <WordCounterBlock count={countWord} languageCode={activeLang.toUpperCase()} />
            <MainMenu />
            <ErrorMessage message={errorMessagePopup} onClose={() => (setErrorMessagePopup(""))} />
        </div>
    );
}