import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.svg";
import { Fragment, useContext, useState } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import './Navbar.modules.scss';
import { toast } from "react-toastify";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";


const Navbar = ({ userData, logout }) => {
    const { categories, sendSubcategory, filterProd, numOfCartItems, numOfWishlist } = useContext(CategoryContext);
    let navigate = useNavigate();
    const goToBrand = () => {
        navigate("/brand")
    }
    const [model, setModel] = useState(false);
    const notify = (msg, type) => toast[type](msg);

    return (
        <div className="navbar-component">
            {/*popup map*/}
            <Modal size="lg" isOpen={model} toggle={() => setModel(!model)}>
                <ModalHeader toggle={() => setModel(!model)}>
                    <i className="fa-solid fa-location-dot main-color fs-3"></i> Location
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg={12}>
                            <iframe className="w-100" style={{ height: "450px" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27484.135871581304!2d31.029264561463492!3d30.562948028629382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7d6eb70a91047%3A0xc353387ed2f37809!2z2KzYp9mF2LnYqSDYp9mE2YXZhtmI2YHZitip!5e0!3m2!1sar!2seg!4v1689412508215!5m2!1sar!2seg" frameborder="0"
                                loading="lazy"></iframe>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <nav className="navbar navbar-expand-lg p-3">
                <div className="container-fluid ">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt='logo' style={{ width: "150px" }} />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link light" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link light" onClick={() => setModel(true)}>Deliver to Cairo</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex w-100" role="search">
                            <input className="form-control mx-2" type="search" placeholder="what are you look for?" aria-label="Search" />
                        </form>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                userData ? (
                                    <Fragment>
                                        <li className="nav-item">
                                            <NavLink className="nav-link light" onClick={logout} style={{ width: "75px" }}>log out</NavLink>
                                        </li>
                                        <li className="nav-item move-item">
                                            <NavLink className="nav-link light me-3" to="/wishlist">
                                                <i className="fa-regular fa-heart fs-4"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {numOfWishlist}
                                                </span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item move-item">
                                            <NavLink className="nav-link position-relative light" to="cart">
                                                <i className="fa-solid fa-cart-shopping fs-3"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {numOfCartItems}
                                                </span>
                                            </NavLink>
                                        </li>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <li className="nav-item">
                                            <NavLink className="nav-link light" to="/login" style={{ width: "75px" }}>sign in</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link light" to="/register" style={{ width: "65px" }}>register</NavLink>
                                        </li>
                                        <li className="nav-item" onClick={() => notify("sorry! should be login frist", "success")}>
                                            <button className="nav-link position-relative light">
                                                <i className="fa-solid fa-cart-shopping fs-3"></i>
                                            </button>
                                        </li>
                                    </Fragment>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="navbar secand-color">
                <div className="container-fluid justify-content-start">
                    <button className="fs-5 pe-2 secand-color light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon light"></span> All
                    </button>
                    <NavLink className="navbar-brand px-2 light" to="/">Home</NavLink>
                    <NavLink className="navbar-brand px-2 light" to="/products">Products</NavLink>
                    <NavLink className="navbar-brand px-2 light" to="/category">Categories</NavLink>
                    <NavLink className="navbar-brand px-2 light" to="/brand">Brands</NavLink>
                    <NavLink className="navbar-brand px-2 light" to="/orders">Orders</NavLink>
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header secand-color">
                            <div className="d-flex justify-content-center align-items-center flex-nowra" id="offcanvasNavbarLabel">
                                <div className="profile-image me-3">
                                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" className="rounded-circle" />
                                </div>
                                <h4 className="pt-2 text-white" style={{ whiteSpace: "nowrap" }}>Hello<span>, {
                                    userData && userData.userName ? (
                                        <Fragment>
                                            <span>{userData.userName}</span>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <span>sign in</span>
                                        </Fragment>
                                    )
                                }</span></h4>
                            </div>
                            <button type="button" className="btn-close text-white" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <h4 className="offcanvas-title ms-4 m-3" >All Categories</h4>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {
                                    categories.map((category) => {
                                        return <li className="nav-item" key={category._id}>
                                            <Link to="/subcategory" className="nav-link ms-2 mb-2 fw-bolder text-capitalize" onClick={() => sendSubcategory(category.subcategory)}>{category.name} <i className="fa-solid fa-caret-right"></i></Link>
                                            <div className="box-details position-absolute shadow-lg">
                                                <div>
                                                    <div className="row flex-nowrap">
                                                        <div className="col-md-4 p-2">
                                                            <h5 className="fw-bolder my-3">Subcategories</h5>
                                                            {category.subcategory.map((e) => {
                                                                return <Fragment key={e._id}>
                                                                    <Link to="/pocoProduct" className="text-capitalize nav-link pb-3" onClick={() => filterProd(e.product)} style={{ whiteSpace: "nowrap" }}>{e.name}</Link>
                                                                </Fragment>
                                                            })}
                                                        </div>
                                                        <div className="col-md-4 d-flex justify-content-start align-items-start flex-wrap pt-3">
                                                            {
                                                                category.brand.map((e) => {
                                                                    return <div key={e._id} className="brand">
                                                                        <img src={e.image.secure_url} alt="brand" style={{ cursor: "pointer" }} className="w-100" onClick={goToBrand} />
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="image-subcategory">
                                                                <img src={category.image.secure_url} alt="subcategory" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar