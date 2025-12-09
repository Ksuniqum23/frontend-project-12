import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Provider } from "react-redux";
import { store } from './store';
import './index.css';
import SocketProvider from "./components/SocketProvider.jsx";

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
