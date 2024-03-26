import { Fragment, useContext, useEffect, useState } from "react"
import { CategoryContext } from "../Context/CategoryContext/Category"
import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";
import { useParams } from "react-router-dom";

const Progress = () => {
    const { t } = useContext(CategoryContext);
    let { _id } = useParams();

    let [reviews, setReviews] = useState([]);
    const getAllReview = async () => {
        let data = await axios.get(`${baseUrl}/product/review/${_id}`);
        if (data.status === 200) {
            setReviews(data.data.review);
        }
    }
    useEffect(() => {
        getAllReview();
    }, []);

    const calculatePercentage = (rate) => {
        const totalReviews = reviews.length;
        const rateCount = reviews.filter((item) => item.rate === rate).length;
        return (rateCount / totalReviews) * 100;
    };

    return (
        <Fragment>
            <h3>{t("Customer Reviews")}</h3>
            {[1, 2, 3, 4, 5].map((rate) => (
                <div key={rate} className="skill-box d-flex justify-content-between align-items-center mb-3">
                    <span className="title me-3">{rate} {t("star")}</span>
                    <div className="skill-bar">
                        <div
                            className="skill-per"
                            style={{ width: `${calculatePercentage(rate)}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </Fragment>
    )
}

export default Progress
