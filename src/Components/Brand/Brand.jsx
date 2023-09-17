import { Fragment, useContext, useState } from "react";
import Slider from "react-slick";
import { CategoryContext } from "../Context/CategoryContext/Category";
import man from "../Assets/man.webp"
import wommen from "../Assets/wommen.webp"
import hair from "../Assets/mesht.webp";
import food from "../Assets/food.webp"
import CountUp from "react-countup";
import "./Brand.modules.scss";
import ScrollTrigger from "react-scroll-trigger";
import { Link } from "react-router-dom";
import TypeWriterEffect from "react-typewriter-effect";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";

const Brand = () => {
    const { brands } = useContext(CategoryContext);
    const [counterOn, setCounterOn] = useState(false);
    var settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };
    return (
        <div className="brands">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Brand</title>
            </Helmet>
            {
                brands && brands.length > 0 ? <Fragment>
                    <div className="slider">
                        <h3 className="fw-bolder ms-4 mt-3 d-flex justify-content-start ">
                            <span className="teal-color h1 me-2">Top Brand</span>
                            <TypeWriterEffect
                                textStyle={{
                                    fontFamily: "Red Hat Display",
                                    color: "#8c89a0",
                                }}
                                startDelay={2000}
                                cursorColor="#8c89a0"
                                multiText={[
                                    "Oppo",
                                    "Samsung",
                                    "Apple",
                                    "Lg",
                                    "Sony",
                                    "Hp",
                                    "Dell",
                                    "Nike",
                                    "Adidas",
                                    "Puma",
                                    "Tornado",
                                    "Toshiba",
                                    "Fresh",
                                    "L'oreal",
                                    "Garnier",
                                    "Braun",
                                    "Pampers",
                                    "Baby Joy",
                                    "Joie",
                                    "Oxi",
                                    "Lipton",
                                    "Abu Auf",
                                    "Huawei"
                                ]}
                                multiTextDelay={1500}
                                typeSpeed={30}
                                multiTextLoop
                            />
                        </h3>
                        <Slider {...settings}>
                            {
                                brands && brands.length && brands.slice(3, 12).map((brand) => {
                                    return <div key={brand._id} className="text-center text-capitalize mb-5">
                                        <img src={brand.image.secure_url} className="w-100 py-2 px-4" alt="brand" />
                                        <h6>{brand.name}</h6>
                                    </div>
                                })
                            }
                        </Slider>
                    </div>

                    <div className="banner-one my-5">
                        <ScrollTrigger
                            onEnter={() => setCounterOn(true)}
                            onExit={() => setCounterOn(false)}
                        ></ScrollTrigger>
                        <div className="container">
                            <div className="row flex-nowrap">
                                <div className="col-md-3 d-flex justify-content-center align-items-center flex-wrap me-3 my-2">
                                    <div className="image-banner me-2">
                                        <img src={man} alt="brand" />
                                    </div>
                                    <div className="detail-banner p-2">
                                        <p className="text-white fs-5">free shopping</p>
                                        <h3 className="fw-bolder">Best Quality</h3>
                                        <h5>up to <span className="text-white h1">
                                            {counterOn && (
                                                <CountUp start={0} end={30} duration={4} delay={0} />
                                            )}%</span> off</h5>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-between align-items-center me-3  my-2">
                                    <div className="image-banner mx-2">
                                        <img src={hair} alt="brand" />
                                    </div>
                                    <div className="detail-banner p-2">
                                        <p className="text-white fs-5">free shopping</p>
                                        <h3 className="fw-bolder">Strongest Discounts</h3>
                                        <h5>up to <span className="text-white h1">{counterOn && (
                                            <CountUp start={0} end={25} duration={4} delay={0} />
                                        )}%</span> off</h5>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center align-items-center me-3 my-2">
                                    <div className="image-banner me-2">
                                        <img src={wommen} alt="brand" />
                                    </div>
                                    <div className="detail-banner p-2">
                                        <p className="text-white fs-5">free shopping</p>
                                        <h3 className="fw-bolder">Ease Of Purchase</h3>
                                        <h5>offer to <span className="text-white h1">{counterOn && (
                                            <CountUp start={0} end={38} duration={4} delay={0} />
                                        )}%</span></h5>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center align-items-center my-2">
                                    <div className="image-banner me-2">
                                        <img src={food} alt="brand" />
                                    </div>
                                    <div className="detail-banner p-2">
                                        <p className="text-white fs-5">free shopping</p>
                                        <h3 className="fw-bolder">All The Time</h3>
                                        <h5>found all <span className="text-white h1">{counterOn && (
                                            <CountUp start={0} end={24} duration={4} delay={0} />
                                        )}h</span></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="display-brand">
                        <div className="container my-5">
                            <div className="row">
                                {
                                    brands && brands.map((brand) => {
                                        return <div className="col-sm-12 col-md-6 col-lg-3 text-center brand-item text-capitalize" key={brand._id}>
                                            <Link to={`/brand/${brand._id}`} className="m-2 nav-link bg-white">
                                                <img src={brand.image.secure_url} alt="brand" />
                                                <h5>{brand.name}</h5>
                                            </Link>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Fragment> : <LoadingScreen />
            }
        </div>
    )
}

export default Brand
