import axios from "axios";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { CategoryContext } from "../Context/CategoryContext/Category";
import { baseUrl } from "../../Utils/baseUrl";

const Reviews = ({ userData, _id, getAllReview }) => {
    const { t } = useContext(CategoryContext);
    const [rating, setRating] = useState(0);

    const handleStarClick = (newRating) => {
        setRating(newRating);
    };

    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "authorization": `Muhammad__${localStorage.getItem("token")}`
    }

    const validationSchema = Yup.object({
        comment: Yup.string().required(),
    });

    const initialValues = {
        comment: '',
        productId: _id,
        rate: 0,
    };

    const notify = (msg, type) => toast[type](msg);
    const url = `${baseUrl}/product/review`;

    const onSubmit = async (values) => {
        try {
            values.rate = rating;
            const response = await axios.post(url, values, {
                headers
            });
            if (response.status === 201) {
                getAllReview();
                toast.success('Review Added Successfully', { duration: 2000, className: "text-white" });
            }
        } catch (error) {
            if (error) {
                notify(error.response.data.message, 'error')
            }
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div className="reviews">
            <h3>{t("Reviews")} <i className="fa-solid fa-star" style={{ color: "gold" }}></i></h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="d-flex justify-content-start align-items-center my-3">
                    <h4>{userData && userData.userName ? (
                        <span>{userData.userName}</span>
                    ) : (
                        <span>{t("signin")}</span>
                    )}</h4>
                    <div className="ps-3 h4" style={{ cursor: "pointer" }}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <label key={value}>
                                <input
                                    type="radio"
                                    value={value}
                                    checked={rating === value}
                                    name="rate"
                                    onChange={() => handleStarClick(value)}
                                    style={{opacity : "0"}}
                                />
                                <i
                                    className="fa-solid fa-star"
                                    style={{ color: rating >= value ? 'gold' : 'gray' }}
                                ></i>
                            </label>
                        ))}
                    </div>
                </div>
                <textarea
                    placeholder={t("your comment")}
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    className="form-control my-4"
                    name="comment"
                    style={{ border: ".4px solid #48BDCB" }}
                ></textarea>
                {formik.errors.comment && (
                    <div className="alert alert-danger">{formik.errors.comment}</div>
                )}
                <button className="btn btn-orange">{t("Add Comment")}</button>
            </form>
        </div>
    );
}

export default Reviews;
