import './result-message.css';

export default function ResultMessage({ isCorrect, userAnswer }) {
    if (isCorrect === null) return null;

    return (
        <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="result-icon">
                <i className={`fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
            </div>
            <div className="result-text">
                <h3>{isCorrect ? 'Правильно!' : 'Неправильно'}</h3>
                {userAnswer && (
                    <p className="user-answer">
                        Ваш ответ: <span>{userAnswer}</span>
                    </p>
                )}
            </div>
        </div>
    );
}