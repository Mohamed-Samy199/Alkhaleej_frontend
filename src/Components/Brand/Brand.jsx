import { Fragment, useContext, useState } from "react";
import Slider from "react-slick";
import { CategoryContext } from "../Context/CategoryContext/Category";
import CountUp from "react-countup";
import "./Brand.modules.scss";
import ScrollTrigger from "react-scroll-trigger";
import { Link } from "react-router-dom";
import TypeWriterEffect from "react-typewriter-effect";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const Brand = ({ userData }) => {
    const { brands, handeleDelete, language, t, setBrands, getAllBrand, setCategories, getAllCategories, navPosition } = useContext(CategoryContext);
    const [slidesToShow, setSlidesToShow] = useState(6);
    const [counterOn, setCounterOn] = useState(false);

    useEffect(() => {
        const updateSlidesToShow = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 567) {
                setSlidesToShow(2);
            } else if (screenWidth < 992) {
                setSlidesToShow(4);
            }
            else {
                setSlidesToShow(6);
            }
        };

        updateSlidesToShow();

        window.addEventListener("resize", updateSlidesToShow);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", updateSlidesToShow);
        };
    }, []);

    var settings = {
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };
    const deleteBrand = async (id) => {
        await handeleDelete("brand", id);
        getAllBrand('brand', setBrands);
        getAllCategories('category', setCategories)

    };
    return (
        <div className="brands">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Brands")}</title>
                <meta name="content" content="نقدم مجموعة واسعة ومتنوعة من العدد اليدوية بأعلى مستويات الجودة والتي تشمل ماركات مثل بوش، كينج توني، يونيور، انجكو، توتال، اي بي تي ، استانلي  وغيرها العديد من الماركات الرائدة في هذا المجال" />
                <meta name="keywords" content="brand, alkhaleej brand, براند, براند الخليج" />
            </Helmet>
            {
                brands && brands?.length > 0 ? <Fragment>
                    <div className="slider pt-1 mt-6">
                        <header>
                            <h3 className="fw-bolder type-word mx-2 mt-4 d-flex justify-content-start " dir={language === "ar" ? "rtl" : "ltr"}>
                                <span className="teal-color h1 mx-2 ">{t("Top Brand")}</span>
                                <TypeWriterEffect
                                    textStyle={{
                                        fontFamily: "Red Hat Display",
                                        color: "#8c89a0",
                                    }}
                                    startDelay={2000}
                                    cursorColor="#8c89a0"
                                    multiText={brands && brands.map(brand => brand.translations[language] === "en" ? brand.name : brand.translations[language])}
                                    multiTextDelay={1500}
                                    typeSpeed={30}
                                    multiTextLoop
                                />
                            </h3>
                        </header>
                        <Slider {...settings}>
                            {
                                brands && brands.length && brands.map((brand) => {
                                    return <div key={brand._id} className="text-center text-capitalize mb-5">
                                        <img src={brand.image.secure_url} className="w-100 py-2 px-4" alt="brand" style={{ height: "110px", width: "133px" }} />
                                        <h6>{brand.translations[language] === "en" ? `${brand.name}` : `${brand.translations[language]}`}</h6>
                                    </div>
                                })
                            }
                        </Slider>
                    </div>

                    <div className="banner-one">
                        <ScrollTrigger
                            onEnter={() => setCounterOn(true)}
                            onExit={() => setCounterOn(false)}
                        ></ScrollTrigger>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-6 p-2">
                                    <div className="item text-center p-3">
                                        <p className="text-white">{t("Strongest Discounts")}</p>
                                        {
                                            language === "en" ?
                                                (<h5>up to <span className="text-white h1">{counterOn && (
                                                    <CountUp start={0} end={25} duration={4} delay={0} />
                                                )}%</span> off</h5>) :
                                                (<h5>خصم يصل الي
                                                    <span className="text-white h1">%{counterOn && (
                                                        <CountUp start={0} end={25} duration={4} delay={0} />
                                                    )}</span></h5>)
                                        }
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 p-2">
                                    <div className="item text-center p-3">
                                        <p className="text-white">{t("Verify Brands")}</p>
                                        {
                                            language === "en" ? (
                                                <h5>more then <span className="text-white h1">{counterOn && (
                                                    <CountUp start={0} end={60} duration={4} delay={0} />
                                                )}</span> brand</h5>
                                            ) : (
                                                <h5>اكثر من <span className="text-white h1">{counterOn && (
                                                    <CountUp start={0} end={60} duration={4} delay={0} />
                                                )}</span> علامة تجارية</h5>
                                            )
                                        }

                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 p-2">
                                    <div className="item text-center p-3">
                                        <p className="text-white">{t("Speed of Delivery")}</p>
                                        {
                                            language === "en" ? (
                                                <h5>down to <span className="text-white h1">{counterOn && (
                                                    <CountUp start={0} end={48} duration={4} delay={0} />
                                                )}</span> h</h5>
                                            ) : (
                                                <h5>اقل من <span className="text-white h1">{counterOn && (
                                                    <CountUp start={0} end={48} duration={4} delay={0} />
                                                )}</span> ساعة</h5>
                                            )
                                        }

                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 p-2">
                                    <div className="item text-center p-3">
                                        <p className="text-white">{t("All The Time")}</p>
                                        {
                                            language === "en" ? (
                                                <h5>found all <span className="text-white h1">{counterOn && (
                                                    <CountUp start={0} end={24} duration={4} delay={0} />
                                                )}</span>h</h5>
                                            ) : (
                                                <h5>متواجدون  <span className="text-white h1">{counterOn && (
                                                    <CountUp start={0} end={24} duration={4} delay={0} />
                                                )}</span>ساعة</h5>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="display-brand">
                        <div className="container my-3">
                            <div className="row">
                                {
                                    brands && brands.map((brand) => {
                                        return <div className="col-sm-12 col-md-6 col-lg-2 position-relative text-center brand-item text-capitalize" key={brand._id}>
                                            {
                                                userData && userData.role === "Admin" ?
                                                    <Fragment>
                                                        <div className="position-absolute delete-item" onClick={() => deleteBrand(brand._id)}>
                                                            <i className="fa-solid fa-trash-can text-danger fs-3"></i>
                                                        </div>
                                                    </Fragment>
                                                    : null
                                            }
                                            <Link to={`/brand/${brand._id}`} className="m-2 py-2 nav-link bg-white overflow-hidden">
                                                <img src={brand.image.secure_url} width={150} height={120} alt="brand" />
                                                <h5 className="py-1">{brand.translations[language] === "en" ? `${brand.name}` : `${brand.translations[language]}`}</h5>
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
