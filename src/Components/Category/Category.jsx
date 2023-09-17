import Slider from "react-slick";
import { CategoryContext } from "../Context/CategoryContext/Category";
import { Fragment, useContext } from "react";
import "./Category.modules.scss";
import TypeWriterEffect from "react-typewriter-effect";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

const Category = () => {
    const { categories, sendProduct } = useContext(CategoryContext);
    let navigate = useNavigate()
    let advertisements = [{
        name: "supermarket",
        i: "fa-solid fa-handshake-angle",
        header: " Special Items",
    }, {
        name: "products",
        i: "fa-solid fa-gift",
        header: " Recommend Items",
    }, {
        name: "shopping",
        i: "fa-solid fa-bag-shopping",
        header: " Special Items",
    }, {
        name: "toys",
        i: "fa-solid fa-baby",
        header: "Enjoy with Toy",
    }, {
        name: "clothes",
        i: "fa-solid fa-vest",
        header: "Fashion Trends",
    }, {
        name: "mobile",
        i: "fa-solid fa-mobile-screen-button",
        header: " Smart Devices",
    }, {
        name: "Furniture",
        i: "fa-solid fa-couch",
        header: " 45% OFF",
    }, {
        name: "food",
        i: "fa-solid fa-mortar-pestle",
        header: "Yummy Meals",
    },
    ]
    var settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };
    return (
        <div className="category">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Category</title>
            </Helmet>
            {
                categories && categories.length > 0 ? <Fragment>
                    <div className="slider">
                        <h3 className="fw-bolder ms-4 mt-3 d-flex justify-content-start">
                            <span className="teal-color h1 me-2">Shop Popular Categories</span>
                            <span className="none">
                                <TypeWriterEffect
                                    textStyle={{
                                        fontFamily: "Red Hat Display",
                                        color: "#8c89a0",
                                    }}
                                    startDelay={2000}
                                    cursorColor="#8c89a0"
                                    multiText={[
                                        "Mobiles",
                                        "Electronics",
                                        "Men",
                                        "Women",
                                        "House",
                                        "Health",
                                        "Baby",
                                        "Subermarket"
                                    ]}
                                    multiTextDelay={1000}
                                    typeSpeed={30}
                                    multiTextLoop
                                />
                            </span>
                        </h3>
                        <Slider {...settings}>
                            {
                                categories.map((category) => {
                                    return <div key={category._id} className="text-center text-capitalize mb-5">
                                        <img src={category.image.secure_url} className="w-100 py-2 px-4 rounded-circle" height={220} alt="category" />
                                        <h6>{category.name}</h6>
                                    </div>
                                })
                            }
                        </Slider>
                    </div>
                    <div className="content-category text-capitalize my-5">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3 px-4">
                                    <h4 className="pt-4">Advertisements</h4>
                                    <div className="advertisements">
                                        {
                                            advertisements.map((adv, indx) => {
                                                return <Fragment key={indx} >
                                                    <div className="text-center p-3 main-bg text-white" >
                                                        <h5><i className={adv.i}></i> {adv.header}</h5>
                                                    </div>
                                                    <div className="overlay position-relative mb-3">
                                                        <img src={`https://source.unsplash.com/random/300x400/?${adv.name}`} className="w-100" alt="e-commerce" />
                                                        <div className="position-absolute text-center">
                                                            <div className="translate">
                                                                <h5 className="text-white mt-5">price start from {Math.floor(Math.random() * 1000)} EGP</h5>
                                                                <button className="btn btn-orange my-4" onClick={() => navigate("/products")}>shop now</button>
                                                                <p className="text-white">{adv.name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-md-9 pe-lg-5">
                                    <h4 className="py-4 fw-bolder">All Subcategories</h4>
                                    {
                                        categories.map((category) => {
                                            return <div key={category._id} className="my-5">
                                                <h4 className="shadow-lg sub-shadow p-4 bg-white">{category.name}</h4>
                                                <div className="shadow-lg d-flex justify-content-center align-items-center bg-white">

                                                    {
                                                        category.subcategory.map((sub) => {
                                                            return <Link to="/filterCategory" className="nav-link" key={sub._id} onClick={() => sendProduct(sub.product)} >
                                                                <img src={sub.image.secure_url} alt="subcategory" className="w-100" />
                                                                <p className="text-muted fw-bolder bg-white p-2">{sub.name}</p>
                                                            </Link>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </Fragment> : <LoadingScreen />
            }

        </div>
    )
}

export default Category
