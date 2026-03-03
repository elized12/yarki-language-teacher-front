import './word-detail-page.css';

import { useLocation } from 'react-router';
import PageHeaderBlock from '../components/block/page-header-block';
import TranslateListBlock from '../components/block/translate-list-block';
import { useEffect, useState } from 'react';
import TranslateService from '../service/TranslateService';
import ErrorMessage from '../components/popup/error-message';
import SkeletonLoader from '../components/loader/skeleton-loader';
import LanguageService from '../service/LanguageService';

export default function WordDetailPage() {
    const languages = LanguageService.getLanguages();

    const location = useLocation();
    const regex = /^\/word\/(?<wordId>\d+)$/;
    const match = location.pathname.match(regex);
    const wordId = match?.groups?.wordId;

    const [translates, setTranslates] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFind, setIsFind] = useState(true);

    const fetchTranslates = async () => {
        try {
            setIsLoading(true);

            const delayPromise = new Promise(resolve => setTimeout(resolve, 1000));
            const translatesPromise = TranslateService.getTranslates(wordId);
            const data = await Promise.all([translatesPromise, delayPromise]);

            setTranslates(data[0].data.words.map(word => {
                const code = word.code.toLowerCase();
                const language = languages.find((lang) => {
                    return lang.code == code;
                });

                word.flag = language.flag;

                return word;
            }));
        }
        catch (ex) {
            const error = ex.toJSON?.() || ex;
            if (error.status >= 500) {
                setErrorMessage("Ошибка сервера");
                return;
            }
            else if (400 <= error.status && error.status < 500) {
                setIsFind(false);
                setErrorMessage(ex?.response?.data?.message);
                return;
            }

            setErrorMessage("Неизвестная ошибка");
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTranslates();
    }, []);

    const handleDelete = async (secondWordId) => {
        try {
            await TranslateService.removeTranslate(wordId, secondWordId);
            setTranslates(translates.filter((translate) => translate.id != secondWordId));
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

    if (!wordId || !isFind) {
        return (
            <div className="container">
                <PageHeaderBlock
                    redirectTo="/dictionary"
                    showBackButton={true}
                />

                <div className="word-detail-main-card">
                    <div className="word-detail-icon">
                        <i className="fas fa-language"></i>
                    </div>
                    <h2 className="word-detail-title">Не найдено</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <PageHeaderBlock
                redirectTo="/dictionary"
                showBackButton={true}
            />

            <ErrorMessage message={errorMessage} onClose={() => { setErrorMessage(""); }} />

            <div className="word-detail-translations-header">
                <h3>Переводы</h3>
            </div>


            {isLoading
                ? <SkeletonLoader />
                : <TranslateListBlock translations={translates} onDelete={handleDelete} />
            }
        </div>
    );
}