import { Fragment, useContext } from "react"
import { CategoryContext } from "../Context/CategoryContext/Category"
import { Link } from "react-router-dom";
import $ from 'jquery';


const PocoProducts = () => {
    const { filterProdCategory ,  addToWishlist , removeFromWishlist } = useContext(CategoryContext);
    const addToWishlistById = async (id) =>{
        await addToWishlist(id);
        $(`#addWishlist${id}`).fadeOut(100);
        $(`#delWishlist${id}`).fadeIn(500);  
    }
    const deleteFromWishlist = async (id) =>{
        await removeFromWishlist(id);
        $(`#delWishlist${id}`).fadeOut(100);
        $(`#addWishlist${id}`).fadeIn(100);  
    }

    return (
        <Fragment className="container-fluid">
            <div className="row">
                {
                    filterProdCategory.map((prodItem) => {
                        return <Fragment key={prodItem._id}>
                        <div className="col-sm-12 col-md-3 my-3 my-4 position-relative">
                        <i className="fa-regular fa-heart position-absolute"
                        id={`addWishlist${prodItem._id}`}
                            onClick={()=> addToWishlistById(prodItem._id)}
                            style={{
                                top: "25px",
                                color: "#fff",
                                padding: "10px",
                                right: "25px",
                                background: "#ff8503",
                                fontSize: "25px"
                            }}>
                        </i>
                        <i className="fa-solid fa-heart position-absolute" 
                        id={`delWishlist${prodItem._id}`}
                        onClick={()=> deleteFromWishlist(prodItem._id)}
                        style={{
                            display : "none",
                            top: "25px",
                            color: "#fff",
                            padding: "10px",
                            right: "25px",
                            background: "#ff8503",
                            fontSize: "25px"
                        }}>
                        </i>
                        <Link to={`/product/${prodItem._id}`} className="nav-link bg-white mx-1">
                            <div className="item shadow-lg d-flex justify-content-center align-items-center flex-column py-3">
                                <div className="image-prod">
                                    <img src={prodItem.mainImage.secure_url} alt="product" className="w-100" />
                                </div>
                                <div className="text-center">
                                    <h5 className="my-3 main-color">{prodItem.name}</h5>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="text-decoration-line-through">{prodItem.price}</h6>
                                        <h4 className="mx-3">{prodItem.finalPrice}<span className="h6">EGP123</span></h4>
                                        <p>({prodItem.discount}%)</p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                        </Fragment>
                    })
                }
            </div>
        </Fragment>
    )
}

export default PocoProducts