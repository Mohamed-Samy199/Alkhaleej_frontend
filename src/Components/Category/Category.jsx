import { CategoryContext } from "../Context/CategoryContext/Category";
import { Fragment, useContext, useMemo } from "react";
import "./Category.modules.scss";
import TypeWriterEffect from "react-typewriter-effect";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import SlidesShow from "../SlidesShow/SlidesShow";

const Category = ({ userData }) => {
    const { categories, sendProduct, handeleDelete, handeleDeleteSubcategory,
        getAllCategories, setCategories, navPosition, language, t } = useContext(CategoryContext);
    const deleteSubcategory = async (categoryId, subId) => {
        await handeleDeleteSubcategory(categoryId, subId);
    };
    const deleteCategory = async (id) => {
        await handeleDelete("category", id);
        getAllCategories('category', setCategories);
    };

    const renderSubcategories = useMemo(() => {
        return categories && categories.map((category) => {
            return (
                <div key={category._id} className="my-2 position-relative" style={{ width: "98%" }}>
                    {
                        userData && userData.role === "Admin" ?
                            <Fragment>
                                <div className={`position-absolute ${navPosition === "right" ? "delete-item" : "delete-item-ar"}`} onClick={() => deleteCategory(category._id)}>
                                    <i className="fa-solid fa-trash-can text-danger fs-3"></i>
                                </div>
                            </Fragment>
                            : null
                    }
                    <h4 className="shadow-lg sub-shadow p-4 bg-white subcategory-alkhaleej" >
                        {category.translations[language] === "en" ? `${category.name}` : `${category.translations[language]}`}
                    </h4>

                    <div className="shadow-lg d-flex justify-content-center align-items-center bg-white gap-2">

                        {
                            category && category.subcategory && category.subcategory.slice(0, 1).map((sub) => {

                                return <div key={sub._id} className="position-relative">
                                    {
                                        userData && userData.role === "Admin" ?
                                            <Fragment>
                                                <div className="position-absolute delete-item" onClick={() => deleteSubcategory(category._id, sub._id)}>
                                                    <i className="fa-solid fa-trash-can text-danger fs-3"></i>
                                                </div>
                                            </Fragment>
                                            : null
                                    }
                                    <Link to="/filterCategory" className="nav-link d-flex justify-content-center align-items-center flex-column" key={sub._id} onClick={() => sendProduct(sub.product)} style={{ width: "340px" }} >

                                        <div className="subcategory-alkhaleej mt-2 mx-2">
                                            <img src={sub.image.secure_url} alt="subcategory alkhaleej" className="w-100" />
                                        </div>
                                        <p className="text-muted fw-bolder p-2 fs-5">
                                            {sub.translations[language] === "en" ? `${sub.name}` : `${sub.translations[language]}`}
                                        </p>
                                    </Link>
                                </div>

                            })
                        }


                    </div>
                </div>
            );
        });
    }, [categories, language, userData]);

    return (
        <main className="alkhaleej category mt-5">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Alkhaleej Category")}</title>
                <meta name="keywords" content="Category, al-khaleejtools, alkhaleejtools, alkhaleej category,  فئات , فئات الخليج" />
                <meta name="content" content="نهدف دائمًا لتوفير الحلول المثلى والمواد عالية الجودة لعملائنا. نسعى جاهدين لتلبية متطلباتهم وتجاوز توقعاتهم من خلال تقديم أفضل الأدوات والمعدات المتوفرة في السوق" />
            </Helmet>
            {
                categories && categories.length > 0 ? <Fragment>
                    <div className="alkhaleej slider pt-1 mt-6">
                        <header>
                            <h3 className="fw-bolder alkhaleej type-words mx-2 mt-4  d-flex justify-content-start" dir={language === "ar" ? "rtl" : "ltr"}>
                                <span className="teal-color h1 mx-2">{t("Shop Popular")}</span>
                                <span className="none">
                                    <TypeWriterEffect
                                        textStyle={{
                                            fontFamily: "Red Hat Display",
                                            color: "#8c89a0",
                                        }}
                                        startDelay={2000}
                                        cursorColor="#8c89a0"
                                        multiText={
                                            categories && categories.map((category) => category.translations[language] === "en" ? category.name : category.translations[language])
                                        }
                                        multiTextDelay={1000}
                                        typeSpeed={40}
                                        multiTextLoop
                                    />
                                </span>
                            </h3>
                        </header>
                        <div>
                            <SlidesShow />
                        </div>
                    </div>
                    <div className="alkhaleej content-category text-capitalize my-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3 px-4 alkhaleej company" dir={language === "ar" ? "rtl" : "ltr"}>
                                    <h4 className="p-2 fw-bolder">{t("Alkhaleej Company")}</h4>

                                    <div className="my-2">
                                        <h5 className="shadow-lg sub-shadow p-4 bg-white" >
                                            {t("Who are we")}
                                        </h5>
                                        <div className="border-info-details p-2">
                                            <p className="text-muted">
                                                {t("details 1")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="my-2">
                                        <h5 className="shadow-lg sub-shadow p-4 bg-white" >
                                            {t("About our work")}
                                        </h5>
                                        <div className="border-info-details p-2">
                                            <p className="text-muted">
                                                {t("details 2")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="my-2">
                                        <h5 className="shadow-lg sub-shadow p-4 bg-white" >
                                            {t("Our Vision")}
                                        </h5>
                                        <div className="border-info-details p-2">
                                            <p className="text-muted">
                                                {t("details 3")}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-9 px-2 pe-lg-5 alkhaleej-category" dir={language === "ar" ? "rtl" : "ltr"}>
                                    <h4 className="p-2 fw-bolder">{t("AllSubcategories")}</h4>
                                    {
                                        renderSubcategories
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment> : <LoadingScreen />
            }
        </main>
    )
}

export default Category