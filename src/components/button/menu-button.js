import './menu-button.css';

export default function MenuButton({ title, description, icon }) {
    return (
        <>
            <div className="menu-icon">
                <i className={"fas " + icon}></i>
            </div>
            <div className="menu-content">
                <div className="menu-title-big">{title}</div>
                <div className="menu-desc">{description}</div>
            </div>
            <div className="menu-arrow">
                <i className="fas fa-chevron-right"></i>
            </div>
        </>
    );
}