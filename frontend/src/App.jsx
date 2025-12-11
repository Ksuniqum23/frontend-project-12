import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <ChatPage />
                        </PrivateRoute>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
        </>
    )
}

export default App
