import './train-settings-page.css';

import PageHeaderBlock from "../components/block/page-header-block";
import LanguageSelector from "../components/input/language-selector";
import LanguageService from "../service/LanguageService";
import { useEffect, useState } from "react";
import ActionButton from "../components/input/action-button";
import ErrorMessage from '../components/popup/error-message';
import { useNavigate } from 'react-router';
import TrainService from '../service/TrainService';

export default function TrainSettingsPage() {
    const navigate = useNavigate();

    const languages = LanguageService.getLanguages();

    const [selectSourceLang, setSelectSourceLang] = useState('ru');
    const [selectTargetLang, setSelectTargetLang] = useState('en');
    useEffect(() => {
        if (selectSourceLang !== selectTargetLang) {
            setErrors({ ...errors, lang: "" });
        }
    }, [selectSourceLang, selectTargetLang]);

    const [sessionId, setSessionId] = useState(null);
    const [errors, setErrors] = useState({});

    const onSubmit = async () => {
        try {
            if (selectSourceLang === selectTargetLang) {
                setErrors({ ...errors, lang: "Выберите разные языки" });
                return;
            }

            const response = await TrainService.startSession(selectSourceLang, selectTargetLang);

            setSessionId(response.data.sessionId);
            navigate("/train/" + response.data.sessionId);
        }
        catch (ex) {
            const error = ex.toJSON();
            if (500 <= error.status) {
                setErrors({ ...errors, session: "Ошибка сервера" });
                return;
            }
            else if (400 <= error.status < 500) {
                setErrors({ ...errors, session: ex?.response?.data?.message });
                return;
            }

            setErrors({ ...errors, session: "Неизвестная ошибка" });
        }
    };

    return (
        <div className="container">
            <div className="train-settings-content">
                <div className="train-settings-params">
                    <PageHeaderBlock title="Настройки тренировки" redirectTo={"/"} />
                    <div style={{ marginBottom: "20px" }}>
                        <LanguageSelector
                            title={"Язык 1"}
                            languages={languages}
                            activeLang={selectSourceLang}
                            onSelect={(lang) => setSelectSourceLang(lang)}
                            error={errors.lang}
                        />
                    </div>
                    <LanguageSelector
                        title={"Язык 2"}
                        languages={languages}
                        activeLang={selectTargetLang}
                        onSelect={(lang) => setSelectTargetLang(lang)}
                        error={errors.lang}
                    />
                    <ErrorMessage message={errors.session} onClose={() => setErrors({ ...errors, session: "" })} />
                </div>
                <ActionButton
                    variant="secondary"
                    onClick={onSubmit}
                >
                    Начать
                </ActionButton>
            </div>
        </div>
    );
};