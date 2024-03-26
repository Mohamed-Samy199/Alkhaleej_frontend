import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SameBrand.modules.scss";
import { useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import { baseUrl } from "../../Utils/baseUrl";

const SameBrand = () => {
    const { t , language } = useContext(CategoryContext);
    const [brands, setBrands] = useState([]);
    let { _id  } = useParams();
    const getSameBrand = async () => {
        let { data } = await axios.get(`${baseUrl}/brand/${_id}`);
        setBrands(data.brand);
    };

    useEffect(() => {
        getSameBrand();
    }, []);

    return (
        <div className="same-brand mt-6 pt-4">
            <div className="container">
                <div className="row">
                    {brands && brands.product &&
                        brands?.product?.map((brand) => {
                            return (
                                <div key={brand._id} className="col-sm-12 col-md-4 col-lg-3">
                                    <Link to={`/product/${brand._id}/${brand.name}`} className="nav-link">
                                        <div className="item shadow-lg d-flex justify-content-center align-items-center flex-column py-3 bg-white mx-1">
                                            <div className="image-prod image-size">
                                                <img
                                                    src={brand.mainImage.secure_url}
                                                    alt="product"
                                                    className="w-100 h-100"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <h5 className="my-3 main-color">{brand.name}</h5>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    
                                                    <h6 className="text-decoration-line-through">{brand.price === brand.finalPrice ? null : brand.price}</h6>
                                                    <div dir={language === "ar" ? "rtl" : "ltr"}>
                                                        <h4 className="mx-3">
                                                            {brand.finalPrice}
                                                            <span className="h6">{t("EGP")}</span>
                                                        </h4>
                                                    </div>
                                                    <p>{brand.discount !== 0 ? (`(${brand.discount}%)`) : null} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default SameBrand
