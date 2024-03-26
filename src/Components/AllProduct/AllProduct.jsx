import { Fragment, useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import { Link } from "react-router-dom";
import $ from 'jquery';

const AllProduct = ({ userData }) => {
    const { nameFilterProducts, handeleDelete, language, t,
        addToWishlist, removeFromWishlist, getAllProduct, setProducts, getAllCategories, setCategories } = useContext(CategoryContext);

    // delete product
    const deleteProduct = async (id) => {
        await handeleDelete("product", id);
        getAllProduct('product', setProducts);
        getAllCategories('category', setCategories);
    };

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
        <Fragment>
            {nameFilterProducts() && nameFilterProducts()?.map((product) => {
                return <Fragment key={product._id}>
                    <div className="col-sm-6 col-lg-3 my-3 position-relative">
                        {
                            userData && userData.role === "Admin" ?
                                <Fragment>
                                    <div className="position-absolute delete-item" onClick={() => deleteProduct(product._id)}>
                                        <i className="fa-solid fa-trash-can text-danger fs-3"></i>
                                    </div>
                                </Fragment>
                                : null
                        }
                        {
                            userData && userData.role !== "Admin" ?
                                <Fragment>
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
                                </Fragment>
                                : null
                        }
                        <Link to={`/product/${product._id}/${product.name}`} className="nav-link mx-1">
                            <div className="item shadow-lg d-flex justify-content-center align-items-center flex-column py-3 bg-white">
                                <div className="image-prod image-size">
                                    <img src={product.mainImage.secure_url} alt="product" className="w-100 h-100" />
                                </div>
                                <div className="text-center">
                                    <h5 className="my-3 main-color">
                                        {product.translations[language] === "en" ? `${product.name}` : `${product.translations[language]}`}
                                    </h5>
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
        </Fragment>
    )
}

export default AllProduct;
