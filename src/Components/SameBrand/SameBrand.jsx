import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SameBrand.modules.scss";

const SameBrand = () => {
    const [brands, setBrands] = useState([]);
    let { _id } = useParams();
    const getSameBrand = async () => {
        let { data } = await axios.get(`http://localhost:5000/brand/${_id}`);
        setBrands(data.brand);
    };

    useEffect(() => {
        getSameBrand();
    }, []);

    return (
        <div className="same-brand my-5">
            <div className="container">
                <div className="row">
                    {brands.product &&
                        brands.product.map((brand) => {
                            return (
                                <div key={brand._id} className="col-sm-12 col-md-4 col-lg-3">
                                    <Link to={`/product/${brand._id}`} className="nav-link">
                                        <div className="item shadow-lg d-flex justify-content-center align-items-center flex-column py-3 bg-white mx-1">
                                            <div className="image-prod">
                                                <img
                                                    src={brand.mainImage.secure_url}
                                                    alt="product"
                                                    className="w-100"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <h5 className="my-3 main-color">{brand.name}</h5>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h6 className="text-decoration-line-through">
                                                        {brand.price}
                                                    </h6>
                                                    <h4 className="mx-3">
                                                        {brand.finalPrice}
                                                        <span className="h6">EGP</span>
                                                    </h4>
                                                    <p>({brand.discount}%)</p>
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
