import Slider from "react-slick";
import h1 from "../Assets/sl-1.jpg";
import h2 from "../Assets/sl-2.jpg";
import h3 from "../Assets/sl-3.jpg";
import "./SlideProduct.modules.scss";

const SlideProducts = () => {
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
        <div className="slide-product container my-5">
            <Slider {...settings}>
                <div className="slide-item">
                    <img src={h1} alt="slide" className="w-100" />
                </div>
                <div className="slide-item">
                    <img src={h2} alt="slide" className="w-100" />
                </div>
                <div className="slide-item">
                    <img src={h3} alt="slide" className="w-100" />
                </div>
            </Slider>
        </div>
    )
}

export default SlideProducts
