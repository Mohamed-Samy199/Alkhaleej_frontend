import { useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import { Fragment } from "react";

const CouponDatails = () => {
    const { coupon } = useContext(CategoryContext);
    const dataCoupon = coupon && coupon.data && coupon.data.coupon;
    return (
        <div>
            {
                dataCoupon && dataCoupon.length > 0 && dataCoupon.map((cpn) => {
                    return (
                        <Fragment key={cpn._id}>
                            <div className="w-75 my-4 mx-auto text-center">
                                <h2>Name of Coupon: {cpn.name}</h2>
                                <h4>Amount: {cpn.amount}</h4>
                                <h4>Expire Date: {cpn.expireDate}</h4>
                                {cpn.image && cpn.image.secure_url && (
                                    <img src={cpn.image.secure_url} alt="coupon" />
                                )}
                            </div>
                        </Fragment>
                    );
                })
            }
        </div>
    );
}

export default CouponDatails;