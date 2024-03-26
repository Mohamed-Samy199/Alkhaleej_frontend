import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { CategoryContext } from "../Context/CategoryContext/Category";
import { baseUrl } from "../../Utils/baseUrl";
import "./Register.scss";
import LoginWithGoogleGmail from "../LoginWithGoogleGmail/LoginWithGoogleGmail";

const Register = ({saveUserData}) => {
    const { t, language } = useContext(CategoryContext);
    const [loading, setLoading] = useState(false)
    let validationSchema = Yup.object({
        userName: Yup.string().min(3).max(30).required(),
        email: Yup.string().email().required(),
        password: Yup.string().matches(/^[A-Z][a-z0-9@$%^&*]{3,}$/, 'password must match the pattern must start by capital letter').required(),
        cpassword: Yup.string().oneOf([Yup.ref('password')], 'password and repassword not match').required()

    })
    const notify = (msg, type) => toast[type](msg);
    const url = `${baseUrl}/auth/signup`;
    let navigate = useNavigate();

    let registerFormik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            // send to api
            axios.post(url, values).then((data) => {
                setLoading(false)
                if (data.status === 201) {
                    notify("success", "success")
                    navigate('/login');
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
        <div className="register pt-1 mt-6">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Register")}</title>
            </Helmet>
            <div className="w-75 my-5 mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>
                <h2>{t("Register Now")}</h2>
                <div className="mb-4 text-center d-flex justify-content-center align-items-center flex-column gap-2 pb-4 position-relative" style={{borderBottom : "2px solid #ccc"}}>
                    <h3 className="accuont" style={{color : "#8c89a0"}}>{t("Log in your account")}</h3>
                    <LoginWithGoogleGmail saveUserData={saveUserData} />
                    <div className="or-login position-absolute fw-bolder fs-5">{t("OR")}</div>
                </div>
                <form onSubmit={registerFormik.handleSubmit}>
                    <label htmlFor="userName">{t("Name")}</label>
                    <input type="text" value={registerFormik.values.userName}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="userName" name="userName" className="form-control my-3" />
                    {
                        registerFormik.errors.userName && registerFormik.touched.userName ? <div className="alert alert-danger">
                            {registerFormik.errors.userName}
                        </div> : ''
                    }

                    <label htmlFor="email">{t("Email")}</label>
                    <input type="email" value={registerFormik.values.email}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="email" name="email" className="form-control my-3" />
                    {
                        registerFormik.errors.email && registerFormik.touched.email ? <div className="alert alert-danger">
                            {registerFormik.errors.email}
                        </div> : ''
                    }

                    <label htmlFor="password">{t("Password")}</label>
                    <input type="password" value={registerFormik.values.password}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="password" name="password" className="form-control my-3" />
                    {
                        registerFormik.errors.password && registerFormik.touched.password ? <div className="alert alert-danger">
                            {registerFormik.errors.password}
                        </div> : ''
                    }

                    <label htmlFor="cpassword">{t("RePassword")}</label>
                    <input type="password" value={registerFormik.values.cpassword}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="cpassword" name="cpassword" className="form-control my-3" />
                    {
                        registerFormik.errors.cpassword && registerFormik.touched.cpassword ? <div className="alert alert-danger">
                            {registerFormik.errors.cpassword}
                        </div> : ''
                    }

                    <button type="submit" disabled={!(registerFormik.dirty && registerFormik.isValid && !loading)} className="btn btn-orange">
                        {!loading ? `${t("Register")}` : <i className="fas fa-spinner fa-spin"></i>}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
