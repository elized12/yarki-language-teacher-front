import './translate-page.css';

import { useEffect, useState } from 'react';
import LanguageService from '../service/LanguageService';
import LanguageSelector from '../components/input/language-selector';
import TranslateInput from '../components/input/translate-input';
import PageHeaderBlock from '../components/block/page-header-block';
import TranslateService from '../service/TranslateService';
import SuccessMessage from '../components/popup/success-message';
import ErrorMessage from '../components/popup/error-message';

export default function TranslatePage() {
    const languages = LanguageService.getLanguages();

    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [selectedLangWord, setSelectedLangWord] = useState('en');
    const [selectedLangTranslation, setSelectedLangTranslation] = useState('ru');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrors({ ...errors, lang: "" });
    }, [selectedLangWord, selectedLangTranslation]);

    useEffect(() => {
        setErrors({ ...errors, word: "" });
    }, [word]);

    useEffect(() => {
        setErrors({ ...errors, translation: "" });
    }, [translation]);

    const onSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};
        if (!word) {
            newErrors.word = 'Введите слово';
        }

        if (!translation) {
            newErrors.translation = 'Введите перевод';
        }

        if (selectedLangWord === selectedLangTranslation) {
            newErrors.lang = 'Выберите разные языки';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length !== 0) {
            return;
        }

        try {
            const response = await TranslateService.addTranslate(word, translation, selectedLangWord, selectedLangTranslation);

            setWord('');
            setTranslation('');
            setSuccessMessage(response.data.message);
        }
        catch (ex) {
            const error = ex.toJSON();
            if (500 <= error.status) {
                setErrorMessage("Ошибка сервера");
                return;
            }
            else if (400 <= error.status < 500) {
                setErrorMessage(ex?.response?.data?.message);
                return;
            }

            setErrorMessage("Неизвестная ошибка");
        }
    };

    return (
        <div className="container">
            <PageHeaderBlock title="Добавить перевод" redirectTo={"/"} />
            <form className="translation-form" onSubmit={onSubmit}>
                <LanguageSelector
                    languages={languages}
                    activeLang={selectedLangWord}
                    onSelect={(lang) => setSelectedLangWord(lang)}
                    error={errors.lang}
                />
                <TranslateInput
                    placeholder="Example: butterfly"
                    title="Слово"
                    word={word}
                    onChange={(e) => setWord(e.target.value)}
                    error={errors.word}
                    icon="fa-language"
                />
                <LanguageSelector
                    languages={languages}
                    activeLang={selectedLangTranslation}
                    onSelect={(lang) => setSelectedLangTranslation(lang)}
                    error={errors.lang}
                />

                <TranslateInput
                    placeholder="Например: бабочка"
                    title="Перевод"
                    word={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                    error={errors.translation}
                    icon="fa-exchange-alt"
                />

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        <i className="fas fa-save"></i>
                        Сохранить
                    </button>
                </div>

                <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />
                <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />
            </form>
        </div>
    );
}