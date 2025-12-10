import { useFormik } from "formik";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../store/authSlice.js";

const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.auth);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirm: '',
        },

        validate: values => {
            const errors = {};
            if (!values.username) errors.username = 'Обязательное поле';

            if (!values.password) {
                errors.password = 'Обязательное поле';
            } else if (values.password.length < 6) {
                errors.password = 'Пароль должен быть минимум 6 символов';
            }

            if (!values.passwordConfirm) {
                errors.passwordConfirm = 'Повторите пароль';
            } else if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = 'Пароли не совпадают';
            }

            return errors;
        },

        onSubmit: async (values, { setSubmitting, setStatus }) => {
            setStatus({ error: null });
            try {
                await dispatch(signupUser({ username: values.username, password: values.password }));
                navigate('/');

            } catch (err) {
                const message = err?.message || err || 'Ошибка регистрации';
                setStatus({ error: message });
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container"><a className="navbar-brand" href="/frontend/public">Hexlet Chat</a></div>
                    </nav>
                    <div className="container-fluid h-100">
                        <div className="row justify-content-center align-content-center h-100">
                            <div className="col-12 col-md-8 col-xxl-6">
                                <div className="card shadow-sm">
                                    <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                                        <div>
                                            <img src="/avatar_signUp.jpg" className="rounded-circle" alt="Регистрация" />
                                        </div>
                                        <form className="w-50"
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <h1 className="text-center mb-4">Регистрация</h1>

                                            {/* Поле: username */}
                                            <div className="form-floating mb-3">
                                                <input
                                                    ref={inputRef}
                                                    placeholder="От 3 до 20 символов"
                                                    name="username"
                                                    autoComplete="username"
                                                    required="" id="username"
                                                    className="form-control"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.username}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.username && formik.errors.username && (
                                                    <div style={{ color: 'red', fontSize: 13 }}>{formik.errors.username}</div>
                                                )}
                                                <label className="form-label" htmlFor="username">Имя пользователя</label>

                                            </div>

                                            {/* Поле: password */}
                                            <div className="form-floating mb-3">
                                                <input placeholder="Не менее 6 символов"
                                                    name="password"
                                                    aria-describedby="passwordHelpBlock"
                                                    required=""
                                                    autoComplete="new-password"
                                                    type="password" id="password"
                                                    className="form-control"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.password}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.password && formik.errors.password && (
                                                    <div style={{ color: 'red', fontSize: 13 }}>{formik.errors.password}</div>
                                                )}
                                                <label className="form-label" htmlFor="password">Пароль</label>
                                            </div>

                                            {/* Поле: passwordConfirm */}
                                            <div className="form-floating mb-4">
                                                <input placeholder="Пароли должны совпадать"
                                                    name="passwordConfirm"
                                                    required=""
                                                    autoComplete="new-password"
                                                    type="password"
                                                    id="passwordConfirm"
                                                    className="form-control"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.passwordConfirm}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                                                    <div style={{ color: 'red', fontSize: 13 }}>{formik.errors.passwordConfirm}</div>
                                                )}
                                                <label className="form-label" htmlFor="passwordConfirm">Подтвердите пароль</label>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-100 btn btn-outline-primary"
                                                disabled={formik.isSubmitting || loading}
                                            >
                                                {loading || formik.isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                                            </button>
                                        </form>
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
export default SignupPage;
