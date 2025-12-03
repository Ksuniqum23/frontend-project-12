//!!!!STATE!!!!!!//
import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {useFormik} from "formik";
import {loginUser} from "../api/auth.js";
import {loginFailure, loginStart, loginSuccess} from "../../store/authSlice.js";
import {useDispatch} from "react-redux";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const formik = useFormik({
        // Начальные значения полей
        initialValues: {
            username: '',
            password: ''
        },

        onSubmit: async (values, { setSubmitting, setStatus }) => {
            dispatch(loginStart()); // запускаем процесс логина
            try {
                const data = await loginUser(values.username, values.password); // запрос на сервер
                dispatch(loginSuccess({token: data.token, username: data.username})); // успех
                navigate(from, {replace: true}); // редирект после логина
            } catch (error) {
                dispatch(loginFailure(error.message)); // ошибка логина
                setStatus({error: error.message});   // чтобы Formik показал ошибку
            } finally {
                setSubmitting(false); // завершение процесса загрузки в Formik
            }
        },
    });

    return (
        <div className="h-100">
            <div className="d-flex flex-column h-100">

                <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        <a className="navbar-brand" href="/frontend/public">Hexlet Chat</a>
                    </div>
                </nav>

                <div className="container-fluid h-100">
                    <div className="row justify-content-center align-content-center h-100">
                        <div className="col-12 col-md-8 col-xxl-6">
                            <div className="card shadow-sm">

                                <div className="card-body row p-5">
                                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                        <img src="/avatar-login.jpg" className="rounded-circle" alt="Войти"/>
                                    </div>
                                    <form className="col-12 col-md-6 mt-3 mt-md-0"
                                          onSubmit={formik.handleSubmit}>

                                        <h1 className="text-center mb-4">Войти</h1>
                                        <div className="form-floating mb-3">
                                            <input name="username"
                                                   autoComplete="username" required=""
                                                   placeholder="Ваш ник" id="username"
                                                   className="form-control"
                                                   value={formik.values.username} // Берем значение из Formik
                                                   onChange={formik.handleChange} // Обработчик изменений
                                                   onBlur={formik.handleBlur} // Отслеживаем "тронутость" поля
                                            />
                                            <label htmlFor="username">Ваш ник</label>
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input name="password"
                                                   autoComplete="current-password"
                                                   required=""
                                                   placeholder="Пароль"
                                                   type="password"
                                                   id="password"
                                                   className="form-control"
                                                   value={formik.values.password} // Берем значение из Formik
                                                   onChange={formik.handleChange} // Обработчик изменений
                                                   onBlur={formik.handleBlur} // Отслеживаем "тронутость" поля
                                            />
                                            <label className="form-label" htmlFor="password">Пароль</label>
                                        </div>

                                        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти
                                        </button>

                                    </form>
                                </div>

                                <div className="card-footer p-4">
                                    <div className="text-center">
                                        <span>Нет аккаунта?</span>
                                        <Link to="/signup">Регистрация</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage


// onSubmit: async (values, { setSubmitting, setStatus }) => {
//     try {
//         console.log('Данные формы:', values);
//         const userData = await loginUser(values.username, values.password);
//         console.log('Авторизация успешна!');
//         console.log('Токен:', userData.token);
//         console.log('DATA:', userData);
//         // navigate('/');
//         navigate(from, { replace: true });
//     } catch (error) {
//         console.error('Ошибка авторизации:', error);
//         setStatus({ error: error.message });
//     } finally {
//         setSubmitting(false);
//     }
// },
