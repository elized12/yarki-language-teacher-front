
import './greeting-block.css';

export default function GreetingBlock({ name }) {
    return (
        <div className="greeting">
            <h2>Привет, {name}! 👋</h2>
            <p>Продолжай в том же духе ✨</p>
        </div>
    );
}