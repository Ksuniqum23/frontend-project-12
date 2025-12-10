import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { selectAllChannels } from "../../store/channelsSlice.js";
import { useFormik } from "formik";

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

    const validationSchema = Yup.object({
        editChannelName: Yup.string()
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .required('Обязательное поле')
            .test('unique-name', 'Канал с таким именем уже существует',
                (value) => !channelNames.includes(value?.trim())
            ),
    });

    const formik = useFormik({
        initialValues: {
            editChannelName: channel?.name || '',
        },
        validationSchema,
        onSubmit: (values) => {
            if (channel) {
                onSubmit(channel.id, values.editChannelName.trim());
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
                        <div className="modal-title h4">Переименовать канал</div>
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
                                    placeholder="Новое название канала"
                                    required
                                />
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
