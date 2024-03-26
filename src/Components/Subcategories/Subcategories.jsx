import { Fragment, useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import "./Subcategories.modules.scss"
import { NavLink, Outlet } from "react-router-dom";
import SlideProducts from "../SlideProducts/SlideProducts";
import SlidesShow from "../SlidesShow/SlidesShow";

const Subcategories = () => {
    const { subItems, sendProduct, language } = useContext(CategoryContext);

    return (
        <div className="subcategory">
            <div className="slider position-relative mb-3 mt-6">
                <SlideProducts />
                <div className="position-absolute"></div>
            </div>
            <div className="my-2">
                <SlidesShow />
            </div>

            <div className="filter-products container-fluid">
                <div className="w-75 mx-auto text-center my-4 d-flex justify-content-center align-items-center flex-wrap" >
                    {
                        subItems && subItems.length > 0 && subItems.map((item) => {
                            return <Fragment key={item._id}>
                                <NavLink to="" className="nav-link fw-bolder fs-5 p-4 text-capitalize" onClick={() => sendProduct(item.product)}>
                                    {item.translations[language] === "en" ? `${item.name}` : `${item.translations[language]}`}
                                </NavLink>
                            </Fragment>
                        })
                    }

                </div>
                <div className="row">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    )
}

export default Subcategories
