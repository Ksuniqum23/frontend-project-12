import {logout} from "../store/authSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <>
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                <div className="container">
                    <a className="navbar-brand" href="/frontend/public">Hexlet Chat</a>
                    <button type="button" className="btn btn-primary" onClick={handleLogout}>Выйти</button>
                </div>
            </nav>
        </>
    )
}
