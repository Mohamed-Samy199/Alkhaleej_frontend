import { useContext } from "react"
import { CategoryContext } from "../Context/CategoryContext/Category"
import Slider from "react-slick";
import "./products.modules.scss";
import { NavLink, Outlet } from "react-router-dom";
import { Fragment } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";



const Products = () => {
    const { categories, sendSubcategory, searchProduct, search } = useContext(CategoryContext);
    // slider
    var settings = {
        adaptiveHeight: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        dots: true
    };
    return (

        <div className="products">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
            </Helmet>
            {
                categories.length > 0 ? <Fragment>
                    <div className="slider position-relative">
                        <Slider {...settings}>
                            <div className="image-slide">
                                <img src={`https://source.unsplash.com/random/1920x518/?Fashion`} alt="slide" className="w-100" />
                            </div>
                            <div className="image-slide">
                                <img src={`https://source.unsplash.com/random/1920x518/?fastfood`} alt="slide" className="w-100" />
                            </div>
                            <div className="image-slide">
                                <img src={`https://source.unsplash.com/random/1920x518/?samsung`} alt="slide" className="w-100" />
                            </div>
                            <div className="image-slide">
                                <img src={`https://source.unsplash.com/random/1920x518/?Furniture`} alt="slide" className="w-100" />
                            </div>
                            <div className="image-slide">
                                <img src={`https://source.unsplash.com/random/1920x518/?hp`} alt="slide" className="w-100" />
                            </div>
                            <div className="image-slide">
                                <img src={`https://source.unsplash.com/random/1920x518/?nike`} alt="slide" className="w-100" />
                            </div>
                        </Slider>
                        <div className="position-absolute"></div>
                    </div>
                    <div className="display-products">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12 col-md-3">
                                    <div className="search mt-4 p-3 me-3">
                                        <input type="text" className="form-control my-3 p-2" placeholder="type by" value={search} onChange={searchProduct} />
                                        <h4 className="my-4">Filter By</h4>
                                        <div className="brand-search">
                                            <h5 className="my-3">Category</h5>
                                            <NavLink to="" className="nav-link fw-bolder ms-3 my-2 text-capitalize">All</NavLink>
                                            {
                                                categories.map((category) => {
                                                    return <div className="ms-3 d-flex justify-content-center align-items-start flex-column" key={category._id}>
                                                        <NavLink to="product" className="nav-link fw-bolder fs-6 my-2 text-capitalize" onClick={() => sendSubcategory(category.product)}>{category.name}</NavLink>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-9">
                                    <div className="row">
                                        <Outlet> </Outlet>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment> : <LoadingScreen />
            }

        </div>
    )
}

export default Products
