import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"

const MainLayout = ({userData , logout}) => {
    return (
        <div>
            <Navbar userData={userData} logout={logout} />
            <div>
                <Outlet/>
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout
