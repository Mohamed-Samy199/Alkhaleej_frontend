import { Link } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import wishlist from "../Assets/empty_wishlist.png";
import "./Wishlist.modules.scss";
import { Helmet } from "react-helmet";

const Wishlist = () => {
    const { wishlistProducts, products, t, language } = useContext(CategoryContext);

    const commonElements = wishlistProducts ? products?.filter((element) => wishlistProducts.includes(element._id)) : [];
    return (
        <div className="wishlist">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Wishlist")}</title>
            </Helmet>
            <div className="container mt-6">
                <div className="row pt-4" dir={language === "ar" ? "rtl" : "ltr"}>
                    <header>
                        <h3 className="border-bottom border-1 border-dark pb-4">
                            <i className="fa-solid fa-basket-shopping me-2 main-color"></i>
                            {t("Wishlist")}
                        </h3>
                    </header>
                    {
                        commonElements && commonElements.length > 0 ? (
                            commonElements.map((prod) => (
                                <div className="col-sm-12 col-md-4 col-lg-3 my-4" key={prod._id} >
                                    <Link to={`/product/${prod._id}`} className="nav-link mx-1">
                                        <div className="item shadow-lg bg-white d-flex justify-content-center align-items-center flex-column py-3">
                                            <div className="image-prod">
                                                <img src={prod.mainImage.secure_url} alt="wishlist" className="w-100" />
                                            </div>
                                            <div className="text-center">
                                                <h5 className="my-3 main-color">
                                                    {prod.translations[language] === "en" ? `${prod.name}` : `${prod.translations[language]}`}
                                                </h5>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h6 className="text-decoration-line-through">{prod.price === prod.finalPrice ? null : prod.price}</h6>
                                                    <h4 className="mx-3">
                                                        {prod.finalPrice}
                                                        <span className="h6">{t("EGP")}</span>
                                                    </h4>
                                                    <p>({prod.discount})%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div style={{ height: "80vh" }} className="d-flex justify-content-start align-items-center flex-column">
                                <h3 className="fw-bolder text-center my-4">Empty Wishlist</h3>
                                <img src={wishlist} alt="cart" className="w-25" />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Wishlist;