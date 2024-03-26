import { Fragment, useContext } from "react"
import { CategoryContext } from "../Context/CategoryContext/Category";
import { Link } from "react-router-dom";

const Product = () => {
    const { subItems, language, t } = useContext(CategoryContext);
    return (
        <Fragment>
            {
                subItems && subItems.length > 0 && subItems?.map((subItem) => {
                    return <Fragment key={subItem._id}>
                        <div className="col-sm-12 col-md-3 my-3 my-4">
                            <Link to={`/product/${subItem._id}`} className="nav-link bg-white mx-1">
                                <div className="item shadow-lg d-flex justify-content-center align-items-center flex-column py-3">
                                    <div className="image-prod image-size">
                                        {
                                            subItem && subItem.mainImage && subItem.mainImage.secure_url && <img src={subItem.mainImage.secure_url} alt="product" className="w-100 h-100" />
                                        }
                                    </div>
                                    <div className="text-center">
                                        <h5 className="my-3 main-color">{subItem.translations[language] === "en" ? `${subItem.name}` : `${subItem.translations[language]}`}</h5>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="text-decoration-line-through">{subItem.price === subItem.finalPrice ? null : subItem.price}</h6>
                                            <div dir={language === "ar" ? "rtl" : "ltr"}>
                                                <h4 className="mx-3">{subItem.finalPrice}<span className="h6">{t("EGP")}</span></h4>
                                            </div>
                                            <p>{subItem.discount !== 0 ? (`(${subItem.discount}%)`) : null} </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Fragment>
                })
            }
        </Fragment>
    )
}

export default Product
