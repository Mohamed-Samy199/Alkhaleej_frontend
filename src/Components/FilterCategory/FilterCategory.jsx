import { Fragment, useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";

const FilterCategory = () => {
    const { subProds } = useContext(CategoryContext);
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    {
                        subProds.map((subProds) => {
                            return <Fragment key={subProds._id}>
                                <div className="col-sm-12 col-md-3 my-3 my-4">
                                    <div className="item shadow-lg d-flex justify-content-center align-items-center flex-column py-3 bg-white mx-1">
                                        <div className="image-prod">
                                            <img src={subProds.mainImage.secure_url} alt="product" className="w-100" />
                                        </div>
                                        <div className="text-center">
                                            <h5 className="my-3 main-color">{subProds.name}</h5>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h6 className="text-decoration-line-through gray">{subProds.price}</h6>
                                                <h4 className="mx-3 pb-2" style={{ borderBottom: "4px solid #ff8503" }} >{subProds.finalPrice}<span className="h6">EGP</span></h4>
                                                <p>({subProds.discount}%)</p>
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
