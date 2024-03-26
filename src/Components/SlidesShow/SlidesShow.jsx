import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { CategoryContext } from "../Context/CategoryContext/Category";

const SlidesShow = () => {
    const [slidesToShow, setSlidesToShow] = useState(6);
    const { categories, language } = useContext(CategoryContext);

    useEffect(() => {
        const updateSlidesToShow = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 567) {
                setSlidesToShow(2);
            } else if (screenWidth < 992) {
                setSlidesToShow(4);
            } else {
                setSlidesToShow(6);
            }
        };

        updateSlidesToShow();
        window.addEventListener("resize", updateSlidesToShow);

        return () => {
            window.removeEventListener("resize", updateSlidesToShow);
        };
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    return (
        <div>
            <Slider {...settings}>
                {
                    categories && categories.length > 0 && categories.map((category) => {
                        return <div key={category._id} className="text-center text-capitalize alkhaleej">
                            <img src={category.image.secure_url} className="w-100 py-2 px-4" height={220} alt="category Alkhaleej" loading="lazy" />
                            <h6>{category?.translations[language] === "en" ? `${category.name}` : `${category.translations[language]}`}</h6>
                        </div>
                    })
                }
            </Slider>
        </div>
    );
};

export default SlidesShow;
