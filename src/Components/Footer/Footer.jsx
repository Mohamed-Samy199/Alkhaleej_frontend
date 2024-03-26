import amazonpay from "../Assets/amazon.webp"
import americanexpress from "../Assets/american.webp"
import mastercard from "../Assets/mastercard.webp"
import paypal from "../Assets/paypal.webp"
import googleplay from "../Assets/googleplay.webp"
import appstore from "../Assets/apple.webp"
import { toast } from "react-toastify"
import ScrollToTopButton from "../ScrollToTop/ScrollToTop"
import "./Footer.modules.scss"
import { useContext } from "react"
import { CategoryContext } from "../Context/CategoryContext/Category"

export default function Footer() {
    const { t, language } = useContext(CategoryContext);

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
        <footer className='p-4 mt-4'>
            <div className='border-top border-1 border-dark mb-5'>
                <ScrollToTopButton />
            </div>
            <div className="container call-us" dir={language === "ar" ? "rtl" : "ltr"}>
                <h5 className="d-flex">{t("call us")} <span><a href="tel:01150636335" className="mx-2 nav-link"> 01150636335</a></span></h5>
                <p className='text-muted mb-3'>{t("link")}</p>
            </div>
            <div className="container d-flex justify-content-between mb-3 btn-input" dir={language === "ar" ? "rtl" : "ltr"}>
                <button className='btn btn-orange w-25' onClick={shareAppLink}>{t("Share")}</button>
            </div>
            <div className="container border-bottom border-top border-1 border-dark py-4 d-flex align-items-center justify-content-between">
                <div className="row">
                    <div className="leftPart d-flex align-items-center jusify-content-center flex-wrap">
                        <div className="col-md-6 d-flex align-items-center jusify-content-center">
                            <h6 className='pe-4'>{t("Payment Partners")}</h6>
                            <img src={amazonpay} style={{ 'width': '15%' }} className='pt-4' alt={'amazonpay Alkhaleej'} />
                            <img src={americanexpress} style={{ 'width': '10%' }} alt={'americanexpress Alkhaleej'} />
                            <img src={mastercard} style={{ 'width': '10%' }} alt={'mastercard Alkhaleej'} />
                            <img src={paypal} style={{ 'width': '15%' }} alt={'paypal Alkhaleej'} />
                        </div>
                        <div className="col-md-6 last-part d-flex justify-content-center align-items-center">
                            <h6 className='text-muted'>{t("get")}</h6>
                            <img src={googleplay} className='w-25' alt={'googleplay Alkhaleej'} />
                            <img src={appstore} className='w-25' alt={'appstore Alkhaleej'} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
