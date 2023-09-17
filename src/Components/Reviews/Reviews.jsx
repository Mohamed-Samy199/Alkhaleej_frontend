import axios from "axios";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from 'yup';

const Reviews = ({ userData, _id }) => {
    const [ranking, setRanking] = useState(0);

    const handleStarClick = (newRanking) => {
        // Toggle the ranking
        const updatedRanking = ranking === newRanking ? 0 : newRanking;
        setRanking(updatedRanking);
    };
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "authorization": `Muhammad__${localStorage.getItem("token")}`
    }
    let validationSchema = Yup.object({
        comment: Yup.string().required(),
        rate: Yup.number().required()
    })

    const notify = (msg, type) => toast[type](msg);
    const url = "http://localhost:5000/product/review";

    let registerFormik = useFormik({
        initialValues: {
            comment: '',
            productId: _id,
            rate: 3
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                let data = await axios.post(url, values, {
                    headers
                })
                if (data.status === 201) {
                    toast.success('Review Added Successfully', { duration: 2000, className: " text-white" });
                }
            } catch (error) {
                if (error.response.status === 400 || error.response.status === 500) {
                    notify(error.response.data.message, 'error')
                }
            }
        }
    })
    return (
        <div className="reviews">
            <h3>Reviews <i className="fa-solid fa-star" style={{ color: "gold" }}></i></h3>
            <form onSubmit={registerFormik.handleSubmit}>
                <div className="d-flex justify-content-start align-items-center my-3">
                    <h4>{
                        userData && userData.userName ? (
                            <Fragment>
                                <span>{userData.userName}</span>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <span>sign in</span>
                            </Fragment>
                        )
                    }</h4>
                    <div className="ps-3 h4" style={{ cursor: "pointer" }}>
                        <i
                            className="fa-solid fa-star"
                            style={{ color: ranking >= 1 ? 'gold' : 'gray' }}
                            onClick={() => handleStarClick(1)}
                        ></i>
                        <i
                            className="fa-solid fa-star"
                            style={{ color: ranking >= 2 ? 'gold' : 'gray' }}
                            onClick={() => handleStarClick(2)}
                        ></i>
                        <i
                            className="fa-solid fa-star"
                            style={{ color: ranking >= 3 ? 'gold' : 'gray' }}
                            onClick={() => handleStarClick(3)}
                        ></i>
                        <i
                            className="fa-solid fa-star"
                            style={{ color: ranking >= 4 ? 'gold' : 'gray' }}
                            onClick={() => handleStarClick(4)}
                        ></i>
                        <i
                            className="fa-solid fa-star"
                            style={{ color: ranking >= 5 ? 'gold' : 'gray' }}
                            onClick={() => handleStarClick(5)}
                        ></i>
                    </div>
                </div>

                <input type="number" className="d-none" value={registerFormik.values.rate} name="rate" onChange={registerFormik.handleChange} />

                <textarea placeholder="your comment" value={registerFormik.values.comment}
                    onChange={registerFormik.handleChange} className="form-control my-4" name="comment"
                    style={{ border: ".4px solid #ff8503" }}></textarea>
                {
                    registerFormik.errors.comment ? <div className="alert alert-danger">
                        {registerFormik.errors.comment}
                    </div> : ''
                }
                <button className="btn btn-orange" >Add Comment</button>
            </form>
        </div>
    )
}

export default Reviews
