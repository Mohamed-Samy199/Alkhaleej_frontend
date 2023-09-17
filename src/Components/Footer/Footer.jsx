import amazonpay from "../Assets/amazonpay.png"
import americanexpress from "../Assets/americanexpress.png"
import mastercard from "../Assets/mastercard.png"
import paypal from "../Assets/paypal.png"
import googleplay from "../Assets/googleplay.png"
import appstore from "../Assets/appstore.png"
import { toast } from "react-toastify"
import ScrollToTopButton from "../ScrollToTop/ScrollToTop"
import "./Footer.modules.scss"

export default function Footer() {
    const shareAppLink = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'My Awesome App',
                    text: 'Check out this awesome app!',
                    url: window.location.href
                });
                toast.success("App link shared successfully!", { duration: 3000, className: " text-white" });
            } else {
                toast.danger("Web Share API not supported!", { duration: 3000, className: " text-white" });
            }
        } catch (error) {
            console.error('Error sharing app link:', error);
        }
    };

    return <>
        <footer className='p-4 mt-5'>
            <div className='border-top border-1 border-dark mb-5'>
                <ScrollToTopButton />
            </div>
            <div className="container">
                <h2 >Get The Poco App</h2>
                <p className='text-muted mb-5'>We will send you a link, Open it in your phone to download App</p>
            </div>
            <div className="container d-flex justify-content-between mb-3 btn-input">
                <input type="email" placeholder='Email' className='form-control w-75' />
                <button className='btn btn-orange w-25 mx-3' onClick={shareAppLink}>Share App Link</button>
            </div>
            <div className="container border-bottom border-top border-1 border-dark py-4 d-flex align-items-center justify-content-between">
                <div className="row">
                    <div className="leftPart d-flex align-items-center jusify-content-center flex-wrap">
                        <div className="col-md-6 d-flex align-items-center jusify-content-center">
                            <h6 className='pe-4'>Payment Partners</h6>
                            <img src={amazonpay} style={{ 'width': '15%' }} className='pt-4' alt={'amazonpay'} />
                            <img src={americanexpress} style={{ 'width': '10%' }} alt={'americanexpress'} />
                            <img src={mastercard} style={{ 'width': '10%' }} alt={'mastercard'} />
                            <img src={paypal} style={{ 'width': '15%' }} alt={'paypal'} />
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <h6 className='text-muted'>Get deliveries with FreshCart</h6>
                            <img src={googleplay} className='w-25' alt={'googleplay'} />
                            <img src={appstore} className='w-25' alt={'appstore'} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
