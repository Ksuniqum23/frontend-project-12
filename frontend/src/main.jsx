import '../src/i18n/init.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import { store } from './store';
import SocketProvider from "./socket/SocketProvider.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
