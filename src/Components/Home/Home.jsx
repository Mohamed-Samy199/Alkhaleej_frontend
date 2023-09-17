import { Helmet } from "react-helmet"
import Coupon from "../Coupon/Coupon"
import MainSlider from "../MainSlider/MainSlider"
import SearchAndDisplayProd from "../SearchAndDisplayProd/SearchAndDisplayProd"
import SlideProducts from "../SlideProducts/SlideProducts"

const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
            <MainSlider />
            <SearchAndDisplayProd />
            <Coupon />
            <SlideProducts />
        </div>
    )
}

export default Home
