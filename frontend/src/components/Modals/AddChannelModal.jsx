import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { selectAllChannels } from "../../store/channelsSlice.js";
import { useTranslation } from "react-i18next";



export default function AddChannelModal({ isOpen, onClose, onSubmit }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const channels = useSelector(selectAllChannels);
    const channelNames = Object.values(channels).map(ch => ch.name);
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        channelName: Yup.string()
            .min(3, t('errors.min_3_max_20_symbols'))
            .max(20, t('errors.min_3_max_20_symbols'))
            .required(t('errors.required'))
            .test('unique-name', t('errors.duplicate_channel'),
                (value) => !channelNames.includes(value?.trim())
            ),
    });

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
                        <div className="modal-title h4">{t('ui.channels.add_channel')}</div>
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
                                    placeholder={t('ui.channels.new_channel_placeholder')}
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
                                        {t('ui.common.cancel')}
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={formik.isSubmitting}
                                    >
                                        {formik.isSubmitting ? t('loading.send') : t('ui.common.send')}
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
