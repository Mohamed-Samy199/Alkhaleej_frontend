import { useContext } from "react";
import { Helmet } from "react-helmet"
import { CategoryContext } from "../Context/CategoryContext/Category";
import { useNavigate } from "react-router-dom";
import "./Support.modules.scss";

const Support = () => {
    const { language, t } = useContext(CategoryContext);
    let navigate = useNavigate();

    return (
        <div className="supportd container pt-4" dir={language === "ar" ? "rtl" : "ltr"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Support")}</title>
                <meta name="keywords" content="Support, alkhaleej support, الدعم, دعم الخليج" />
                <meta name="content" content="نهدف دائمًا لتوفير الحلول المثلى والمواد عالية الجودة لعملائنا. نسعى جاهدين لتلبية متطلباتهم وتجاوز توقعاتهم من خلال تقديم أفضل الأدوات والمعدات المتوفرة في السوق" />
            </Helmet>

            <section className="mt-6">
                <div className="mb-2">
                    <h3>{t("Connect with us")}</h3>
                    <p className="text-muted">{t("address")}</p>
                </div>
                <div className="mb-2">
                    <h3>{t("customers service")}</h3>
                    <p className="text-muted" style={{ cursor: "pointer" }} onClick={() => navigate('/help')}>{t("help center")}</p>
                    <p className="text-muted" style={{ cursor: "pointer" }} onClick={() => navigate('/brand')}>{t("Brands")}</p>
                </div>
                <div className="mb-2">
                    <h3>{t("Customer area")}</h3>
                    <p className="text-muted" style={{ cursor: "pointer" }} onClick={() => navigate('/register')}>{t("Register")}</p>
                    <p className="text-muted" style={{ cursor: "pointer" }} onClick={() => navigate('/login')}>{t("Login")}</p>
                </div>
            </section>


        </div>
    )
}

export default Support
