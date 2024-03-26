import { Fragment, useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import "./SearchAndDisplayProd.modules.scss";
import { Link } from "react-router-dom";
import $ from 'jquery';

const SearchAndDisplayProd = () => {
    const { nameFilterProducts, searchProduct, search, language, t, addToWishlist, removeFromWishlist } = useContext(CategoryContext);

    const addToWishlistById = async (id) => {
        await addToWishlist(id);
        $(`#addWishlist${id}`).fadeOut(100);
        $(`#delWishlist${id}`).fadeIn(500);
    }
    const deleteFromWishlist = async (id) => {
        await removeFromWishlist(id);
        $(`#delWishlist${id}`).fadeOut(100);
        $(`#addWishlist${id}`).fadeIn(100);
    }

    return (
        <div className="container-fluid search-display mt-4">
            <div className="row">
                <div>
                    <input
                        type="text"
                        className="form-control mb-4 pb-2 w-75 m-auto"
                        dir={language === "ar" ? "rtl" : "ltr"}
                        placeholder={`${t("type by")}`}
                        value={search}
                        onChange={searchProduct} />
                </div>
                {nameFilterProducts() && nameFilterProducts()?.map((product) => {
                    return <Fragment key={product._id}>
                        <div className="col-sm-12 col-md-4 col-lg-3 my-2 position-relative">
                            <i className="fa-regular fa-heart position-absolute"
                                id={`addWishlist${product._id}`}
                                onClick={() => addToWishlistById(product._id)}
                                style={{
                                    top: "25px",
                                    color: "#fff",
                                    padding: "10px",
                                    right: "25px",
                                    background: "#48BDCB",
                                    fontSize: "25px"
                                }}>
                            </i>
                            <i className="fa-solid fa-heart position-absolute"
                                id={`delWishlist${product._id}`}
                                onClick={() => deleteFromWishlist(product._id)}
                                style={{
                                    display: "none",
                                    top: "25px",
                                    color: "#fff",
                                    padding: "10px",
                                    right: "25px",
                                    background: "#48BDCB",
                                    fontSize: "25px"
                                }}>
                            </i>
                            <Link to={`/product/${product._id}/${product.name}`} className="nav-link p-3">
                                <div className="item shadow-lg d-flex justify-content-center align-items-center flex-column bg-white py-3">
                                    <div className="image-prod image-size">
                                        <img src={product.mainImage.secure_url} alt="product" className="w-100 h-100" />
                                    </div>
                                    <div className="text-center">
                                        <h5 className="my-3 main-color">{product.translations && product.translations[language] !== "en"
                                            ? product.translations[language]
                                            : product.name}</h5>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="text-decoration-line-through">{product.price === product.finalPrice ? null : product.price}</h6>
                                            <div dir={language === "ar" ? "rtl" : "ltr"}>
                                                <h4 className="mx-3">{product.finalPrice}<span className="h6">{t("EGP")}</span></h4>
                                            </div>
                                            <p>{product.discount !== 0 ? (`(${product.discount}%)`) : null} </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Fragment>
                })
                }
            </div>
        </div>
    )
}

export default SearchAndDisplayProd;
