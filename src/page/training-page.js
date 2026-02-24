
import './training-page.css';

import { useLocation } from 'react-router';
import TrainingHeader from '../components/block/training-header';
import AnswerInput from '../components/input/answer-input';
import ResultMessage from '../components/popup/result-message';
import ActionButton from '../components/input/action-button';
import TrainingWordCard from '../components/card/training-word-card';
import { useEffect, useState } from 'react';
import TrainService from '../service/TrainService';
import EmptyTrainingSessionPage from './empty-training-session-page';

export default function TrainingPage() {
    const [cardId, setCardId] = useState(null);
    const [errors, setErrors] = useState({});
    const [currentCardData, setCurrentCardData] = useState(null);

    const location = useLocation();
    const regex = /^\/train\/(?<sessionId>.*)$/;
    const match = location.pathname.match(regex);
    const [sessionId, setSessionId] = useState(match?.groups?.sessionId || null);
    const [isEmptyTrain, setIsEmptyTrain] = useState(false);

    const fetchTask = async () => {
        try {
            const response = await TrainService.getTask(sessionId);
            setCurrentCardData(response.data);
            setCardId(response.data.card.id);
        }
        catch (ex) {
            const error = ex.toJSON();
            if (500 <= error.status) {
                setErrors({ ...errors, task: "Ошибка сервера" });
                return;
            }
            else if (error.status == 404) {
                setIsEmptyTrain(true);
                return;
            }
            else if (400 <= error.status < 500) {
                setErrors({ ...errors, task: ex?.response?.data?.message });
                return;
            }

            setErrors({ ...errors, task: "Неизвестная ошибка при загрузки задания" });
        }
    };

    useEffect(() => {
        fetchTask();
    }, [sessionId]);

    const [isCorrect, setIsCorrect] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);

    const onSubmitAnswer = async () => {
        try {
            const response = await TrainService.submitAnswer(cardId, userAnswer);

            setIsCorrect(response.data.is_correct);
            setShowResult(true);
        } catch (ex) {
            const error = ex.toJSON();
            if (500 <= error.status) {
                setErrors({ ...errors, answer: "Ошибка сервера" });
                return;
            }
            else if (400 <= error.status < 500) {
                setErrors({ ...errors, answer: ex?.response?.data?.message });
                return;
            }

            setErrors({ ...errors, answer: "Неизвестная ошибка" });
        }
    };

    const onNext = async () => {
        setUserAnswer('');
        setShowResult(false);

        await fetchTask();
    };

    const finishSession = async () => {
        try {
            const response = await TrainService.finishSession(sessionId);
        }
        catch (ex) {
        }
    };

    if (isEmptyTrain) {
        return <EmptyTrainingSessionPage />;
    }

    return (
        <div className="container" id="training-container">
            <div className="training-content">
                <div className="training-card">
                    <TrainingHeader onClick={finishSession} />
                    <TrainingWordCard word={currentCardData?.card?.params?.source_word_content || ''} />

                    {!showResult ? (
                        <>
                            <AnswerInput
                                value={userAnswer}
                                onChange={setUserAnswer}
                                onSubmit={onSubmitAnswer}
                                placeholder="Введите перевод..."
                            />
                            <ActionButton
                                variant="primary"
                                disabled={!userAnswer.trim()}
                                onClick={onSubmitAnswer}
                            >
                                Проверить
                            </ActionButton>
                        </>
                    ) : (
                        <>
                            <ResultMessage
                                isCorrect={isCorrect}
                                correctAnswer={currentCardData?.card?.params?.target_word_content || ''}
                                userAnswer={userAnswer}
                            />
                            <ActionButton
                                variant="secondary"
                                onClick={onNext}
                            >
                                Дальше
                            </ActionButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}