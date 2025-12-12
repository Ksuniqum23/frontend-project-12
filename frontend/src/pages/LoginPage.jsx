import React, { useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice.js";
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import Header from "../components/Header.jsx";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const { loading } = useSelector((state) => state.auth);

    const from = location.state?.from?.pathname || "/";
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, t('errors.min_3_max_20_symbols'))
            .max(20, t('errors.min_3_max_20_symbols'))
            .required(t('errors.required')),
        password: Yup.string()
            // .min(6, t('errors.min_6_symbols_password'))
            .required(t('errors.required')),
    })
    const formik = useFormik({
        // Начальные значения полей
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            setStatus({ error: null });
            try {
                await dispatch(loginUser({ username: values.username, password: values.password })).unwrap();
                navigate(from, { replace: true });
            } catch (err) {
                let message = '';
                if (err.statusCode === 401) {
                    message = t('errors.e_401');
                } else {
                    message = err?.message;
                }
                setStatus({ error: message });
            } finally {
                setSubmitting(false);
            }
        },
    });
    // const serverError = formik.status?.error || authError;

    return (
        <div className="h-100">
            <div className="d-flex flex-column h-100">
                <Header />
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

                                        <h1 className="text-center mb-4">{t('ui.auth.sign_in')}</h1>
                                        <div className="form-floating mb-3">
                                            <input
                                                ref={inputRef}
                                                name="username"
                                                autoComplete="username"
                                                // required=""
                                                placeholder={t('ui.auth.your_nickname')}
                                                className="form-control"
                                                value={formik.values.username} // Берем значение из Formik
                                                onChange={formik.handleChange} // Обработчик изменений
                                                onBlur={formik.handleBlur} // Отслеживаем "тронутость" поля
                                            />
                                            {formik.touched.username && formik.errors.username && (
                                                <div style={{ color: 'red', fontSize: 13 }}>{formik.errors.username}</div>
                                            )}
                                            <label htmlFor="username">{t('ui.auth.your_nickname')}</label>
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input name="password"
                                                autoComplete="current-password"
                                                // required=""
                                                placeholder={t('ui.auth.password_placeholder')}
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
                                            <label className="form-label" htmlFor="password">{t('ui.auth.password_placeholder')}</label>
                                        </div>

                                        <button type="submit"
                                            className="w-100 mb-3 btn btn-outline-primary"
                                            disabled={formik.isSubmitting || loading}
                                        >{loading || formik.isSubmitting ? t('loading.coming_in') : t('ui.auth.sign_in')}
                                        </button>

                                    </form>
                                </div>

                                {formik.status?.error && (
                                    <div className="alert alert-danger" role="alert">
                                        {formik.status.error}
                                    </div>
                                )}

                                <div className="card-footer p-4">
                                    <div className="text-center">
                                        <span>{t('ui.auth.have_no_account')} </span>
                                        <Link to="/signup">{t('ui.auth.registration')}</Link>
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
