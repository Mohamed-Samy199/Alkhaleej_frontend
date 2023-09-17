import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.modules.scss";
import { CategoryContext } from "../Context/CategoryContext/Category";
import Reviews from "../Reviews/Reviews";
import ReactImageMagnify from 'react-image-magnify';

const ProductDetails = ({ userData }) => {
    const { addProductCart } = useContext(CategoryContext)
    let addToCart = async (id) => {
        addProductCart(id)
    }
    const [products, setProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // Track the selected image
    let { _id } = useParams();
    let allImage = products.subImages || [];

    const getProductDetails = async () => {
        let { data } = await axios.get(`http://localhost:5000/product/${_id}`);
        setProducts(data.product);
    };

    useEffect(() => {
        getProductDetails();
    }, []);
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    console.log(products);
    return (
        <div className="product-details px-2 my-4">
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-5">
                    <div className="row">
                        <div className="col-md-3 mx-auto">
                            {allImage.map((image) => (
                                <div
                                    className={`image-sub p-1 my-1 ${selectedImage === image ? 'active' : ''}`}
                                    key={image}

                                    style={{ width: "100px", cursor: "pointer", border: selectedImage === image ? "2px solid #ff8503" : "" }}
                                    onClick={() => handleImageClick(image)} // Call handleImageClick on image click
                                >
                                    <img src={image.secure_url} className="w-100" alt="product details" />
                                </div>
                            ))}
                        </div>
                        <div className="col-md-8">
                            <div className="image-main mt-3 p-1" style={{ width: "360px" }}>
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
                <div className="col-sm-12 col-md-6 col-lg-5 ms-md-4 pe-5 details-prod">
                    <h4 className="badge badge-secondary my-4 p-1" style={{ background: "#a5a2bb", width: "100px" }}><span><img src="https://f.nooncdn.com/s/app/com/noon/icons/mouse-click-white.svg" alt="product details" className="w-25" /></span>Best Seller</h4>
                    <h2 className="text-capitalize">{products.name}</h2>
                    <p className="text-muted my-4">{products.description}</p>

                    {
                        products.colors && products.colors.length > 0 && products.colors.map((color, idx) => {
                            return <Fragment key={idx}>
                                <button className="mb-3" style={{ backgroundColor: `${color}`, width: "30px", height: "30px", borderRadius: "50%", border: ".5px solid #ff8503", marginRight: "10px" }}></button>
                            </Fragment>
                        })
                    }

                    <h5>Was : <span className="fw-bolder text-decoration-line-through my-4" style={{ color: "#a5a2bb" }}>EGP {products.price}</span></h5>
                    <h5>Naw : <span className="fw-bolder my-4">EGP {products.finalPrice}</span></h5>
                    <button className="btn btn-orange mt-5" onClick={() => addToCart(products._id)}> Add To Cart</button>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-2 Reviews">
                    <h3>Customer Reviews</h3>
                    <div className="skill-box d-flex justify-content-between align-items-center mb-3">
                        <span className="title me-3">5 star</span>
                        <div className="skill-bar">
                            <span className="skill-per html">
                                <span className="tooltip">95%</span>
                            </span>
                        </div>
                    </div>
                    <div className="skill-box d-flex justify-content-between align-items-center mb-3">
                        <span className="title me-3">4 star</span>
                        <div className="skill-bar">
                            <span className="skill-per four" style={{ width: `${Math.floor(Math.random() * 80)}%` }}>
                                <span className="tooltip">80%</span>
                            </span>
                        </div>
                    </div>
                    <div className="skill-box d-flex justify-content-between align-items-center mb-3">
                        <span className="title me-3">3 star</span>
                        <div className="skill-bar">
                            <span className="skill-per three" style={{ width: `${Math.floor(Math.random() * 60)}%` }}>
                                <span className="tooltip">60%</span>
                            </span>
                        </div>
                    </div>
                    <div className="skill-box d-flex justify-content-between align-items-center mb-3">
                        <span className="title me-3">2 star</span>
                        <div className="skill-bar">
                            <span className="skill-per two" style={{ width: `${Math.floor(Math.random() * 40)}%` }}>
                                <span className="tooltip">40%</span>
                            </span>
                        </div>
                    </div>
                    <div className="skill-box d-flex justify-content-between align-items-center mb-3">
                        <span className="title me-3">1 star</span>
                        <div className="skill-bar">
                            <span className="skill-per one" style={{ width: `${Math.floor(Math.random() * 20)}%` }}>
                                <span className="tooltip">70%</span>
                            </span>
                        </div>
                    </div>
                    {
                        products && products.review && products.review.length > 0 ? (
                            <Fragment>
                                <h4 className="mt-5">Top reviews</h4>
                                <div className="pt-3 d-flex justify-content-start align-items-center">
                                    <div className="profile-image me-3" style={{ width: "40px", height: "40px" }}>
                                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" style={{ objectFit: "cover" }} className="rounded-circle w-100" />
                                    </div>
                                    <h4>{
                                        userData && userData.userName ? (
                                            <Fragment>
                                                <span>{userData.userName}</span>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <span>sign in</span>
                                            </Fragment>
                                        )
                                    }</h4>
                                </div>
                                <p className="main-color mb-0">comment</p>
                                <div className="bg-gray p-1 rounded-1">
                                    <p className="ms-3 pt-0">{products.review[0].comment}</p>
                                </div>
                            </Fragment>
                        ) : (
                            <p className="ps-3 pt-0 text-muted"></p>
                        )
                    }
                </div>
            </div>
            <div className="px-4 my-5">
                <div className="row">
                    <div className="col-sm-12">
                        <Reviews userData={userData} _id={_id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;