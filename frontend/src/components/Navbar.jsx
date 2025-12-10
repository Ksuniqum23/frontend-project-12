import {logout} from "../store/authSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        // Можно сохранить в localStorage для запоминания выбора
        // localStorage.setItem('language', lng);
    };

    return (
        <>
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                <div className="container">
                    <a className="navbar-brand" href="/frontend/public">Hexlet Chat</a>

                    <div className="d-flex align-items-center gap-2">
                        <div className="btn-group btn-group-sm" role="group">
                            <button
                                type="button"
                                className={`btn ${i18n.language === 'ru' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => changeLanguage('ru')}
                                title="Русский"
                            >
                                🇷🇺 RU
                            </button>
                            <button
                                type="button"
                                className={`btn ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => changeLanguage('en')}
                                title="English"
                            >
                                🇬🇧 EN
                            </button>
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={handleLogout}>Выйти</button>
                </div>
            </nav>
        </>
    )
}
