import './training-header.css';

import { useNavigate } from 'react-router';

export default function TrainingHeader({ onClick }) {
    const navigate = useNavigate();

    const onClickBack = () => {
        if (onClick) {
            onClick();
        }
        navigate('/');
    };

    return (
        <div className="training-header">
            <button className="training-back-btn" onClick={onClickBack}>
                <i className="fas fa-arrow-left"></i>
            </button>

            <div className="training-progress-info">
            </div>

            <div className="training-header-placeholder"></div>
        </div>
    );
}