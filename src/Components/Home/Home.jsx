import { Helmet } from "react-helmet"
import MainSlider from "../MainSlider/MainSlider"
import SearchAndDisplayProd from "../SearchAndDisplayProd/SearchAndDisplayProd"
import { useContext } from "react"
import { CategoryContext } from "../Context/CategoryContext/Category"
import SlidesShow from "../SlidesShow/SlidesShow"

const Home = () => {
    const { t } = useContext(CategoryContext);

    return (
        <main>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Alkhaleej Store")}</title>
                <meta name="description" content="Alkhaleej Company for Supplying Construction Equipment and Tools. The company specializes in supplying all types of hand tools, all brands, and we are distinguished by our experience in supplying a comprehensive set of international tools that meet the needs of construction and industry." />
                <meta name="keywords" content="الخليج, Alkhaleej Company, Alkhaleej, alkhaleej, al-khaleejtools, alkhaleejtools , alkhaleej product, منتاجات الخليج , موقع الخليج, ادوات البناء , العدد اليدوية, شركة الخليج" />
            </Helmet>
            <MainSlider />
            <div className="slide-show mt-2">
                <SlidesShow />
            </div>
            <SearchAndDisplayProd />
        </main>
    )
}

export default Home
