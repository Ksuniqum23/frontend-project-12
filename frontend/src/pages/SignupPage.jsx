import { useFormik } from "formik";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../store/authSlice.js";
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import Header from "../components/Header.jsx";

const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.auth);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const { t } = useTranslation();

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, t('errors.min_3_max_20_symbols'))
            .max(20, t('errors.min_3_max_20_symbols'))
            .required(t('errors.required')),
        password: Yup.string()
            .min(6, t('errors.min_6_symbols_password'))
            .required(t('errors.required')),
        passwordConfirm: Yup.string()
            .required(t('errors.required'))
            .oneOf([Yup.ref('password')], t('errors.confirmPassword')),
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            setStatus({ error: null });
            try {
                await dispatch(signupUser({ username: values.username, password: values.password })).unwrap();
                navigate('/');
            } catch (err) {
                let message = '';
                if (err.status === 409) {
                    message = t('errors.e_409');
                } else {
                    message = err?.message;
                }
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
                    <Header />
                    <div className="container-fluid h-100">
                        <div className="row justify-content-center align-content-center h-100">
                            <div className="col-12 col-md-8 col-xxl-6">
                                <div className="card shadow-sm">
                                    <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                                        <div>
                                            <img src="/avatar_signUp.jpg" className="rounded-circle" alt={t('ui.auth.registration')} />
                                        </div>
                                        <form className="w-50"
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <h1 className="text-center mb-4">{t('ui.auth.registration')}</h1>

                                            {/* Поле: username */}
                                            <div className="form-floating mb-3">
                                                <input
                                                    ref={inputRef}
                                                    placeholder={t('errors.min_3_max_20_symbols')}
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
                                                <label className="form-label" htmlFor="username">{t('ui.auth.your_name_placeholder')}</label>

                                            </div>

                                            {/* Поле: password */}
                                            <div className="form-floating mb-3">
                                                <input placeholder={t('errors.min_6_symbols_password')}
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
                                                <label className="form-label" htmlFor="password">{t('ui.auth.password_placeholder')}</label>
                                            </div>

                                            {/* Поле: passwordConfirm */}
                                            <div className="form-floating mb-4">
                                                <input placeholder={t('errors.confirmPassword')}
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
                                                <label className="form-label" htmlFor="passwordConfirm">{t('ui.auth.confirm_password_placeholder')}</label>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-100 btn btn-outline-primary"
                                                disabled={formik.isSubmitting || loading}
                                            >
                                                {loading || formik.isSubmitting ? t('loading.registration') : t('ui.auth.registration_btn')}
                                            </button>
                                        </form>
                                    </div>
                                    {formik.status?.error && (
                                        <div className="alert alert-danger" role="alert">
                                            {formik.status.error}
                                        </div>
                                    )}
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
