import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { CategoryContext } from "../Context/CategoryContext/Category";
import { baseUrl } from "../../Utils/baseUrl";

const NewAdmin = ({userData}) => {
    const { t, language } = useContext(CategoryContext);
    const [loading, setLoading] = useState(false)
    let validationSchema = Yup.object({
        email: Yup.string().email().required(),
    })
    const notify = (msg, type) => toast[type](msg);
    const url = `${baseUrl}/auth/newAdmin`;
    let navigate = useNavigate();
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "authorization": `Muhammad__${localStorage.getItem("token")}`
    }

    let registerFormik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            // send to api
            axios.post(url, values, { headers }).then((data) => {
                setLoading(false)
                if (data.status === 201) {
                    notify("success", "success")
                    navigate('/');
                }
            }).catch((error) => {
                if (error) {
                    setLoading(false)
                    notify(error.response.data.message, 'error')
                }
            })
        }
    })
    return (
        <div className="create-admin mt-6 pt-1">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Create Admin")}</title>
            </Helmet>
            {
                userData?.role === "Admin" ?
                <div className="w-50 my-5 pt-5 mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>
                    <h2>{t("Create Admin")}</h2>
                    <form onSubmit={registerFormik.handleSubmit}>
                        <label htmlFor="email">{t("Email")}</label>
                        <input type="email" value={registerFormik.values.email}
                            onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                            id="email" name="email" className="form-control my-3" />
                        {
                            registerFormik.errors.email && registerFormik.touched.email ? <div className="alert alert-danger">
                                {registerFormik.errors.email}
                            </div> : ''
                        }
    
                        <button disabled={!(registerFormik.dirty && registerFormik.isValid && !loading)} className="btn btn-orange">
                            {!loading ? `${t("Create Admin")}` : <i className="fas fa-spinner fa-spin"></i>}
                        </button>
                    </form>
                </div>
                : <></>
            }
        </div>
    )
}

export default NewAdmin
