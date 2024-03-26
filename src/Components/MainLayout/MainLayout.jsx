import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { Offline } from "react-detect-offline";
import { useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";

const MainLayout = ({ userData, logout }) => {
    const { t } = useContext(CategoryContext);

    return (
        <div>
            <Navbar userData={userData} logout={logout} />
            <div>
                <Outlet />
            </div>
            <Offline>
                <div className="network px-5 py-3">
                    <i className="fas fa-wifi"></i> {t("offline")}
                </div>
            </Offline>
            <Footer />
        </div>
    )
}

export default MainLayout
