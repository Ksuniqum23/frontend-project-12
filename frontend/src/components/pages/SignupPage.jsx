import { useFormik } from "formik";
import React from "react";

const SignupPage = () => {
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

        onSubmit: async (values) => {
            console.log('Отправлено', values);
        }
    });

    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
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
                                                <input placeholder="От 3 до 20 символов"
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

                                            <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
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

// <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
//     <div className="container">
//         <div className="row justify-content-center">
//             <div className="col-sm-10 col-md-8 col-lg-6">
//                 <div className="text-center mb-4">
//                     {/* Логотип */}
//                     <img
//                         src="/avatar_signUp.jpg"
//                         alt="Hexlet Chat"
//                         style={{ width: 72, height: 72 }}
//                         className="mb-2"
//                     />
//                     <h1 className="h4">Регистрация</h1>
//                     <p className="text-muted">Создайте аккаунт, чтобы присоединиться к чату</p>
//                 </div>
//
//                 <div className="card shadow-sm">
//                     <div className="card-body p-4">
//                         <form>
//                             {/* Поле: username */}
//                             <div className="mb-3">
//                                 <label htmlFor="username" className="form-label">Логин</label>
//                                 {formik.touched.username && formik.errors.username && (
//                                     <div style={{ color: 'red', fontSize: 13 }}>{formik.errors.username}</div>
//                                 )}
//                                 <input
//                                     id="username"
//                                     name="username"
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Имя пользователя"
//                                     onChange={formik.handleChange}
//                                     value={formik.values.username}
//                                     onBlur={formik.handleBlur}
//                                 />
//                             </div>
//
//                             {/* Поле: password */}
//                             <div className="mb-3">
//                                 <label htmlFor="password" className="form-label">Пароль</label>
//                                 {formik.touched.password && formik.errors.password && (
//                                     <div style={{ color: 'red', fontSize: 13 }}>{formik.errors.password}</div>
//                                 )}
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     className="form-control"
//                                     placeholder="Минимум 6 символов"
//                                     onChange={formik.handleChange}
//                                     value={formik.values.password}
//                                     onBlur={formik.handleBlur}
//                                 />
//                             </div>
//
//                             {/* Поле: confirm password */}
//                             <div className="mb-3">
//                                 <label htmlFor="passwordConfirm" className="form-label">Подтвердите пароль</label>
//                                 {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
//                                     <div style={{ color: 'red', fontSize: 13 }}>{formik.errors.passwordConfirm}</div>
//                                 )}
//                                 <input
//                                     id="passwordConfirm"
//                                     name="passwordConfirm"
//                                     type="password"
//                                     className="form-control"
//                                     placeholder="Повторите пароль"
//                                     onChange={formik.handleChange}
//                                     value={formik.values.passwordConfirm}
//                                     onBlur={formik.handleBlur}
//                                 />
//                             </div>
//
//                             {/* Ошибка/инфо */}
//                             <div className="mb-3">
//                                 <div className="text-danger" role="alert" aria-live="polite" style={{ minHeight: 20 }}>
//                                     {/* Здесь можно рендерить ошибки сервера */}
//                                 </div>
//                             </div>
//
//                             {/* Кнопка */}
//                             <div className="d-grid mb-3">
//                                 <button type="submit" className="btn btn-primary btn-lg">
//                                     Зарегистрироваться
//                                 </button>
//                             </div>
//
//                             {/* Подсказка / ссылка на логин */}
//                             <div className="text-center">
//                                 <small className="text-muted">
//                                     Уже есть аккаунт? <Link to="/login">Войти</Link>
//                                 </small>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//
//                 {/* Небольшой футер */}
//                 <div className="text-center mt-3">
//                     <small className="text-muted">© Hexlet Chat</small>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
