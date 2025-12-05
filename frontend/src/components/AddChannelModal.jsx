import {useEffect, useRef, useState} from "react";

export default function AddChannelModal({isOpen, onClose, onSubmit}) {
    const [channelName, setChannelName] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (channelName.trim()) {
            onSubmit(channelName);
            setChannelName('');
            onClose();
        }
    }
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
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    ref={inputRef}
                                    name="name"
                                    id="name"
                                    className="mb-2 form-control"
                                    value={channelName}
                                    onChange={(e) => setChannelName(e.target.value)}
                                    placeholder="Имя канала"
                                    required
                                />
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
