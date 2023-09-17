import { useContext } from 'react'
import { CategoryContext } from '../Context/CategoryContext/Category'
import couponBan from "../Assets/banner.jpg"
import { Fragment } from 'react'
import './Coupon.modules.scss'

const Coupon = () => {
    const { coupon } = useContext(CategoryContext);
    const dataCoupon = coupon && coupon.data && coupon.data.coupon;
    return (
        <div className="coupon my-4 position-relative">
            <h4 className='fw-bolder main-color fs-3'>Scane Coupon</h4>
            <img src={couponBan} alt='coupon' className='w-100' />
            {
                dataCoupon && dataCoupon.length > 0 && dataCoupon.map((cpn) => {
                    return <Fragment key={cpn._id}>
                        <img src={cpn.url} alt='coupon' className='position-absolute mt-4' />
                    </Fragment>
                })
            }
        </div>
    )
}

export default Coupon
