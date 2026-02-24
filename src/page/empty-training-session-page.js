import './empty-training-session-page.css';

import { useNavigate } from 'react-router';
import ActionButton from '../components/input/action-button';

export default function EmptyTrainingSessionPage({ message = "В этой тренировке пока нет слов" }) {
    const navigate = useNavigate();

    return (
        <div className="container">
                    <div className="empty-session-icon">📚</div>
                    <h2>{message}</h2>
                    <p className="empty-session-description">
                        Добавьте слова в словарь или выберите другую тренировку,
                        в которой есть слова для изучения
                    </p>

                    <div className="empty-session-actions">
                        <ActionButton
                            variant="primary"
                            onClick={() => navigate('/translate')}
                        >
                            Перейти к словарю
                        </ActionButton>

                        <ActionButton
                            variant="secondary"
                            onClick={() => navigate('/train/settings')}
                        >
                            Выбрать тренировку
                        </ActionButton>
                    </div>
        </div>
    );
}