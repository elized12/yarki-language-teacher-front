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
                <Link to="/translate" className="menu-item translate">
                    <MenuButton title={"Добавить слово"} description={"Добавить новое слово в словарь"} icon={"fa-plus"} />
                </Link>
                <Link to="/train/settings" className="menu-item train">
                    <MenuButton title={"Тренировка"} description={"Карточки для запоминания"} icon={"fa-graduation-cap"} />
                </Link>
                <Link to="/dictionary" className="menu-item dict">
                    <MenuButton title={"Словарь"} description={"Словарный запас"} icon={"fa-book"} />
                </Link>
            </div>
        </div>
    );
} 