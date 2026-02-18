import './word-counter-block.css';

const languageFlag = {
    'RU': '🇷🇺',
    'EN': '🇬🇧',
}

const WordCounterBlock = ({ count, languageCode }) => {
    return (
        <div className="stats-card">
            <div className="stats-left">
                <h3>Слов в словаре</h3>
                <div className="stats-number">{count}</div>
            </div>
            <div className="stats-flag">
                {languageFlag[languageCode]}
            </div>
        </div>
    );
}

export default WordCounterBlock;