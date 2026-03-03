import "./translate-list-block.css";

import TranslateCard from "../card/translate-card"

export default function TranslateListBlock({ translations, onDelete }) {
    return (
        <div className="word-detail-translations-list">
            {translations && translations.length > 0 ? (
                translations.map((translation) => (
                    <TranslateCard key={translation.id} translation={translation} onClickDelete={onDelete}/>
                ))
            ) : (
                <div className="word-detail-empty-translations">
                    <i className="fas fa-exchange-alt word-detail-empty-icon"></i>
                    <p>У этого слова пока нет переводов</p>
                </div>
            )}
        </div>
    );
}