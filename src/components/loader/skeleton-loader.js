import './skeleton-loader.css';

export default function SkeletonLoader() {
    return (
        <div className="skeleton-loader">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="skeleton-item">
                    <div className="skeleton-icon"></div>
                    <div className="skeleton-text">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line short"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}