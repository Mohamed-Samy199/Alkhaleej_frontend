import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';

const Login = ({ saveUserData }) => {
    const [loading, setLoading] = useState(false)
    let validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().matches(/^[A-Z][a-z0-9@$%^&*]{3,}$/, 'password must match the pattern').required(),

    })
    const notify = (msg, type) => toast[type](msg);
    const url = "http://localhost:5000/auth/login";
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
                if (error.response.status == 500) {
                    setLoading(false)
                    notify(error.response.data.message, 'error')
                }
            })
        }
    })
    return (
        <div className="login">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
            <div className="w-50 my-5 mx-auto">
                <h2>Login Now</h2>
                <form onSubmit={registerFormik.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={registerFormik.values.email}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="email" name="email" className="form-control my-3" />
                    {
                        registerFormik.errors.email && registerFormik.touched.email ? <div className="alert alert-danger">
                            {registerFormik.errors.email}
                        </div> : ''
                    }

                    <label htmlFor="password">Password</label>
                    <input type="password" value={registerFormik.values.password}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="password" name="password" className="form-control my-3" />
                    {
                        registerFormik.errors.password && registerFormik.touched.password ? <div className="alert alert-danger">
                            {registerFormik.errors.password}
                        </div> : ''
                    }

                    <button disabled={!(registerFormik.dirty && registerFormik.isValid && !loading)} className="btn btn-orange">
                        {!loading ? "Login" : <i className="fas fa-spinner fa-spin"></i>}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
