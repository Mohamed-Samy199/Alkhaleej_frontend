import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { CategoryContext } from "../../Context/CategoryContext/Category";
import { baseUrl } from "../../../Utils/baseUrl";

const RemoveAdmin = ({userData}) => {
    const { t, language, getAllUsers } = useContext(CategoryContext);
    const [loading, setLoading] = useState(false)
    let validationSchema = Yup.object({
        email: Yup.string().email().required(),
    })
    const notify = (msg, type) => toast[type](msg);
    const url = `${baseUrl}/auth/remove-admin`;
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
                    getAllUsers();
                    notify("success", "success")
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
        <div className="Remove-admin mt-6 pt-1">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Remove Admin")}</title>
            </Helmet>
            {
                userData?.role === "Admin" ?
                <div className="w-50 my-5 pt-5 mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>
                    <h2>{t("Remove Admin")}</h2>
                    <p className="text-muted">{t("admin to user")}</p>
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
                            {!loading ? `${t("Remove Admin")}` : <i className="fas fa-spinner fa-spin"></i>}
                        </button>
                    </form>
                </div>
                : <></>
            }
        </div>
    )
}

export default RemoveAdmin
