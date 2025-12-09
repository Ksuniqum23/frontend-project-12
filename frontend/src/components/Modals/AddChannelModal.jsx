import {useEffect, useRef } from "react";
import {useFormik} from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object({
    channelName: Yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле'),
});

export default function AddChannelModal({isOpen, onClose, onSubmit}) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const formik = useFormik({
        initialValues: {
            channelName: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            onSubmit(values.channelName);
            resetForm();
            onClose();
        }
    })

    if (!isOpen) return null;
    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fade modal show"
            tabIndex="-1"
            style={{ display: 'block' }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title h4">Добавить канал</div>
                        <button
                            type="button"
                            aria-label="Close"
                            className="btn btn-close"
                            onClick={onClose}
                        />
                    </div>
                    <div className="modal-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <input
                                    ref={inputRef}
                                    name="channelName"
                                    id="channelName"
                                    className={`mb-2 form-control ${formik.touched.channelName && formik.errors.channelName ? 'is-invalid' : ''}`}
                                    value={formik.values.channelName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Имя канала"
                                    required
                                />
                                {formik.touched.channelName && formik.errors.channelName && (
                                    <div className="invalid-feedback">{formik.errors.channelName}</div>
                                )}
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="me-2 btn btn-secondary"
                                        onClick={onClose}
                                    >
                                        Отменить
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
