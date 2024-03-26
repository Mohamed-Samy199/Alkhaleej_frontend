import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { baseUrl } from "../../Utils/baseUrl";
import { CategoryContext } from "../Context/CategoryContext/Category";

const Payment = () => {
    const { t, language, getCartProduct } = useContext(CategoryContext);

    const [loading, setLoading] = useState(false);
    let validationSchema = Yup.object({
        address: Yup.string().required(),
        // phone: Yup.number().matches(/^(010|011|012|015)[0-9]{8}$/, 'phone must match the pattern').required(),
        phone: Yup.number().min(10, "Must be more than 10 characters").required(),
        city: Yup.string().required(),

    })
    const notify = (msg, type) => toast[type](msg);
    const url = `${baseUrl}/order`;
    let navigate = useNavigate();
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "authorization": `Muhammad__${localStorage.getItem("token")}`
    }

    let registerFormik = useFormik({
        initialValues: {
            address: '',
            phone: '',
            city: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                let data = await axios.post(url, values, {
                    headers
                })
                if (data.status === 201) {
                    toast.success('Product Added to Payment Successfully', { duration: 2000, className: " text-white" });
                    getCartProduct();
                    navigate('/orders');
                }
            } catch (error) {
                if (error.response.status == 400 || error.response.status == 500) {
                    setLoading(false)
                    notify(error.response.data.message, 'error')
                    navigate('/');
                }
            }
        }
    })
    return (
        <div className="payment-cash mt-6">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Cash")}</title>
            </Helmet>
            <div className="w-50 mx-auto pt-3" style={{ marginTop: "8rem" }} dir={language === "ar" ? "rtl" : "ltr"}>
                <h2 className="mb-4">{t("Shipping Address")}</h2>
                <form onSubmit={registerFormik.handleSubmit}>
                    <label htmlFor="address">{t("Details")}</label>
                    <input type="text" value={registerFormik.values.address}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="address" name="address" className="form-control my-3" />
                    {
                        registerFormik.errors.address && registerFormik.touched.address ? <div className="alert alert-danger">
                            {registerFormik.errors.address}
                        </div> : ''
                    }

                    <label htmlFor="phone">{t("Phone")}</label>
                    <input type="number" value={registerFormik.values.phone}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="phone" name="phone" className="form-control my-3" />
                    {
                        registerFormik.errors.phone && registerFormik.touched.phone ? <div className="alert alert-danger">
                            {registerFormik.errors.phone}
                        </div> : ''
                    }

                    <label htmlFor="city">{t("City")}</label>
                    <input type="text" value={registerFormik.values.city}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="city" name="city" className="form-control my-3" />
                    {
                        registerFormik.errors.city && registerFormik.touched.city ? <div className="alert alert-danger">
                            {registerFormik.errors.city}
                        </div> : ''
                    }

                    {/*<div disabled={!(registerFormik.dirty && registerFormik.isValid && !loading)} className="btn btn-orange" type="submit">
                        {!loading ? `${t("Cash Payment")}` : <i className="fas fa-spinner fa-spin"></i>}
                </div>*/}
                </form>
            </div>
        </div>
    )
}

export default Payment
