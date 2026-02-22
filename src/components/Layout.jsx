import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <Navbar />
            <main className="p-6">
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;