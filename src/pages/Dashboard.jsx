import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authService";
import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        getProfile(token)
            .then((res) => {
                console.info("Response dari /me:", res);
                setUser(res.data.data);
            })
            .catch((err) => {
                console.error("Error saat getProfile:", err);
                navigate("/");
            });
    }, [navigate]);

    return (
        <MainLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                {/*{user ? <p className="mt-2">Welcome, {user.nama_depan}</p> : <p>Loading...</p>}*/}
                {/*<button onClick={logout} className="btn btn-error mt-4">Logout</button>*/}
            </div>
        </MainLayout>
    );
}
