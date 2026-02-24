import './dictionary-page.css';

import { useEffect, useState } from 'react';
import PageHeaderBlock from '../components/block/page-header-block';
import SearchInput from '../components/input/search-input';
import WordList from '../components/block/word-list-block';
import LanguageService from '../service/LanguageService';
import ErrorMessage from '../components/popup/error-message';
import WordService from '../service/WordService';
import SkeletonLoader from '../components/loader/skeleton-loader';

export default function DictionaryPage() {
    const [selectedLang, setSelectedLang] = useState('ru');
    const languages = LanguageService.getLanguages().map(lang => ({
        ...lang
    }));

    const [searchQuery, setSearchQuery] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [currentWords, setCurrentWords] = useState([]);
    useEffect(() => {
        const fetchWords = async () => {
            setIsLoading(true);

            const wordPromise = WordService.getWords(selectedLang, 5000, 0);

            await Promise.all([wordPromise, new Promise(resolve => setTimeout(resolve, 1000))])
                .then(([response]) => {
                    setCurrentWords(response.data.words);
                }).catch(ex => {
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
                }).finally(() => {
                    setIsLoading(false);
                });
        };

        fetchWords();
    }, [selectedLang]);

    const filteredWords = currentWords?.filter(word =>
        word.word.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const [countWords, setCountWords] = useState({ "en": 0, "ru": 0 });
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const fetchCount = async () => {
            try {
                for (const lang of languages) {
                    const response = await WordService.getCount(lang.code);
                    setCountWords(prev => ({ ...prev, [lang.code]: response.data.count }));
                }
            } catch (ex) {
                const error = ex.toJSON();
                if (500 <= error.status) {
                    setErrorMessage('Ошибка сервера');
                    return;
                }
                else if (400 <= error.status < 500) {
                    setErrorMessage(ex?.response?.data?.message);
                    return;
                }

                setErrorMessage('Неизвестная ошибка');
            }
        };

        fetchCount();
    }, []);

    return (
        <div className="container" id="dictionary-container">
            <div className="dictionary-page">
                <PageHeaderBlock title="Мой словарь" redirectTo={"/"} description={(currentWords?.length ?? 0) + " слов"} />

                <div className="language-selector">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className={`lang-btn ${selectedLang === lang.code ? 'active' : ''}`}
                            onClick={() => setSelectedLang(lang.code)}
                        >
                            <span className="lang-flag">{lang.flag}</span>
                            <span className="lang-name">{lang.name}</span>
                            <span className="lang-count">{countWords[lang.code] || 0}</span>
                        </button>
                    ))}
                </div>


                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={() => setSearchQuery("")}
                    placeholder="Поиск слов..."
                />

                <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />

                {isLoading
                    ? <SkeletonLoader />
                    : <WordList words={filteredWords ?? []} searchQuery={searchQuery.length > 10 ? searchQuery.slice(0, 10) + "..." : searchQuery} />}

            </div>
        </div>
    );
}