import { Fragment, useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import { Link } from "react-router-dom";
import logo from "../Assets/Alkhaleej.svg"
import cart from "../Assets/empty-cart.webp";
import "./Cart.modules.scss"
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const Cart = () => {
    const { cartProducts, removeCartItem, clearCartData, updateCartQuantity, userCartId, numOfCartItems, t, language } = useContext(CategoryContext);
    const notify = (msg, type) => toast[type](msg);

    const removeItemFromCart = async (prodId) => {
        await removeCartItem(prodId);
    };

    const clearCartItems = async (userId) => {
        await clearCartData(userId);
    };

    const handleIncreaseQuantity = async (item) => {
        await updateCartQuantity(item, "increase");
    };

    const handleDecreaseQuantity = async (item) => {
        await updateCartQuantity(item, "decrease");
    };


    return (
        <div className="cart">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Cart")}</title>
            </Helmet>
            <div className="container mt-6 px-4">
                <div className="row pt-4">
                    <div className="col-md-12 col-sm-6">
                        <div dir={language === "ar" ? "rtl" : "ltr"} className="frist-part d-flex justify-content-between align-items-center border-bottom border-1 border-dark pb-4">
                            <div className="items items-cart">
                                <header><h3 className="fw-bolder h2">{t("Shopping Cart")}</h3></header>
                                <img src={logo} alt="order" className="w-75" />

                            </div>
                            <div className="items ms-sm-5">
                                <div style={{ border: "1px solid #48BDCB" }} className="p-4" dir={language === "ar" ? "rtl" : "ltr"}>
                                    <h3 className="text-center my-3 fw-bolder">{t("Orders")}</h3>
                                    <h4>{t("Product")}: <span className="gray">{numOfCartItems} {t("items")}</span></h4>
                                    <h4>
                                        {t("Total Price")}:{" "}
                                        <span className="gray">{cartProducts && cartProducts.length > 0
                                            ? cartProducts.reduce((sum, prod) => {
                                                return sum + prod.productId.finalPrice * prod.quntity;
                                            }, 0)
                                            : "0"}{" "}
                                            {t("EGP")}</span>
                                    </h4>
                                    <div className="text-center">
                                        {
                                            cartProducts && cartProducts.length > 0 ? (
                                                <Link to="/" className="nav-link text-center my-4">
                                                    <button className="btn btn-orange">{t("CheackOut")}</button>
                                                </Link>
                                            ) : (
                                                <button disabled className="btn btn-orange">{t("CheackOut")}</button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {cartProducts && cartProducts.length > 0 ? (
                        cartProducts.map((prod) => (
                            <Fragment key={prod._id}>
                                <div dir={language === "ar" ? "rtl" : "ltr"} className="second-part d-flex justify-content-between align-items-center my-4 border-bottom border-1 border-dark pb-5">
                                    <div className="items d-flex justify-content-center align-items-center ">
                                        <img style={{ width: "120px" }} src={prod.productId.mainImage?.secure_url} alt="cart" />
                                        <div className="mx-5" dir={language === "ar" ? "rtl" : "ltr"}>
                                            <h4 className="text-capitalize">{t("Brand")}: {prod.productId.name}</h4>
                                            <h4>{t("Price")}: {prod.productId.finalPrice} {t("EGP")}</h4>
                                            <h5 className="text-danger mt-4" style={{ cursor: "pointer" }} onClick={() => removeItemFromCart(prod.productId)}>
                                                <i className="fa-solid fa-trash-can me-2"></i>
                                                {t("Remove")}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="items items-btn">
                                        <button className="btn btn-orange px-3"
                                            onClick={() => handleIncreaseQuantity(prod.productId._id)}
                                        >
                                            +
                                        </button>
                                        <span className="px-3">{prod.quntity}</span>
                                        <button className="btn btn-orange px-3"
                                            onClick={() => handleDecreaseQuantity(prod.productId._id)}
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    ) : (
                        <div>
                            <h3 className="fw-bolder text-center my-4">{t("Empty Cart")}</h3>
                            <img src={cart} alt="cart" className="w-100" />
                        </div>
                    )}

                    {
                        cartProducts && cartProducts.length > 0 ? (
                            <div className="items therd-part d-flex align-content-center justify-content-between">
                                {/*<div>
                                    <Link to="/payment">
                                        <button className="btn btn-orange me-4 mb-3">{t("Cash Payment")} <i className="fa-solid fa-money-bill-1-wave ps-1"></i></button>
                                    </Link>
                                    <Link to="/card">
                                        <button className="btn btn-orange me-2 mb-3">{t("Card Payment")} <i className="fa-regular fa-credit-card ps-1"></i></button>
                                    </Link>
                        </div>*/}
                                <div>
                                    <button className="btn btn-orange me-4 mb-3" onClick={() => notify("تواصل معانا من خلال ارقامنا الان", "success")}>{t("Payment")}</button>
                                </div>
                                <div className="d-flex">
                                    <h4 className="text-danger mt-4 d-flex" style={{ cursor: "pointer" }} onClick={() => clearCartItems(userCartId)}>
                                        <i className="fa-solid fa-trash-can me-2"></i>
                                        {t("Clear All")}
                                    </h4>
                                </div>
                            </div>
                        ) : (<p></p>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;