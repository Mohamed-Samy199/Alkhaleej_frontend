import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';

const Register = () => {
    const [loading, setLoading] = useState(false)
    let validationSchema = Yup.object({
        userName: Yup.string().min(3).max(30).required(),
        email: Yup.string().email().required(),
        password: Yup.string().matches(/^[A-Z][a-z0-9@$%^&*]{3,}$/, 'password must match the pattern must start by capital letter').required(),
        cpassword: Yup.string().oneOf([Yup.ref('password')], 'password and repassword not match').required()

    })
    const notify = (msg, type) => toast[type](msg);
    const url = "http://localhost:5000/auth/signup";
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
                if (error.response.status == 409) {
                    setLoading(false)
                    notify(error.response.data.message, 'error')
                }
            })
        }
    })

    return (
        <div className="register">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>
            <div className="w-50 my-5 mx-auto">
                <h2>Register Now</h2>
                <form onSubmit={registerFormik.handleSubmit}>
                    <label htmlFor="userName">Name</label>
                    <input type="text" value={registerFormik.values.userName}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="userName" name="userName" className="form-control my-3" />
                    {
                        registerFormik.errors.userName && registerFormik.touched.userName ? <div className="alert alert-danger">
                            {registerFormik.errors.userName}
                        </div> : ''
                    }

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

                    <label htmlFor="cpassword">RePassword</label>
                    <input type="password" value={registerFormik.values.cpassword}
                        onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
                        id="cpassword" name="cpassword" className="form-control my-3" />
                    {
                        registerFormik.errors.cpassword && registerFormik.touched.cpassword ? <div className="alert alert-danger">
                            {registerFormik.errors.cpassword}
                        </div> : ''
                    }

                    <button disabled={!(registerFormik.dirty && registerFormik.isValid && !loading)} className="btn btn-orange">
                        {!loading ? "Register" : <i className="fas fa-spinner fa-spin"></i>}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
