import "./page-header-block.css";

import { Link } from "react-router";
import BackButton from "../button/back-button";

export default function PageHeaderBlock({ title, description, redirectTo }) {
    return (
        <div className="page-header">
            <Link style={{ textDecoration: "none" }} to={redirectTo}>
                <BackButton />
            </Link>
            <div className="header-title">
                <h1>{title}</h1>
                <p className="total-count">{description}</p>
            </div>
            <div className="header-placeholder"></div>
        </div>
    );
}