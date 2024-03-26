import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.modules.scss";
import { CategoryContext } from "../Context/CategoryContext/Category";
import Reviews from "../Reviews/Reviews";
import ReactImageMagnify from 'react-image-magnify';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Progress from "../Progress/Progress";
import { baseUrl } from "../../Utils/baseUrl";
import mouse from "../Assets/mouse-click-white.svg";

const ProductDetails = ({ userData }) => {
    const { language, t, navPosition, handeleDeleteReviw, addProductCart } = useContext(CategoryContext)

    const [products, setProducts] = useState("");
    const [selectedImage, setSelectedImage] = useState(null); // Track the selected image
    let { _id, name } = useParams();
    let allImage = products?.subImages || [];

    let addToCart = async (id) => {
        addProductCart(id)
    }

    const deleteReview = async (reviewId) => {
        await handeleDeleteReviw(_id, reviewId);
        getAllReview();
    }

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/product/${_id}/${name}`);
                setProducts(data.product);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        getProductDetails();
    }, [_id]);
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    let [reviews, setReviews] = useState([]);
    const getAllReview = async () => {
        let data = await axios.get(`${baseUrl}/product/review/${_id}`);
        if (data.status === 200) {
            setReviews(data.data.review);
        }
    }
    useEffect(() => {
        getAllReview();
    }, []);
    return (
        <div className="product-details px-3 pt-4 mb-4 mt-6">
            {
                products !== "" ?
                    <Fragment>
                        <div className="row product-details-top">

                            <div className="col-sm-12 col-md-12 col-lg-5">
                                <div className="row">
                                    <div className="col-md-3 mx-auto all-sub-images">
                                        {allImage && allImage.length > 0 && allImage?.map((image) => (
                                            <div
                                                className={`image-sub p-1 my-1 ${selectedImage === image ? 'active' : ''}`}
                                                key={image}

                                                style={{ width: "100px", height: "120px", cursor: "pointer", border: selectedImage === image ? "2px solid #48BDCB" : "" }}
                                                onClick={() => handleImageClick(image)} // Call handleImageClick on image click
                                            >
                                                <img src={image.secure_url} className="w-100 h-100" alt="product details" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="col-md-8">
                                        <div className="image-main mt-3 me-2 p-1" >
                                            <ReactImageMagnify {...{
                                                smallImage: {
                                                    alt: 'product details',
                                                    isFluidWidth: true,
                                                    src:
                                                        selectedImage
                                                            ? (selectedImage.secure_url)
                                                            : (products.mainImage && products.mainImage.secure_url)

                                                },
                                                largeImage: {
                                                    src: selectedImage
                                                        ? (selectedImage.secure_url)
                                                        : (products.mainImage && products.mainImage.secure_url),
                                                    width: 1200,
                                                    height: 1800
                                                }
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4 ms-md-4 pe-5 details-prod" dir={language === "ar" ? "rtl" : "ltr"}>
                                <h4 className="badge badge-secondary my-4 p-1" style={{ background: "#a5a2bb", width: "100px" }}><span><img src={mouse} alt="product details" className="w-25" /></span>{t("Best Seller")}</h4>
                                <h2 className="text-capitalize">
                                    {products.translations && products.translations[language] !== "en"
                                        ? products.translations[language]
                                        : products?.name}
                                </h2>
                                <h5>{t("Brand")} <span className="text-muted">{products?.brandId?.name}</span></h5>

                                <p className="text-muted my-2">
                                    {products.translationsDesc &&
                                        products.translationsDesc[language] &&
                                        products.translationsDesc[language].description !== "en"
                                        ? products.translationsDesc[language].description
                                        : products?.description}
                                </p>

                                {
                                    products.colors && products.colors.length > 0 && products.colors.map((color, idx) => {
                                        return <Fragment key={idx}>
                                            <button className="mb-3" style={{ backgroundColor: `${color}`, width: "30px", height: "30px", borderRadius: "50%", border: ".5px solid #48BDCB", marginRight: "10px" }}></button>
                                        </Fragment>
                                    })
                                }
                                <div dir={language === "ar" ? "rtl" : "ltr"}>
                                    {products.price === products.finalPrice ?
                                        <div dir={language === "ar" ? "rtl" : "ltr"}>
                                            <h5 className="d-flex mb-0">{t("Price")}:
                                                <h4 className="mx-2">
                                                    {products.finalPrice}
                                                    <span className="fw-bolder my-2">{" "}{t("EGP")}</span>
                                                </h4>
                                            </h5>
                                        </div> :
                                        <div dir={language === "ar" ? "rtl" : "ltr"}>
                                            <h5 className="d-flex mb-0">{t("Was")}:
                                                <h4 className="mx-2 text-decoration-line-through" style={{ color: "#a5a2bb" }}>
                                                    {products.price}
                                                    <span className="fw-bolder my-2">{" "}{t("EGP")}</span>
                                                </h4>
                                            </h5>
                                            <h5 className="d-flex">{t("Naw")}:
                                                <h4 className="mx-2">
                                                    {products.finalPrice}
                                                    <span className="fw-bolder my-2">{" "}{t("EGP")}</span>
                                                </h4>
                                            </h5>
                                        </div>
                                    }
                                </div>

                                <p className="text-danger">{t("callphon")}</p>
                                <div className="d-flex justify-content-between flex-column flex-wrap">
                                    <button className="btn btn-orange mt-3 w-100" onClick={() => addToCart(products._id)}> {t("Add To Cart")}</button>
                                    <button className="btn btn-orange mt-3 w-100">
                                        <a href="tel:01150636335" className="nav-link">{t("call us")} <i className="fa-solid fa-phone-flip"></i></a>
                                    </button>
                                    <button className="btn btn-orange mt-3 w-100">
                                        <a href="https://web.whatsapp.com/+01150636335" className="nav-link">{t("for details")} <i className="fa-brands fa-whatsapp"></i></a>
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3 pt-1 Reviews" dir={language === "ar" ? "rtl" : "ltr"}>
                                <Progress />
                            </div>
                        </div>

                        <div className="px-4 my-3">
                            <div className="row">
                                <div className="col-sm-12" dir={language === "ar" ? "rtl" : "ltr"}>
                                    <Reviews getAllReview={getAllReview} userData={userData} _id={_id} />
                                </div>
                                <div className="col-sm-12 pt-1" dir={language === "ar" ? "rtl" : "ltr"}>
                                    {
                                        products && products.review && products.review.length > 0 ? (
                                            <Fragment>
                                                <h4 className="mt-2">{t("Top reviews")}</h4>
                                                {
                                                    reviews && reviews.length > 0 && reviews.map((review) => {
                                                        return (
                                                            <Fragment key={review._id}>
                                                                <div className="pt-3 d-flex justify-content-start align-items-center">
                                                                    <div className="profile-image mx-3" style={{ width: "40px", height: "40px" }}>
                                                                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" style={{ objectFit: "cover" }} className="rounded-circle w-100" />
                                                                    </div>
                                                                    <h4>{
                                                                        userData ? (
                                                                            <Fragment>
                                                                                <span>{review.user[0]?.userName}</span>
                                                                            </Fragment>
                                                                        ) : (
                                                                            <Fragment>
                                                                                <span>sign in</span>
                                                                            </Fragment>
                                                                        )
                                                                    }</h4>
                                                                </div>
                                                                <div className="d-flex align-items-center gap-2 mb-1">
                                                                    <p className="main-color mb-0">{t("comment")}</p>
                                                                    <span className="h5 mb-0 py-2 px-3 rounded-circle" style={{ border: "1.5px solid #a5a2bb" }}>{review.rate}</span>
                                                                </div>
                                                                <div className="bg-gray p-1 rounded-1 position-relative">
                                                                    <div>
                                                                        <p className="ms-3 pt-0">{review.comment}</p>
                                                                    </div>

                                                                    {
                                                                        userData && userData?.role === "Admin" ?
                                                                            (
                                                                                <div onClick={() => deleteReview(review._id)}
                                                                                    className={`position-absolute  ${navPosition === "right" ? "delete-item delete-review" : "delete-item-ar delete-review-ar"}`}>
                                                                                    <i className="fa-solid fa-trash-can text-danger fs-5"></i>
                                                                                </div>
                                                                            ) : (
                                                                                review.createBy === userData?.id ?
                                                                                    <div onClick={() => deleteReview(review._id)}
                                                                                        className={`position-absolute  ${navPosition === "right" ? "delete-item delete-review" : "delete-item-ar delete-review-ar"}`}>
                                                                                        <i className="fa-solid fa-trash-can text-danger fs-5"></i>
                                                                                    </div> : null
                                                                            )
                                                                    }
                                                                </div>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </Fragment>
                                        ) : (
                                            <p className="ps-3 pt-0 text-muted"></p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Fragment>
                    : <LoadingScreen />
            }
        </div>
    );
};

export default ProductDetails;