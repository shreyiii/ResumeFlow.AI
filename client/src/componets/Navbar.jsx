import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/slice";

const Navbar = () => {
    const navigate = useNavigate();

    const {user} =useSelector((state) => state.auth);
    const dispatch=useDispatch()

    const logoutUser = () => {
        navigate("/");
        dispatch(logout());
    };

    return (
        <div className="shadow bg-white">
            <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
                <Link to="/">
                    <img src="/logo.svg" className="w-20" />
                </Link>

                <div className="flex items-center gap-4">
                    <p className="hidden sm:block">
    Hi, <span className="font-semibold">{user?.username}</span>
</p>

                    <button
                        onClick={logoutUser}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;