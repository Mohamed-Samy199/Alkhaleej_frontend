import Slider from "react-slick";
import h1 from "../Assets/home-1.png";
import h2 from "../Assets/home-2.png";
import h3 from "../Assets/home-3.png";
import h4 from "../Assets/home-4.png";
import home from "../Assets/home.png"
import './MainSlide.modules.scss';
import { useNavigate } from "react-router-dom";

const MainSlider = () => {
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
    return (
        <div>
            <div className="row ">
                <div className="col-md-6 col-sm-12 position-relative">
                    <div className="info">
                        <div className="details">
                            <h1>POCO Store</h1>
                            <h3>multi-purpose</h3>
                            <h3><span className="main-color">Shopify</span> theme</h3>
                            <p className="text-muted my-3 fs-5">An All-in-one template for your Shopify <br /> store to create different structures and <br />satisfy any specific requirements.</p>
                            <button className="btn btn-orange my-3" onClick={() => navigate('/products')} >Buy Poco</button>
                        </div>
                        <div className="part-left position-absolute">
                            <img src={home} alt="home" className="w-75 h-75" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 my-3 position-relative">
                    <div className="out-line-border shadow-lg m-3">
                        <Slider {...settings}>
                            <div>
                                <img src={h1} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h2} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h1} alt="home" className="w-100 h-100" />
                            </div>
                            <div>
                                <img src={h2} alt="home" className="w-100 h-100" />
                            </div>
                        </Slider>
                    </div>
                    <div className="shadow-lg border-phone position-absolute">
                        <Slider {...settings}>
                            <div>
                                <img src={h3} alt="home" className="rounded-3" />
                            </div>
                            <div>
                                <img src={h4} alt="home" className="rounded-3" />
                            </div>
                            <div>
                                <img src={h3} alt="home" className="rounded-3" />
                            </div>
                            <div>
                                <img src={h4} alt="home" className="rounded-3" />
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSlider
