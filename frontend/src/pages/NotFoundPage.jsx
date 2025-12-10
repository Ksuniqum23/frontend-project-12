import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
                    </nav>
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <h1>404 - Страница не найдена</h1>
                        <p>Извините, запрашиваемая страница не существует.</p>
                        <Link to="/">Вернуться на главную</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
