import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    let validationSchema = Yup.object({
        address: Yup.string().required(),
        // phone: Yup.number().matches(/^(010|011|012|015)[0-9]{8}$/, 'phone must match the pattern').required(),
        phone: Yup.number().min(10, "Must be more than 10 characters").required(),
        city: Yup.string().required(),

    })
    const notify = (msg, type) => toast[type](msg);
    const url = "http://localhost:5000/order";
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
        <div className="payment-cash">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cash</title>
            </Helmet>
            <div className="w-50 my-5 mx-auto">
                <h2 className="mb-4">Shipping Address</h2>
                <form onSubmit={registerFormik.handleSubmit}>
                    <label htmlFor="address">Details</label>
                    <input type="text" value={registerFormik.values.address}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="address" name="address" className="form-control my-3" />
                    {
                        registerFormik.errors.address && registerFormik.touched.address ? <div className="alert alert-danger">
                            {registerFormik.errors.address}
                        </div> : ''
                    }

                    <label htmlFor="phone">Phone</label>
                    <input type="number" value={registerFormik.values.phone}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="phone" name="phone" className="form-control my-3" />
                    {
                        registerFormik.errors.phone && registerFormik.touched.phone ? <div className="alert alert-danger">
                            {registerFormik.errors.phone}
                        </div> : ''
                    }

                    <label htmlFor="city">City</label>
                    <input type="text" value={registerFormik.values.city}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="city" name="city" className="form-control my-3" />
                    {
                        registerFormik.errors.city && registerFormik.touched.city ? <div className="alert alert-danger">
                            {registerFormik.errors.city}
                        </div> : ''
                    }

                    <button disabled={!(registerFormik.dirty && registerFormik.isValid && !loading)} className="btn btn-orange">
                        {!loading ? "Cash Payment" : <i className="fas fa-spinner fa-spin"></i>}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Payment
