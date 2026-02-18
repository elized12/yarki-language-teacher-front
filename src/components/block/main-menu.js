import './main-menu.css';

import MenuButton from "../button/menu-button";
import { Link } from "react-router";

export default function MainMenu() {
    return (
        <div className="menu-section" >
            <div className="menu-title">
                Меню
            </div>
            <div className="menu-list">
                <Link to="/train" className="menu-item train">
                    <MenuButton title={"Тренировка"} description={"Карточки для запоминания"} icon={"fa-graduation-cap"} />
                </Link>
                <Link to="/dictionary" className="menu-item dict">
                    <MenuButton title={"Словарь"} description={"Словарный запас"} icon={"fa-book"} />
                </Link>
                <Link to="/profile" className="menu-item profile">
                    <MenuButton title={"Профиль"} description={"Статистика и настройки"} icon={"fa-user"} />
                </Link>
            </div>
        </div>
    );
} 