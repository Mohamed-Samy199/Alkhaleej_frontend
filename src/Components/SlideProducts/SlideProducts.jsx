import Slider from "react-slick";
import h1 from "../Assets/ph-4.webp";
import h2 from "../Assets/ph-2.webp";
import h3 from "../Assets/ph-3.webp";
import h6 from "../Assets/ph-6.webp";
import "./SlideProduct.modules.scss";
import { useEffect } from "react";

const SlideProducts = () => {
    var settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        dots: true,
    };

    useEffect(() => {
        // Preload the images
        const images = [h1, h2, h3];
        images.forEach((image) => {
            new Image().src = image;
        });
    }, []);

    return (
        <div className="slide-product" >
            <Slider {...settings}>
                <div className="slide-item w-100 h-100">
                    <img src={h1} alt="slide" className="w-100" />
                </div>
                <div className="slide-item w-100 h-100">
                    <img src={h2} alt="slide" className="w-100" />
                </div>
                <div className="slide-item w-100 h-100">
                    <img src={h3} alt="slide" className="w-100" />
                </div>
                <div className="slide-item w-100 h-100">
                    <img src={h6} alt="slide" className="w-100" />
                </div>
            </Slider>
        </div>
    );
};

export default SlideProducts;
