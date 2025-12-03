import {Link} from "react-router-dom";

function HomePage() {
    return (
        <>
            <h1>Тут будет чат</h1>
            <Link to="/login">Войти в чат</Link>
        </>
    )
}

export default HomePage;
