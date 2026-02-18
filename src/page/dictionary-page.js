import './dictionary-page.css';

import { useState } from 'react';
import PageHeaderBlock from '../components/block/page-header-block';
import SearchInput from '../components/input/search-input';
import WordList from '../components/block/word-list-block';

const mockWords = {
    en: [
        { id: 1, word: 'butterfly', translation: 'бабочка', progress: 85 },
        { id: 2, word: 'experience', translation: 'опыт', progress: 45 },
        { id: 3, word: 'development', translation: 'развитие', progress: 20 },
        { id: 4, word: 'opportunity', translation: 'возможность', progress: 95 },
        { id: 5, word: 'beautiful', translation: 'красивый', progress: 60 },
        { id: 6, word: 'important', translation: 'важный', progress: 30 },
    ],
    ru: [
        { id: 7, word: 'бабочка' },
        { id: 8, word: 'опыт' },
        { id: 9, word: 'разработчик' },
    ],

};

export default function DictionaryPage() {
    const [selectedLang, setSelectedLang] = useState('en');
    const [searchQuery, setSearchQuery] = useState('');

    const languages = [
        { code: 'en', flag: '🇬🇧', name: 'Английский', count: mockWords.en.length },
        { code: 'ru', flag: '🇷🇺', name: 'Русский', count: mockWords.ru.length }
    ];

    const currentWords = mockWords[selectedLang] || [];

    const filteredWords = currentWords.filter(word =>
        word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <div className="dictionary-page">
                <PageHeaderBlock title="Мой словарь" redirectTo={"/"} description={currentWords.length + " слов"} />

                <div className="language-selector">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className={`lang-btn ${selectedLang === lang.code ? 'active' : ''}`}
                            onClick={() => setSelectedLang(lang.code)}
                        >
                            <span className="lang-flag">{lang.flag}</span>
                            <span className="lang-name">{lang.name}</span>
                            <span className="lang-count">{lang.count}</span>
                        </button>
                    ))}
                </div>


                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={() => setSearchQuery("")}
                    placeholder="Поиск слов..."
                />

                <WordList words={filteredWords} searchQuery={searchQuery} />
            </div>
        </div>
    );
}