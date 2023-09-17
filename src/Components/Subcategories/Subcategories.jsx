import { Fragment, useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import Slider from "react-slick";
import "./Subcategories.modules.scss"
import { NavLink, Outlet } from "react-router-dom";

const Subcategories = () => {
    const { subItems, categories, sendProduct } = useContext(CategoryContext);
    var settings = {
        adaptiveHeight: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };
    return (
        <div className="subcategory">
            <div className="slider position-relative">
                <Slider {...settings}>
                    {
                        subItems.map((subItem) => {
                            return <div className="image-slide" key={subItem._id} style={{ height: "418px" }}>
                                <img src={`https://source.unsplash.com/random/1920x418/?${subItem.name}`} style={{ objectFit: "cover" }} alt="slide" className="w-100" />
                            </div>
                        })
                    }
                </Slider>
                <div className="position-absolute"></div>
            </div>
            <div className="categories d-flex justify-content-center align-items-center mt-1">
                {
                    categories.map((category) => {
                        return <div key={category._id} className="text-center text-capitalize mb-5">
                            <img src={category.image.secure_url} className="w-100 py-2 px-4 rounded-circle" height={160} alt="category" />
                            <h6>{category.name}</h6>
                        </div>
                    })
                }
            </div>
            <div className="filter-products container-fluid">
                <div className="w-75 mx-auto text-center mb-4 d-flex justify-content-center align-items-center">
                    {
                        subItems.map((item) => {
                            return <Fragment key={item._id}>
                                <NavLink to="" className="nav-link fw-bolder fs-5 p-4 text-capitalize" onClick={() => sendProduct(item.product)}>{item.name}</NavLink>
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
