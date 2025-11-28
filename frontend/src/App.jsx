import {Link, Route, Routes} from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage.jsx";
import LoginPage from "./components/LoginPage.jsx";

function HomePage() {
    return (
        <>
            <h1>Тут будет чат</h1>
            <Link to="/login">Войти в чат</Link>
        </>
    )
}



function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
