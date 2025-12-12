import { useEffect, useRef, useState } from "react";
import AddChannelModal from "./Modals/AddChannelModal.jsx";
import EditChannelModal from "./Modals/EditChannelModal.jsx";
import {
    addChannel,
    deleteChannel,
    editChannel,
    fetchChannels,
    selectAllChannels,
    setActiveChannel
} from "../store/channelsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import RemoveChannelModal from "./Modals/RemoveChannelModal.jsx";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {filterProfanity} from "../profanityFilter/filterProfanity.js";

export default function ChannelsList() {
    const dispatch = useDispatch();

    const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
    const [isEditChannelModalOpen, setIsEditChannelModalOpen] = useState(false);
    const [isDeleteChannelModalOpen, setIsDeleteChannelModalOpen] = useState(false);
    const [channelToEdit, setChannelToEdit] = useState(null);
    const [channelToDelete, setChannelToDelete] = useState(null);

    const channels = useSelector(selectAllChannels);
    const activeChannelId = useSelector(state => state.channels.activeChannelId);
    const channelsEndRef = useRef(null);
    const { t } = useTranslation();

    // useEffect(() => {
    //     dispatch(fetchChannels());
    // }, [dispatch]);

    useEffect(() => {
        if (channelsEndRef.current) {
            channelsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [channels]);

    const handleAddChannel = async (name) => {
        const filterName = filterProfanity(name.trim());
        try {
            await dispatch(addChannel(filterName));
            toast.success(t('ui.channels.channel_created'));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    const handleOpenEditModal = (channel) => {
        setChannelToEdit(channel);
        setIsEditChannelModalOpen(true);
    }

    const handleOpenDeleteModal = (channel) => {
        setChannelToDelete(channel);
        setIsDeleteChannelModalOpen(true);
    }

    const handleEditChannel = async (channelId, newName) => {
        try {
            await dispatch(editChannel({ channelId, newName }));
            toast.success(t('ui.channels.channel_renamed'));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    const handleDeleteChannel = async (channelId) => {
        try {
            await dispatch(deleteChannel(channelId));
            setIsDeleteChannelModalOpen(false);
            setChannelToDelete(null);
            toast.success(t('ui.channels.channel_removed'));
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('ui.channels.channels')}</b>
                <button
                    type="button"
                    className="p-0 text-primary btn btn-group-vertical"
                    aria-label={t('ui.channels.add_channel')}
                    onClick={() => setIsAddChannelModalOpen(true)}
                >
                    +
                </button>
                <AddChannelModal
                    isOpen={isAddChannelModalOpen}
                    onClose={() => setIsAddChannelModalOpen(false)}
                    onSubmit={handleAddChannel}
                />
                <EditChannelModal
                    isOpen={isEditChannelModalOpen}
                    onClose={() => setIsEditChannelModalOpen(false)}
                    onSubmit={handleEditChannel}
                    channel={channelToEdit}
                />
                <RemoveChannelModal                           // ADDED: подключаем модалку удаления
                    isOpen={isDeleteChannelModalOpen}
                    onClose={() => {
                        setIsDeleteChannelModalOpen(false);
                        setChannelToDelete(null);
                    }}
                    onSubmit={() => handleDeleteChannel(channelToDelete?.id)}
                />
            </div>

            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map((channel) => (
                    <li className="nav-item w-100 d-flex align-items-center" key={channel.id}>
                        <button
                            type="button"
                            className={`flex-grow-1 rounded-0 text-start btn ${channel.id === activeChannelId ? 'btn-secondary' : 'btn-light'
                                }`}
                            onClick={() => dispatch(setActiveChannel(channel.id))}
                        >
                            <span className="me-1">#</span>
                            {channel.name}
                        </button>

                        {channel.removable && (
                            <div className="dropdown ms-1">
                                <button
                                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                    type="button"
                                    id={`dropdown-${channel.id}`}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                </button>

                                <ul className="dropdown-menu" aria-labelledby={`dropdown-${channel.id}`}>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleOpenEditModal(channel)}
                                        >
                                            {t('ui.common.rename')}
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={() => handleOpenDeleteModal(channel)}
                                        >
                                            {t('ui.common.remove')}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                ))
                }
                <li ref={channelsEndRef} />

            </ul>
        </div>
    )
}
