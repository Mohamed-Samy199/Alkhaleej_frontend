import { Fragment, useContext, useState } from "react";
import { CategoryContext } from "../../Context/CategoryContext/Category";
import moment from "moment";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AllPayments = ({userData}) => {
    const { payments, t, language } = useContext(CategoryContext);
    const [products, setProducts] = useState([]);
    const [model, setModel] = useState(false);

    return (
        userData?.role === "Admin" ? (
            <div className="payments-page container mt-6 pt-3" dir={language === "ar" ? "rtl" : "ltr"}>
                {/*popup*/}
                <Modal size="lg" isOpen={model} toggle={() => setModel(!model)}>
                    <ModalHeader toggle={() => setModel(!model)}>
                        <i className="fa-solid fa-location-dot main-color fs-3"></i> {t("products")}
                    </ModalHeader>
                    <ModalBody>
                        <Row className="product-row">
                            {
                                products && products.map((product) => {
                                    return (
                                        <Col lg={6} sm={12} key={product._id}>
                                            <div className="p-2">
                                                <div>
                                                    <img src={product.mainImage.secure_url} alt="product pay" className="w-100" height={300} />
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h5>{product.name}</h5>
                                                    <h5>{product.finalPrice}</h5>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </ModalBody>
                </Modal>
                <h3 className="my-2">{t("Invoices Page")}</h3>
                <p className="text-muted mb-4">{t("List of Invoices Balances")}</p>
    
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">{t("Invoice Id")}</th>
                            <th scope="col">{t("Name")}</th>
                            <th scope="col">{t("Email")}</th>
                            <th scope="col">{t("Phone Number")}</th>
                            <th scope="col">{t("Cost")}</th>
                            <th scope="col">{t("Count")}</th>
                            <th scope="col">{t("Payment Type")}</th>
                            <th scope="col">{t("Date")}</th>
                        </tr>
                    </thead>
                    <tbody>
    
                        {
                            payments && payments.payments
                            && payments.payments.map((payment, index) => (
                                <Fragment key={index}>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{payment?.userId?.userName}</td>
                                        <td>{payment?.userId?.email}</td>
                                        <td>{payment.phone[0]}</td>
                                        <td><span className="text-secondary">{payment.finalPrice} EGP</span></td>
                                        <td onClick={() => {
                                            setProducts(payment.products)
                                            setModel(true)
                                        }} style={{ cursor: "pointer" }}>{payment.count} product</td>
                                        <td>{payment.paymentType}</td>
                                        <td>{moment(payment.createdAt).calendar()}</td>
                                    </tr>
                                </Fragment>
                            ))
                        }
                    </tbody>
                </table>
    
            </div>

        ) : null
    )
}

export default AllPayments
