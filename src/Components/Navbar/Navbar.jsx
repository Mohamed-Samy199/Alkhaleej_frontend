import { Link, NavLink, useNavigate } from "react-router-dom";
import logoEN from "../Assets/Alkhaleej.svg";
import logoAR from "../Assets/AlkhaleejAr.svg";
import eng from "../Assets/eng.png";
import arb from "../Assets/arb.png";
import profile from "../Assets/profile.webp";
import { Fragment, useContext, useState } from "react";
import { CategoryContext } from "../Context/CategoryContext/Category";
import './Navbar.modules.scss';
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";


const Navbar = ({ userData, logout }) => {
    const { categories, sendSubcategory, filterProd, numOfCartItems, language, t,
        numOfWishlist, navPosition, handleChangeLangauge, seti18next, setNavPosition } = useContext(CategoryContext);
    let navigate = useNavigate();
    const goToBrand = () => {
        navigate("/brand")
    }
    const [model, setModel] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false); // State to manage sidebar visibility

    // Function to toggle the sidebar
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };


    return (
        <div className="navbar-component position-fixed top-0 start-0 end-0" style={{ zIndex: "1000" }}>
            {/*popup map*/}
            <Modal size="lg" isOpen={model} toggle={() => setModel(!model)}>
                <ModalHeader toggle={() => setModel(!model)}>
                    <i className="fa-solid fa-location-dot main-color fs-3"></i> {t("Location")}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg={12}>
                            <iframe className="w-100" style={{ height: "450px", zIndex: "1000000000" }} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3453.2491326923096!2d31.24919378573608!3d30.058392519100202!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584119bbbcadc5%3A0xf25b524e5da410ba!2z2KfZhNiu2YTZitisINmE2YTYqtis2KfYsdipINmI2KfZhNiq2YjYsdmK2K_Yp9iq!5e0!3m2!1sar!2seg!4v1703371489402!5m2!1sar!2seg" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <nav className="navbar navbar-expand-lg p-3">
                <div className="container-fluid ">
                    <NavLink className="navbar-brand navbar-brand-logo" to="/" style={{ width: "150px", height: "90px" }}>
                        <img src={language === "en" ? logoEN : logoAR} alt='Alkhaleej' className="w-100" style={{ objectFit: "cover" }} />
                    </NavLink>
                    <div className="d-flex justify-content-center align-items-center navbar-toggler-content gap-2">
                        <div className="navbar-toggler navbar-toggler-show border-0" style={{ cursor: "pointer" }} onClick={toggleShowMore} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            {showMore ? "show more" : "show less"}
                        </div>
                        {/* Toggle button for sidebar */}
                        <button
                            className="navbar-toggler me-1 d-block d-lg-none" // Show only on small screens
                            type="button"
                            onClick={toggleSidebar}
                            style={{ zIndex: "0", border: "none" }}
                        >
                            {
                                showSidebar ?
                                    <span><i className="fa-solid fa-x"></i></span> :
                                    <span className="navbar-toggler-icon" />
                            }
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {
                                    userData && userData.role === "Admin"
                                        ? <NavLink className="nav-link dark" aria-current="page" to="/newAdmin">{t("Create Admin")}</NavLink>
                                        : <NavLink className="nav-link dark" aria-current="page" to="/">{t("Home")}</NavLink>

                                }
                            </li>

                            {
                                userData ?
                                    (userData.role === "User" ?
                                        (<li className="nav-item">
                                            <NavLink className="nav-link dark" onClick={() => setModel(true)}>{t("Deliver")}</NavLink>
                                        </li>) :
                                        (<li className="nav-item dropdown">
                                            <li className="nav-link dropdown-toggle dropdown-nav" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {userData.role}
                                            </li>
                                            <ul className="dropdown-menu">
                                                <li><NavLink className="nav-link" to="/control_board">{t("Control")}</NavLink></li>
                                                <li><NavLink className="nav-link" to="/all_admin">{t("All Admins")}</NavLink></li>
                                                <li><NavLink className="nav-link" to="/remove_admin">{t("Remove Admin")}</NavLink></li>
                                                <li><NavLink className="nav-link" to="/payments">{t("Show Payments")}</NavLink></li>
                                            </ul>
                                        </li>
                                        )
                                    ) :
                                    (<li className="nav-item">
                                        <NavLink className="nav-link dark" onClick={() => setModel(true)}>{t("Deliver")}</NavLink>
                                    </li>)
                            }
                        </ul>

                        <form className="d-flex w-100 search-nav" role="search" dir={language === "ar" ? "rtl" : "ltr"}>
                            <div className="dropdown w-100">
                                <button className="btn w-100 text-muted bg-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {t("look")}
                                </button>
                                <ul className="dropdown-menu w-100">
                                    {
                                        categories && categories?.map((category) => {
                                            return <li key={category._id} className={`nav-item mx-2 ${navPosition === "right" ? "text-start" : "text-end"}`}>
                                                <Link to="/subcategory" className="nav-link ms-2 mb-2 fw-bolder text-capitalize" onClick={() => sendSubcategory(category.subcategory)}>
                                                    {category.translations[language] === "en" ? `${category.name}` : `${category.translations[language]}`}
                                                    {navPosition === "right" ? <i className="fa-solid fa-caret-right"></i> : <i className="fa-solid fa-caret-left"></i>}

                                                </Link>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>

                        </form>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                userData ? (
                                    <Fragment>
                                        <li className="nav-item logout">
                                            <NavLink className="nav-link dark" onClick={logout} style={{ width: "75px" }}>{t("logout")}</NavLink>
                                        </li>
                                        <li className="nav-item move-item">
                                            <NavLink className="nav-link light me-3" to="/wishlist">
                                                <i className="fa-regular fa-heart fs-4"></i>
                                                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                                                    {numOfWishlist}
                                                </span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item move-item">
                                            <NavLink className="nav-link position-relative light" to="cart">
                                                <i className="fa-solid fa-cart-shopping fs-3"></i>
                                                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                                                    {numOfCartItems}
                                                </span>
                                            </NavLink>
                                        </li>

                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <li className="nav-item">
                                            <NavLink className="nav-link dark" to="/login" style={{ width: "75px" }}>{t("signin")}</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link dark" to="/register" style={{ width: "65px" }}>{t("register")}</NavLink>
                                        </li>
                                    </Fragment>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className={`sidebar ${showSidebar ? 'show-side' : ''}`}>
                <nav className="navbar nav-show secand-color ps-3 py-0" >
                    <div className={`container-fluid navbar sidebar-toggle secand-color ${navPosition === "right" ? "justify-content-start" : "justify-content-start flex-row-reverse"}`}>
                        <button className="fs-5 pe-2 mx-2 secand-color dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon dark"></span> {t("All")}
                        </button>
                        <NavLink className="navbar-brand px-2 dark" to="/">{t("Home")}</NavLink>
                        <NavLink className="navbar-brand px-2 dark" to="/products">{t("Products")}</NavLink>
                        <NavLink className="navbar-brand px-2 dark" to="/category">{t("Categories")}</NavLink>
                        <NavLink className="navbar-brand px-2 dark" to="/brand">{t("Brands")}</NavLink>
                        <NavLink className="navbar-brand px-2 dark" to="/support">{t("Support")}</NavLink>
                        {
                            userData ? (
                                <NavLink className="navbar-brand px-2 dark" to="/orders">{t("Orders")}</NavLink>
                            ) : (null)
                        }
                        <div className={`offcanvas ${navPosition === "right" ? "offcanvas-end" : "offcanvas-start"}`} tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header secand-color">
                                <div className="d-flex justify-content-center align-items-center flex-nowra" id="offcanvasNavbarLabel">
                                    <div className="profile-image me-3">
                                        <img src={profile} alt="profile Alkhaleej" className="rounded-circle" />
                                    </div>
                                    <h4 className="pt-2 text-white" style={{ whiteSpace: "nowrap" }}>{t("Hello")}<span>, {
                                        userData && userData.userName ? (
                                            <Fragment>
                                                <span>{userData.userName}</span>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <span>{t("signin")}</span>
                                            </Fragment>
                                        )
                                    }</span></h4>
                                </div>
                                <button type="button" className="btn-close text-white" data-bs-dismiss="offcanvas" aria-label="Close" />
                            </div>
                            <h4 className="offcanvas-title ms-4 m-3" >{t("AllCategories")}</h4>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    {
                                        categories && categories?.map((category) => {
                                            return <li className="nav-item" key={category._id}>
                                                <Link to="/subcategory" className="nav-link ms-2 mb-2 fw-bolder text-capitalize" onClick={() => sendSubcategory(category.subcategory)}>
                                                    {category.translations[language] === "en" ? `${category.name}` : `${category.translations[language]}`}
                                                    <i className="fa-solid fa-caret-right"></i>
                                                </Link>
                                                <div className="box-details position-absolute shadow-lg">
                                                    <div>
                                                        <div className="row flex-nowrap">
                                                            <div className="col-md-4 p-2">
                                                                <h5 className="fw-bolder my-3">{t("Subcategories")}</h5>
                                                                <div className="sub-scroll" style={{ overflowY: "auto", maxHeight: "300px" }}>
                                                                    {category && category.subcategory && category?.subcategory?.map((e) => {
                                                                        return <Fragment key={e._id}>
                                                                            <Link to="/pocoProduct" className="text-capitalize  nav-link pb-3" onClick={() => filterProd(e.product)} style={{ whiteSpace: "nowrap" }}>
                                                                                {e.translations[language] === "en" ? `${e.name}` : `${e.translations[language]}`}
                                                                            </Link>
                                                                        </Fragment>
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 d-flex justify-content-start align-items-start flex-wrap pt-3 brand-navbar">
                                                                {
                                                                    category && category.brand && category?.brand?.slice(0, 4).map((e) => {
                                                                        return <div key={e._id} className="brand">
                                                                            <img src={e.image.secure_url} alt="brand Alkhaleej" style={{ cursor: "pointer", height: "120px" }} className="w-100" onClick={goToBrand} />
                                                                        </div>
                                                                    })
                                                                }
                                                            </div>
                                                            <div className="col-md-6 subcategory-navbar">
                                                                <div className="image-subcategory">
                                                                    <img src={category.image.secure_url} alt="subcategory Alkhaleej" />
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

                        <div className={`navbar-nav mx-3 ${language === "en" ? "ms-auto " : "me-auto"}`}>
                            <h4 style={{ cursor: "pointer" }} onClick={() => {
                                handleChangeLangauge(language === "en" ? "ar" : "en");
                                seti18next.changeLanguage(language === "en" ? "ar" : "en");
                                setNavPosition(navPosition === "right" ? "left" : "right");
                            }}>{language === "en" ?
                                <span>English<img src={eng} className="ps-1" alt="en Alkhaleej" /></span>
                                : <span><img src={arb} className="pe-1" alt="ar Alkhaleej" />العربية</span>}
                            </h4>
                        </div>

                    </div>
                </nav>
            </div>


        </div>
    )
}

export default Navbar