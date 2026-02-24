import './training-word-card.css';

export default function TrainingWordCard({ word }) {
    return (
        <div className="training-word-card">
            <div className="training-word-icon">
                <i className="fas fa-language"></i>
            </div>
            <h2 className="training-word">{word}</h2>
        </div>
    );
}