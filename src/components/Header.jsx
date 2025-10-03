import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="navbar bg-base-100 shadow-md px-4">
            {/*<div className="flex-none lg:hidden">*/}
            {/*    <button*/}
            {/*        className="btn btn-square btn-ghost"*/}
            {/*        onClick={() => setMenuOpen(!menuOpen)}*/}
            {/*    >*/}
            {/*        <FaBars className="text-xl" />*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div className="flex-1">
                <span className="text-xl font-bold">FE-Stock</span>
            </div>

            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <FaUserCircle className="text-3xl" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 mt-4"
                    >
                        <li>
                            <Link to="/profile" className="flex items-center gap-2">
                                <FaUserCircle /> Profile
                            </Link>
                        </li>
                        <li>
                            <button onClick={logout} className="flex items-center gap-2">
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
