import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Kategori from "./pages/Kategori";
import Produk from "./pages/Produk";
import Transaksi from "./pages/Transaksi";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/kategori" element={<Kategori />} />
                <Route path="/produk" element={<Produk />} />
                <Route path="/transaksi" element={<Transaksi />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
