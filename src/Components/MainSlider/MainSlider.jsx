import Slider from "react-slick";
import h1 from "../Assets/p-1.webp";
import h2 from "../Assets/p-2.webp";
import h3 from "../Assets/p-3.webp";
import './MainSlide.modules.scss';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";

const MainSlider = () => {
    const { t, navPosition, language } = useContext(CategoryContext);
    let navigate = useNavigate()
    var settings = {
        adaptiveHeight: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };
    // useEffect(() => {
    //     // Preload the images
    //     const images = [h1, h2, h3];
    //     images.forEach((image) => {
    //         new Image().src = image;
    //     });
    // }, []);

    return (
        <div className="main-slider mt-6">
            <div className="row ">
                <div className={`col-md-6 col-sm-12 position-relative d-flex justify-content-center align-items-center ${navPosition === "right" ? "" : "order-sm-2"}`}>
                    <div className="info">
                        <div className={`${navPosition === "right" ? "details" : "details-ar"}`} dir={language === "ar" ? "rtl" : "ltr"} >
                            <h1>{t("Alkhaleej")}</h1>
                            <div dir={language === "ar" ? "rtl" : "ltr"}>
                                <h3><span className="main-color">{t("Alkhaleejj")}</span> {t("multi-purpose")}</h3>
                            </div>
                            <p className="text-muted my-3 fs-5 fs-small">{t("best-salary")} <br /> {t("best-tool")} <br />{t("best-connect")}</p>
                            <button className="btn btn-orange mt-3 mb-5" onClick={() => navigate('/products')} >{t("buy")}</button>
                        </div>
                        <div className={`part-left w-75 ${navPosition === "right" ? "main-rotate" : "rotate-image"}`} style={{ zIndex: "-100" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#48BDCB" d="M0,64L40,106.7C80,149,160,235,240,266.7C320,299,400,277,480,240C560,203,640,149,720,149.3C800,149,880,203,960,192C1040,181,1120,107,1200,64C1280,21,1360,11,1400,5.3L1440,0L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className={`col-md-6 col-sm-12 px-2 my-3 screan position-relative ${navPosition === "right" ? "order-sm-2" : ""}`}>
                    <div className="out-line-border shadow-lg m-3 screan-slider">
                        <Slider {...settings}>
                            <div>
                                <img src={h1} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h2} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h3} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h1} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h2} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h3} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h1} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h2} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h3} alt="home" className="w-100 h-100" />
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSlider
