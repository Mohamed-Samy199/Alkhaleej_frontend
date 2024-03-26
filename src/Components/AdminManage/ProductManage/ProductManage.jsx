import * as Yup from 'yup';
import axios from "axios";
import upload from "../../Assets/upload.png";
import upload2 from "../../Assets/upload2.png"
import { useFormik } from "formik";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CategoryContext } from '../../Context/CategoryContext/Category';
import { Helmet } from 'react-helmet';
import { baseUrl } from '../../../Utils/baseUrl';

const ProductManage = () => {
    const { categories, brands, language, t , getAllProduct , setProducts} = useContext(CategoryContext);
    const inputRef = useRef(null);
    const inputImagesRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [subCtgId, setSubCtgId] = useState([]);
    const [getSub, setGetSub] = useState([]);
    const [loading , setLoading] = useState(false);

    let validationSchema = Yup.object({
        name: Yup.string().min(3).max(30).required(),
        stock: Yup.number().required(),
        price: Yup.number().required(),
        discount: Yup.number(),
        description: Yup.string().min(3).max(1500).required(),
        mainImage: Yup.mixed().required(),

        categoryId: Yup.string().required(),
        subcategoryId: Yup.string().required(),
        brandId: Yup.string().required(),
    });
    const notify = (msg, type) => toast[type](msg);
    const url = `${baseUrl}/product`;
    const headers = {
        "Content-Type": "multipart/form-data",
        "authorization": `Muhammad__${localStorage.getItem("token")}`
    };

    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleImagesClick = () => {
        inputImagesRef.current.click();
    };
    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };
    const handleSubmit = async (values) => {
        const filterSub = subCtgId && subCtgId?.find(id => id);
        const subcategoryId = filterSub._id;

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("stock", values.stock);
        formData.append("price", values.price);
        formData.append("discount", values.discount);
        formData.append("description", values.description);
        formData.append("categoryId", values.categoryId);
        formData.append("subcategoryId", subcategoryId);
        formData.append("brandId", values.brandId);

        formData.append("mainImage", selectedFile);
        selectedFiles.forEach((file) => {
            formData.append(`subImages`, file);
        });

        try {
            setLoading(true);
            let data = await axios.post(url, formData, {
                headers
            });
            if (data.status === 201) {
                setLoading(false);
                getAllProduct('product', setProducts);
                toast.success('Product Added Successfully', { duration: 2000, className: " text-white" });
            }
        } catch (error) {
            if (error) {
                setLoading(false);
                notify(error.response.data.message, 'error')
            }
        }
    };

    let registerFormik = useFormik({
        initialValues: {
            name: '',
            stock: '',
            price: '',
            discount: '',
            description: '',
            categoryId: '',
            subcategoryId: '',
            brandId: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    const subFilter = (e) => {
        const categoryId = e.target.value;
        const subcategories = categories?.find(category => category._id === categoryId).subcategory
        setSubCtgId(subcategories);

        const getSubCategories = subcategories?.map(sub => sub.name)
        setGetSub(getSubCategories)
    }
    useEffect(() => {
        setGetSub(getSub)
    }, [])

    return (
        <div className="product-manage my-4 mx-3">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Manage Products")}</title>
            </Helmet>
            <div className="container" dir={language === "ar" ? "rtl" : "ltr"}>
                <h3 className='text-capitalize gray'>{t("add new Product")}</h3>
                <form onSubmit={registerFormik.handleSubmit}>
                    <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
                        <h5 className='text-muted'>{t("select main image")}</h5>
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="mainImage"
                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                            />
                        ) : (
                            <img src={upload} alt="mainImage" />
                        )}
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={(e) => {
                                registerFormik.handleChange(e);
                                handleImageChange(e);
                            }}
                            onBlur={registerFormik.handleBlur}
                            name="mainImage"
                            className="form-control mb-3 d-none"
                        />
                    </div>
                    {registerFormik.errors.mainImage && registerFormik.touched.mainImage ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.mainImage}
                        </div>
                    ) : null}

                    <div onClick={handleImagesClick} style={{ cursor: "pointer" }}>
                        <h5 className='text-muted'>{t("select sub image")}</h5>
                        {selectedFiles && selectedFiles?.length > 0 ? (
                            selectedFiles.map((file, index) => (
                                <div key={index}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`image-${index}`}
                                        style={{ width: "200px", height: "200px", objectFit: "cover", marginLeft: "35px" }}
                                    />
                                </div>
                            ))
                        ) : (
                            <img src={upload2} alt="subImages" style={{ width: "200px", height: "200px", objectFit: "cover", marginLeft: "35px" }} />
                        )}
                        <input
                            type="file"
                            ref={inputImagesRef}
                            onChange={handleImagesChange}
                            onBlur={registerFormik.handleBlur}
                            name={`subImages`}
                            id='subImages'
                            className="form-control my-3 d-none"
                        />
                    </div>

                    <input
                        type="text"
                        value={registerFormik.values.name}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        id="name"
                        name="name"
                        className="form-control my-3"
                        placeholder={`${t("product name")}`}
                    />
                    {registerFormik.errors.name && registerFormik.touched.name ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.name}
                        </div>
                    ) : null}

                    <input
                        type="number"
                        value={registerFormik.values.stock}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        id="stock"
                        name="stock"
                        className="form-control my-3"
                        placeholder={`${t("stock")}`}
                    />
                    {registerFormik.errors.stock && registerFormik.touched.stock ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.stock}
                        </div>
                    ) : null}

                    <input
                        type="number"
                        value={registerFormik.values.price}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        id="price"
                        name="price"
                        className="form-control my-3"
                        placeholder={`${t("price")}`}
                    />
                    {registerFormik.errors.price && registerFormik.touched.price ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.price}
                        </div>
                    ) : null}

                    <input
                        type="number"
                        value={registerFormik.values.discount}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        id="discount"
                        name="discount"
                        className="form-control my-3"
                        placeholder={`${t("discount")}`}
                    />
                    {registerFormik.errors.discount && registerFormik.touched.discount ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.discount}
                        </div>
                    ) : null}

                    <select
                        name="categoryId"
                        id="categoryId"
                        className='w-100 form-control text-muted'
                        style={{ border: ".4px solid #48BDCB", cursor: "pointer" }}
                        value={registerFormik.values.categoryId}
                        onChange={(e) => {
                            registerFormik.handleChange(e);
                            subFilter(e)
                        }}
                        onBlur={registerFormik.handleBlur}
                    >
                        <option value="select category">{t("select category")}</option>
                        {categories && categories.length > 0 &&
                            categories.map((category) => (
                                <Fragment key={category._id}>
                                    <option value={category._id}>{category.name}</option>
                                </Fragment>
                            ))}
                    </select>
                    {registerFormik.errors.categoryId && registerFormik.touched.categoryId ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.categoryId}
                        </div>
                    ) : null}

                    <select
                        name="subcategoryId"
                        id="subcategoryId"
                        className='w-100 form-control text-muted my-3'
                        style={{ border: ".4px solid #48BDCB", cursor: "pointer" }}
                        value={registerFormik.values.subcategoryId}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                    >
                        <option value="select category">{t("select subcategory")}</option>
                        {getSub && getSub.length > 0 &&
                            getSub.map((sub) => (
                                <Fragment key={sub}>
                                    <option value={sub}>{sub}</option>
                                </Fragment>
                            ))}
                    </select>
                    {registerFormik.errors.subcategoryId && registerFormik.touched.subcategoryId ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.subcategoryId}
                        </div>
                    ) : null}
                    <select
                        name="brandId"
                        id="brandId"
                        className='w-100 form-control text-muted'
                        style={{ border: ".4px solid #48BDCB", cursor: "pointer" }}
                        value={registerFormik.values.brandId}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                    >
                        <option value="select category">{t("select brand")}</option>
                        {brands && brands.length > 0 &&
                            brands.map((brand) => (
                                <Fragment key={brand.name}>
                                    <option value={brand._id}>{brand.name}</option>
                                </Fragment>
                            ))}
                    </select>
                    {registerFormik.errors.brandId && registerFormik.touched.brandId ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.brandId}
                        </div>
                    ) : null}

                    <textarea
                        value={registerFormik.values.description}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        style={{ border: ".4px solid #48BDCB" }}
                        id="description"
                        name="description"
                        className="form-control my-3"
                        placeholder={`${t("description")}`} ></textarea>
                    {registerFormik.errors.description && registerFormik.touched.description ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.description}
                        </div>
                    ) : null}

                    <button
                        disabled={!(registerFormik.dirty && registerFormik.isValid)}
                        className="btn btn-orange mt-3"
                        type="submit"
                    >
                        {loading ?
                            <div>{t("Uploading...")}  <i className="fas fa-spinner fa-spin"></i></div> :
                            <div>{t("Save Modifications")}</div>
                        }

                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductManage;