import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { CategoryContext } from "../Context/CategoryContext/Category";
import { baseUrl } from "../../Utils/baseUrl";
import "./Login.modules.scss";
import LoginWithGoogleGmail from "../LoginWithGoogleGmail/LoginWithGoogleGmail";

const Login = ({ saveUserData }) => {
    const { t, language } = useContext(CategoryContext);
    const [loading, setLoading] = useState(false)
    let validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().matches(/^[A-Z][a-z0-9@$%^&*]{3,}$/, 'password must match the pattern').required(),

    })
    const notify = (msg, type) => toast[type](msg);
    const url = `${baseUrl}/auth/login`;
    let navigate = useNavigate();

    let registerFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            // send to api
            axios.post(url, values).then((data) => {
                setLoading(false)
                if (data.status === 200) {
                    localStorage.setItem("token", data.data.access_token)
                    saveUserData()
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
    });

    return (
        <div className="login mt-6 pt-1">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Login")}</title>
            </Helmet>
            <div className="w-75 my-5 mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>
                <h2>{t("Login Now")}</h2>
                <div className="mb-4 text-center d-flex justify-content-center align-items-center flex-column gap-2 pb-4 position-relative" style={{borderBottom : "2px solid #ccc"}}>
                    <h3 className="accuont" style={{color : "#8c89a0"}}>{t("Log in your account")}</h3>
                    <LoginWithGoogleGmail saveUserData={saveUserData} />
                    <div className="or-login position-absolute fw-bolder fs-5">{t("OR")}</div>
                </div>
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

                    <label htmlFor="password">{t("Password")}</label>
                    <input type="password" value={registerFormik.values.password}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="password" name="password" className="form-control my-3" />
                    {
                        registerFormik.errors.password && registerFormik.touched.password ? <div className="alert alert-danger">
                            {registerFormik.errors.password}
                        </div> : ''
                    }

                    <button disabled={!(registerFormik.dirty && registerFormik.isValid && !loading)} className="btn btn-orange">
                        {!loading ? `${t("Login")}` : <i className="fas fa-spinner fa-spin"></i>}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
