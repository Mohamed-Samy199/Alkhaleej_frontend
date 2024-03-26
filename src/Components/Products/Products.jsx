import { useContext } from "react"
import { CategoryContext } from "../Context/CategoryContext/Category"
import "./products.modules.scss";
import { NavLink, Outlet } from "react-router-dom";
import { Fragment } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
import SlideProducts from "../SlideProducts/SlideProducts";



const Products = () => {
    const { categories, sendSubcategory, searchProduct, search, language, t, navPosition } = useContext(CategoryContext);

    return (
        <div className="products">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Alkhaleej Products")}</title>
                <meta name="keywords" content="products, alkhaleej product,alkhaleej tools, منتجات الخليج, ادوات الخليج" />
                <meta name="content" content="نهدف دائمًا لتوفير الحلول المثلى والمواد عالية الجودة لعملائنا. نسعى جاهدين لتلبية متطلباتهم وتجاوز توقعاتهم من خلال تقديم أفضل الأدوات والمعدات المتوفرة في السوق" />
            </Helmet>
            {
                categories.length > 0 ? <Fragment>
                    <div className="slider position-relative translate-slider mt-6">
                        <SlideProducts />
                        <div className="position-absolute"></div>
                    </div>
                    <div className="display-products mt-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className={`col-sm-12 col-md-4 col-lg-3 ${navPosition === "right" ? "" : "order-sm-2"}`}>
                                    <div className="search mt-4 p-3 mx-3">
                                        <input type="text"
                                            className="form-control my-3 p-2"
                                            placeholder={`${t("type by")}`}
                                            value={search}
                                            onChange={searchProduct}
                                            dir={language === "ar" ? "rtl" : "ltr"} />
                                        <h4 className={`my-4 ${navPosition === "right" ? "" : "text-end"}`}>{t("Filter By")}</h4>
                                        <div className={`brand-search ${navPosition === "right" ? "" : "text-end"}`}>
                                            <h5 className="my-3">{t("Categories")}</h5>
                                            <NavLink to="" className="nav-link fw-bolder ms-3 my-2 text-capitalize">{t("All")}</NavLink>
                                            {
                                                categories && categories.length > 0 && categories?.map((category) => {
                                                    return <div className={`ms-3 d-flex justify-content-center flex-column ${navPosition === "right" ? "align-items-start" : "align-items-end"}`} key={category._id}>
                                                        <NavLink to="product" className="nav-link fw-bolder fs-6 my-2 text-capitalize" onClick={() => sendSubcategory(category.product)}>
                                                            {category.translations[language] === "en" ? `${category.name}` : `${category.translations[language]}`}
                                                        </NavLink>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-sm-12 col-md-8 col-lg-9 ${navPosition === "right" ? "order-sm-2" : ""}`}>
                                    <div className="row">
                                        <Outlet> </Outlet>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment> : <LoadingScreen />
            }

        </div>
    )
}

export default Products
