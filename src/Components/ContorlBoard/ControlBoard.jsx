import { NavLink, Outlet } from "react-router-dom";
import "./ControlBoard.modules.scss";
import { Helmet } from "react-helmet";

const ControlBoard = () => {
    return (
        <div className="control-board">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Control Board</title>
            </Helmet>
            <div className="container">
                <h3 className="h1 mt-2">Manage All Products</h3>
                <div className="row">
                    <div className="col-sm-12 col-md-2 text-capitalize">
                        <NavLink to="" className="nav-link my-3 fs-6 py-3 px-2 rounded-2 text-muted">Manage categories</NavLink>
                        <NavLink to="subcategoey_manage" className="nav-link my-3 fs-6 py-3 px-2 rounded-2 text-muted">Manage Subcategories</NavLink>
                        <NavLink to="brand_manage" className="nav-link my-3 fs-6 py-3 px-2 rounded-2 text-muted">Manage brands</NavLink>
                        <NavLink to="product_manage" className="nav-link my-3 fs-6 py-3 px-2 rounded-2 text-muted">Manage Products</NavLink>
                    </div>
                    <div className="col-sm-12 col-md-10">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlBoard
