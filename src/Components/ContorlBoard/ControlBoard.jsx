import { NavLink, Outlet } from "react-router-dom";
import "./ControlBoard.modules.scss";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";

const ControlBoard = ({userData}) => {
    const { t, navPosition } = useContext(CategoryContext);

    return (
        <div className="control-board pt-3">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Control")}</title>
            </Helmet>
            {
                userData?.role === "Admin" ? 
                <div className="container mt-6 px-4">
                    <h3 className={`h1 pt-3 mt-2 ${navPosition === "right" ? "" : "text-end"}`}>{t("Manage")}</h3>
                    <div className="row">
                        <div className={`col-sm-12 col-md-2 text-center text-capitalize ${navPosition === "right" ? "" : "order-sm-2"}`}>
                            <NavLink to="" className="nav-link my-3 fs-6 py-3 px-2 rounded-2 text-muted fw-bolder border-button">{t("Manage categories")}</NavLink>
                            <NavLink to="subcategoey_manage" className="nav-link my-3 fs-6 py-3 px-2 fw-bolder border-button rounded-2 text-muted">{t("Manage Subcategories")}</NavLink>
                            <NavLink to="brand_manage" className="nav-link my-3 fs-6 py-3 px-2 rounded-2 fw-bolder border-button text-muted">{t("Manage brands")}</NavLink>
                            <NavLink to="product_manage" className="nav-link my-3 fs-6 py-3 px-2 rounded-2 fw-bolder border-button text-muted">{t("Manage Products")}</NavLink>
                        </div>
                        <div className={`col-sm-12 col-md-10 ${navPosition === "right" ? "order-sm-2" : ""}`}>
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
                : <p>not found</p>
            }
        </div>
    )
}

export default ControlBoard;
