//!!!!STATE!!!!!!//
import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from "formik";
import { loginUser } from "../api/auth.js";
import { loginFailure, loginStart, loginSuccess } from "../store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { loading } = useSelector(state => state.auth);

    const from = location.state?.from?.pathname || "/";

    const formik = useFormik({
        // Начальные значения полей
        initialValues: {
            username: '',
            password: ''
        },

        validate: values => {
            const errors = {};
            if (!values.username) errors.username = 'Введите логин';
            if (!values.password) errors.password = 'Введите пароль';
            return errors;
        },

        onSubmit: async (values, { setSubmitting, setStatus }) => {
            setStatus({ error: null });
            dispatch(loginStart());
            try {
                const data = await loginUser(values.username, values.password);
                dispatch(loginSuccess({ token: data.token, user: data.username }));
                navigate(from, { replace: true });
            } catch (error) {
                let message = 'Ошибка авторизации';
                dispatch(loginFailure(error.message));
                setStatus({ error: message });
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
                                        <img src="/avatar-login.jpg" className="rounded-circle" alt="Войти" />
                                    </div>
                                    <form className="col-12 col-md-6 mt-3 mt-md-0"
                                          onSubmit={formik.handleSubmit}
                                    >

                                        <h1 className="text-center mb-4">Войти</h1>
                                        <div className="form-floating mb-3">
                                            <input name="username"
                                                autoComplete="username"
                                                // required=""
                                                placeholder="Ваш ник" id="username"
                                                className="form-control"
                                                value={formik.values.username} // Берем значение из Formik
                                                onChange={formik.handleChange} // Обработчик изменений
                                                onBlur={formik.handleBlur} // Отслеживаем "тронутость" поля
                                            />
                                            {formik.touched.username && formik.errors.username && (
                                                <div style={{ color: 'red', fontSize: 13 }}>{formik.errors.username}</div>
                                            )}
                                            <label htmlFor="username">Ваш ник</label>
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input name="password"
                                                autoComplete="current-password"
                                                // required=""
                                                placeholder="Пароль"
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                value={formik.values.password} // Берем значение из Formik
                                                onChange={formik.handleChange} // Обработчик изменений
                                                onBlur={formik.handleBlur} // Отслеживаем "тронутость" поля
                                            />
                                            {formik.touched.password && formik.errors.password && (
                                                <div style={{ color: 'red', fontSize: 13 }}>{formik.errors.password}</div>
                                            )}
                                            <label className="form-label" htmlFor="password">Пароль</label>
                                        </div>

                                        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти
                                        </button>

                                    </form>
                                </div>

                                {formik.status?.error && (
                                    <div style={{
                                        marginBottom: 12,
                                        padding: 10,
                                        background: '#ffecec',
                                        color: '#b00020',
                                        borderRadius: 4,
                                        border: '1px solid #f5c2c2'
                                    }}>
                                        {formik.status.error}
                                    </div>
                                )}

                                <div className="card-footer p-4">
                                    <div className="text-center">
                                        <span>Нет аккаунта? </span>
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
