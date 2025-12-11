import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function RemoveChannelModal({ isOpen, onClose, onSubmit }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { t } = useTranslation();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onSubmit();
        } finally {
            setIsDeleting(false);
        }
    };

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
                        <div className="modal-title h4">{t('ui.channels.remove_channel')}</div>
                        <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body"><p className="lead">{t('ui.channels.are_you_sure')}</p>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="me-2 btn btn-secondary" onClick={onClose} disabled={isDeleting}>{t('ui.common.cancel')}</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? t('loading.remove') : t('ui.common.remove')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
