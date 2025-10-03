import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
    return (
        <div className="flex h-screen bg-base-200">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-4 overflow-y-auto">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
