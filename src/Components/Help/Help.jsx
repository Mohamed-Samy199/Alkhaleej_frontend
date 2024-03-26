import { useContext } from "react";
import { Helmet } from "react-helmet"
import { CategoryContext } from "../Context/CategoryContext/Category";
import { Accordion } from "react-bootstrap";
import "./Help.modules.scss";

const Help = () => {
    const { language, t } = useContext(CategoryContext);

    return (
        <div className="help container pt-5" dir={language === "ar" ? "rtl" : "ltr"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("help center")}</title>
            </Helmet>

            <Accordion className='mt-6 mx-3'>
                <Accordion.Item eventKey="0" className="my-4">
                    <Accordion.Header className="py-2 "><h4>{t("q1")}</h4></Accordion.Header>
                    <Accordion.Body>
                        <h5>{t("a1")}</h5>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="my-4">
                    <Accordion.Header><h4>{t("q2")}</h4></Accordion.Header>
                    <Accordion.Body>
                        <h5>{t("a2")}</h5>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="my-4">
                    <Accordion.Header><h4>{t("q3")}</h4></Accordion.Header>
                    <Accordion.Body>
                        <h5>{t("a3")}</h5>
                        <h5>{t("a5")}</h5>
                        <h5>{t("a6")}</h5>
                        <h5>{t("a7")}</h5>
                        <h5>{t("a8")}</h5>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className="my-4">
                    <Accordion.Header><h4>{t("q4")}</h4></Accordion.Header>
                    <Accordion.Body>
                        <h5>{t("a4")}</h5>
                    </Accordion.Body>
                </Accordion.Item>
    </Accordion>

        </div>
    )
}

export default Help
