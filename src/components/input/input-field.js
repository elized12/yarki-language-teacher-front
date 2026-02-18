import './input-field.css';

export default function InputField({ title, type, placeholder, value, isRequired, icon, onChange }) {
    return (
        <div className="input-group">
            <label htmlFor={title}>{title}</label>
            <div className="input-wrapper">
                <i className={"fas " + icon}></i>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    required={isRequired ?? false}
                    onChange={onChange}
                    id={title}
                />
            </div>
        </div>
    );
}