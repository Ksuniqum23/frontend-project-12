import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { selectAllChannels } from "../../store/channelsSlice.js";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

export default function EditChannelModal({ isOpen, onClose, onSubmit, channel }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);


    const channels = useSelector(selectAllChannels);
    const channelNames = Object.values(channels)
        .filter(ch => ch.id !== channel?.id)
        .map(ch => ch.name);
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        editChannelName: Yup.string()
            .min(3, t('errors.min_3_max_20_symbols'))
            .max(20, t('errors.min_3_max_20_symbols'))
            .required(t('errors.required'))
            .test('unique-name', t('errors.duplicate_channel'),
                (value) => !channelNames.includes(value?.trim())
            ),
    });

    const formik = useFormik({
        initialValues: {
            editChannelName: channel?.name || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            if (channel) {
                await onSubmit(channel.id, values.editChannelName.trim());
                onClose();
            }
        }
    })

    useEffect(() => {
        if (channel) {
            formik.resetForm({
                values: { editChannelName: channel.name }
            });
        }
    }, [channel]);

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
                        <div className="modal-title h4">{t('ui.channels.rename_channel')}</div>
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
                                    name="editChannelName"
                                    id="editChannelName"
                                    className={`mb-2 form-control ${formik.touched.editChannelName &&
                                    formik.errors.editChannelName ? 'is-invalid' : ''
                                    }`}
                                    value={formik.values.editChannelName}
                                    onChange={formik.handleChange}
                                    placeholder={t('ui.channels.new_channel_placeholder')}
                                    required
                                />
                                <label className="visually-hidden" htmlFor="editChannelName">Имя канала</label>
                                {formik.touched.editChannelName &&
                                    formik.errors.editChannelName && (
                                        <div className="invalid-feedback d-block">
                                            {formik.errors.editChannelName}
                                        </div>
                                    )}
                                <div className="invalid-feedback"></div>
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
