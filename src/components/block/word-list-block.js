import "./word-list-block.css";

import WordCard from "../card/word-card";

export default function WordList({ words, searchQuery }) {
    return (
        <div className="words-list">
            {words.length > 0 ? (
                words.map(word => (
                    <WordCard key={word.id} word={word.word} />
                ))
            ) : (
                <div className="empty-state">
                    <i className="fas fa-book-open empty-icon"></i>
                    {searchQuery ? (
                        <>
                            <h3>Ничего не найдено</h3>
                            <p>По запросу "{searchQuery}" ничего нет</p>
                        </>
                    ) : (
                        <>
                            <h3>Словарь пуст</h3>
                            <p>В этом языке пока нет слов</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}