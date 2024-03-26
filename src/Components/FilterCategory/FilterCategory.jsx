import { Fragment, useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import "./FilterCategory.modules.scss";

const FilterCategory = () => {
    const { subProds, t , language } = useContext(CategoryContext);
    return (
        <Fragment>
            <div className="container filter-category mt-6">
                <div className="row">
                    {
                        subProds && subProds.length > 0 && subProds.map((subProds) => {
                            return <Fragment key={subProds._id}>
                                <div className="col-sm-12 col-md-4 col-lg-3 my-3 my-4">
                                    <div className="item shadow-lg d-flex justify-content-center align-items-center flex-column py-3 bg-white mx-1">
                                        <div className="image-prod image-size">
                                            <img src={subProds.mainImage.secure_url} alt="product" className="w-100 h-100" />
                                        </div>
                                        <div className="text-center">
                                            <h5 className="my-3 main-color">{subProds.name}</h5>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h6 className="text-decoration-line-through">{subProds.price === subProds.finalPrice ? null : subProds.price}</h6>
                                                <div dir={language === "ar" ? "rtl" : "ltr"}>
                                                    <h4 className="mx-3 pb-2" style={{ borderBottom: "4px solid #48BDCB" }} >{subProds.finalPrice}<span className="h6">{t("EGP")}</span></h4>
                                                </div>
                                                <p>{subProds.discount !== 0 ? (`(${subProds.discount}%)`) : null} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default FilterCategory
