import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import empty from "../Assets/photo.jpg";
import { Helmet } from "react-helmet";
import { baseUrl } from "../../Utils/baseUrl";
import { CategoryContext } from "../Context/CategoryContext/Category";

const Orders = () => {
    const { t , language , getCartProduct } = useContext(CategoryContext);
    const [orderProd, setOrderProd] = useState(null);
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "authorization": `Muhammad__${localStorage.getItem("token")}`
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let { data } = await axios.get(`${baseUrl}/order/user`, {
                    headers
                });
                setOrderProd(data.order.order);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrders();
    }, []);
    return (
        <div className="orders mb-2 mt-6 pt-5">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Orders")}</title>
            </Helmet>
            <div className="container-fluid px-4">
                <div className="row" dir={language === "ar" ? "rtl" : "ltr"}>
                    {orderProd && orderProd.length > 0 ? (
                        orderProd.map((order) => (
                            <div className="col-sm-12 col-md-6 col-lg-4" style={{ border: "1px solid #48BDCB" }} key={order._id}>
                                <div className="d-flex justify-content-between align-items-center flex-wrap  mx-4">
                                    {order.products && order.products.length > 0 && (
                                        <>
                                            {order.products.map((product) => (
                                                <div key={product._id}>
                                                    <Fragment className="my-3">
                                                        <div style={{ width: "150px" }}>
                                                            <img src={product.mainImage.secure_url} alt="order" className="w-100 mt-3" />
                                                        </div>
                                                        <h5 className="text-capitalize">{t("brand name")}: <span className="main-color text-capitalize">{product.name}</span></h5>
                                                        <h5>{t("Price")}: <span className="main-color">{product.finalPrice} {t("EGP")}</span></h5>
                                                    </Fragment>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                                <div className="my-4 px-4">
                                    <h5>{t("Num Of Items")}: <span className="main-color">{order.count}</span></h5>
                                    <h4>{t("Total Price")}: <span className="main-color mt-3">{order.finalPrice} {t("EGP")}</span></h4>
                                    <h4>{t("Payment Method")}: <span className="main-color text-capitalize">{order.paymentType}</span></h4>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-75 my-4 mx-auto text-center">
                            <h3 className="text-capitalize fw-bolder mb-3">{t("No Orders Found Yet!")}</h3>
                            <img src={empty} alt="empty" className="w-50" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;