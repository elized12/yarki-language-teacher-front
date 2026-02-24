import './register-page.css';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import AuthLogo from '../components/other/auth-logo';
import InputField from '../components/input/input-field';
import ErrorMessage from '../components/popup/error-message';
import AuthButton from '../components/button/auth-button';
import SuccessMessage from '../components/popup/success-message';
import AuthService from '../service/AuthService';

export default function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Введите имя';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Имя должно быть не менее 2 символов';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Введите email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
        }

        if (!formData.password) {
            newErrors.password = 'Введите пароль';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Подтвердите пароль';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await AuthService.register(formData.email, formData.name, formData.password);

            setErrors({});
            setSuccessMessage('Регистрация успешна! Теперь войдите в систему');
            setTimeout(() => {
                setSuccessMessage('Регистрация успешна! Теперь войдите в систему');
                navigate('/login');

            }, 1500);
        } catch (ex) {
            const error = ex.toJSON();
            if (500 <= error.status) {
                setErrors({ form: ex?.message || 'Ошибка сервера. Попробуйте позже' });
                return;
            }
            else if (400 <= error.status < 500) {
                setErrors({ form: ex?.response?.data?.message });
                return;
            }

            setErrors({ form: "Неизвестная ошибка" });
        } finally {
            setIsLoading(false);
        }
    };

    const errorMessage = errors.form || errors.name || errors.email || errors.password || errors.confirmPassword;

    return (
        <div className="container">
            <div className="content">
                <AuthLogo id="register-logo" />

                <div className="register-header">
                    <h2>Создать аккаунт</h2>
                    <p>Начните учить слова прямо сейчас</p>
                </div>

                <form className="register-form">
                    <InputField
                        title="email"
                        type="email"
                        placeholder={"Введите email"}
                        value={formData.email}
                        onChange={(event) => { setFormData(prev => ({ ...prev, email: event.target.value })); }}
                        icon="fa-envelope"
                        isRequired={true}
                    />

                    <InputField
                        title="nickname"
                        type="text"
                        placeholder={"Введите имя"}
                        value={formData.name}
                        onChange={(event) => { setFormData(prev => ({ ...prev, name: event.target.value })); }}
                        icon="fa-user"
                        isRequired={true}
                    />

                    <InputField
                        title="password"
                        type="password"
                        placeholder={"Введите пароль"}
                        value={formData.password}
                        onChange={(event) => { setFormData(prev => ({ ...prev, password: event.target.value })); }}
                        icon="fa-lock"
                        isRequired={true}
                    />

                    <InputField
                        title="confirmPassword"
                        type="password"
                        placeholder={"Подтвердите пароль"}
                        value={formData.confirmPassword}
                        onChange={(event) => { setFormData(prev => ({ ...prev, confirmPassword: event.target.value })); }}
                        icon="fa-lock"
                        isRequired={true}
                    />

                    <ErrorMessage message={errorMessage} onClose={() => { setErrors({}) }} />
                    <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />

                    <div className="footer-form">
                        <AuthButton message={"Зарегистрироваться"} onClick={handleSubmit} disabled={isLoading} />

                        <div className="login-link">
                            Уже есть аккаунт?
                            <Link to="/login">Войти</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}