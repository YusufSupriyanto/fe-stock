import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaRegUser } from "react-icons/fa"; // contoh icon dari react-icons
import { BiCategory } from 'react-icons/bi';
import { MdInventory } from 'react-icons/md';



export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true); // state untuk toggle sidebar

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
        { name: "Kategori", icon: <BiCategory />, path: "/kategori" },
        { name: "Produk", icon: <FaBox />, path: "/produk" },
        { name: "Transaksi", icon: <MdInventory />, path: "/transaksi" },
        // { name: "Riwayat", icon: <FaHistory />, path: "/riwayat" },
    ];

    return (
        <div className={`bg-base-300 p-4 h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
            {/* tombol toggle */}
            <button
                className="btn btn-sm btn-square mb-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "<" : ">"}
            </button>

            <ul className="menu">
                {menuItems.map((item) => (
                    <li key={item.name} className="mb-2">
                        <Link
                            to={item.path}
                            className="flex items-center gap-3 p-2 rounded hover:bg-base-200"
                        >
                            <span className="text-lg">{item.icon}</span>
                            {isOpen && <span>{item.name}</span>}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
