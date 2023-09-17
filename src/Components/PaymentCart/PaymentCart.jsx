import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';

const PaymentCart = () => {
    const [loading, setLoading] = useState(false);
    const validationSchema = Yup.object({
        address: Yup.string().required(),
        phone: Yup.number().min(10, "Must be more than 10 characters").required(),
        city: Yup.string().required(),
    });

    const notify = (msg, type) => toast[type](msg);
    const url = "http://localhost:5000/order/card";
    const navigate = useNavigate();
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "authorization": `Muhammad__${localStorage.getItem("token")}`
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(url, values, { headers });
            if (response.status === 201) {
                toast.success('Product Added to Payment Successfully', { duration: 2000, className: " text-white" });
                window.open(response.data.url);
            }
        } catch (error) {
            if (error.response.status === 400 || error.response.status === 500) {
                setLoading(false);
                notify(error.response.data.message, 'error');
                navigate('/');
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            address: '',
            phone: '',
            city: '',
            paymentType: 'card'
        },
        validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div className="payment-cash">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Card</title>
            </Helmet>
            <div className="w-50 my-5 mx-auto">
                <h2 className="mb-4">Shipping Address card</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="address">Details</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control my-3"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.address && formik.touched.address && (
                        <div className="alert alert-danger">
                            {formik.errors.address}
                        </div>
                    )}

                    <label htmlFor="phone">Phone</label>
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        className="form-control my-3"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.phone && formik.touched.phone && (
                        <div className="alert alert-danger">
                            {formik.errors.phone}
                        </div>
                    )}

                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control my-3"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.city && formik.touched.city && (
                        <div className="alert alert-danger">
                            {formik.errors.city}
                        </div>
                    )}

                    <label htmlFor="paymentType" className="d-none">Card</label>
                    <input
                        type="text"
                        id="paymentType"
                        name="paymentType"
                        className="form-control my-3 d-none"
                        value="card"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.card && formik.touched.card && (
                        <div className="alert alert-danger">
                            {formik.errors.card}
                        </div>
                    )}

                    <button
                        disabled={!(formik.dirty && formik.isValid && !loading)}
                        className="btn btn-orange"
                    >
                        {!loading ? "Card Payment" : <i className="fas fa-spinner fa-spin"></i>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentCart;