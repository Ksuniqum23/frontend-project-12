import {Route, Routes} from "react-router-dom";
import NotFoundPage from "./components/pages/NotFoundPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import PrivateRoute from "./components/PrivatRoute.jsx";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
