import { Fragment, useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.svg"
import cart from "../Assets/empty-cart.webp"
import { useState } from "react";
import "./Cart.modules.scss"
import { Helmet } from "react-helmet";

const Cart = () => {
    const { cartProducts, setCartProducts, removeCartItem, clearCartData, userCartId, numOfCartItems } = useContext(CategoryContext);

    const removeItemFromCart = async (prodId) => {
        await removeCartItem(prodId);
    };

    const clearCartItems = async (userId) => {
        await clearCartData(userId);
    };

    const increaseProd = (item) => {
        let exist = cartProducts.find((prod) => prod._id === item);
        if (exist) {
            let cart = cartProducts.map((prod) =>
                prod._id === item ? { ...exist, quntity: exist.quntity + 1 } : prod
            );
            setCartProducts(cart);
        } else {
            setCartProducts(cartProducts);
        }
    };

    let time = new Date().toLocaleTimeString();
    const [currentTime, setCurrentTime] = useState(time)
    const updatedTime = () => {
        let time = new Date().toLocaleTimeString()
        setCurrentTime(time)
    }
    setInterval(updatedTime, 1000)

    const decreaseProd = (item) => {
        let exist = cartProducts.find((prod) => prod._id === item);
        if (exist && exist.quntity > 1) {
            let cart = cartProducts.map((prod) =>
                prod._id === item ? { ...exist, quntity: exist.quntity - 1 } : prod
            );
            setCartProducts(cart);
        } else {
            setCartProducts(cartProducts);
        }
    };

    return (
        <div className="cart my-5">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-6">
                        <div className="frist-part d-flex justify-content-between flex-wrap align-items-center border-bottom border-1 border-dark pb-4">
                            <div className="items">
                                <h3 className="fw-bolder mb-3 h2">Shopping Cart</h3>
                                <img src={logo} alt="order" className="w-100" />
                                <div className='screen my-4 text-center'>
                                    <h3 className='py-2 clock'>{currentTime}</h3>
                                </div>
                            </div>
                            <div className="items ms-sm-5">
                                <div style={{ border: "1px solid #ff8503" }} className="p-4">
                                    <h3 className="text-center my-3 fw-bolder">Orders</h3>
                                    <h4>Product <span className="gray">{numOfCartItems} items</span></h4>
                                    <h4>
                                        Total Price:{" "}
                                        <span className="gray">{cartProducts && cartProducts.length > 0
                                            ? cartProducts.reduce((sum, prod) => {
                                                return sum + prod.productId.finalPrice * prod.quntity;
                                            }, 0)
                                            : "0"}{" "}
                                            EGP</span>
                                    </h4>
                                    {
                                        cartProducts && cartProducts.length > 0 ? (
                                            <Link to="/payment" className="nav-link text-center my-4">
                                                <button className="btn btn-orange">CheackOut</button>
                                            </Link>
                                        ) : (
                                            <button disabled className="btn btn-orange">CheackOut</button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {cartProducts && cartProducts.length > 0 ? (
                        cartProducts.map((prod) => (
                            <Fragment key={prod._id}>
                                <div className="second-part d-flex justify-content-between align-items-center my-4 border-bottom border-1 border-dark pb-5">
                                    <div className="items d-flex justify-content-center align-items-center ">
                                        <img style={{ width: "120px" }} src={prod.productId.mainImage.secure_url} alt="cart" />
                                        <div className="ms-5">
                                            <h4 className="text-capitalize">Brand: {prod.productId.name}</h4>
                                            <h4>Price: {prod.productId.finalPrice} EGP</h4>
                                            <h5 className="text-danger mt-4" style={{ cursor: "pointer" }} onClick={() => removeItemFromCart(prod.productId)}>
                                                <i className="fa-solid fa-trash-can me-2"></i>
                                                Remove
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="items">
                                        <button className="btn btn-orange px-3" onClick={() => increaseProd(prod._id)}>
                                            +
                                        </button>
                                        <span className="px-3">{prod.quntity}</span>
                                        <button className="btn btn-orange px-3" onClick={() => decreaseProd(prod._id)}>
                                            -
                                        </button>
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    ) : (
                        <div>
                            <h3 className="fw-bolder text-center my-4">Empty Cart</h3>
                            <img src={cart} alt="cart" className="w-100" />
                        </div>
                    )}

                    {
                        cartProducts && cartProducts.length > 0 ? (
                            <div className="items therd-part d-flex align-content-center justify-content-between">
                                <div>
                                    <Link to="/payment">
                                        <button className="btn btn-orange me-4 mb-3">Cash Payment <i className="fa-solid fa-money-bill-1-wave ps-1"></i></button>
                                    </Link>
                                    <Link to="/card">
                                        <button className="btn btn-orange me-2 mb-3">Card Payment <i className="fa-regular fa-credit-card ps-1"></i></button>
                                    </Link>
                                </div>
                                <div>
                                    <h4 className="text-danger mt-4" style={{ cursor: "pointer" }} onClick={() => clearCartItems(userCartId)}>
                                        <i className="fa-solid fa-trash-can me-2"></i>
                                        Clear All
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