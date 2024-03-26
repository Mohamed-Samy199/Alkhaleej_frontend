import * as Yup from 'yup';
import axios from "axios";
import upload from "../../Assets/upload.png";
import { useFormik } from "formik";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { CategoryContext } from '../../Context/CategoryContext/Category';
import { baseUrl } from '../../../Utils/baseUrl';

const CategoryManage = () => {
    const { t, language , setCategories , getAllCategories } = useContext(CategoryContext);
    const [loading , setLoading] = useState(false);


    let validationSchema = Yup.object({
        name: Yup.string().min(3).max(30).required(),
        image: Yup.mixed().required(),
    });

    const notify = (msg, type) => toast[type](msg);
    const url = `${baseUrl}/category`;
    const headers = {
        "Content-Type": "multipart/form-data",
        "authorization": `Muhammad__${localStorage.getItem("token")}`
    };

    const inputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("image", selectedFile);

        try {
            setLoading(true);
            let data = await axios.post(url, formData, {
                headers
            });
            if (data.status === 201) {
                setLoading(false);
                getAllCategories('category', setCategories);
                toast.success('Category Added Successfully', { duration: 2000, className: " text-white" });
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
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="category-manage my-4 mx-3">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t("Category Manage")}</title>
            </Helmet>
            <div className="container">
                <h3 className='text-capitalize gray'></h3>
                <form onSubmit={registerFormik.handleSubmit} dir={language === "ar" ? "rtl" : "ltr"} >
                    <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="category"
                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                            />
                        ) : (
                            <img src={upload} alt="category" />
                        )}
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={(e) => {
                                registerFormik.handleChange(e);
                                handleImageChange(e);
                            }}
                            onBlur={registerFormik.handleBlur}
                            name="image"
                            className="form-control my-3 d-none"
                        />
                    </div>
                    {registerFormik.errors.image && registerFormik.touched.image ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.image}
                        </div>
                    ) : null}

                    <input
                        type="text"
                        value={registerFormik.values.name}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        id="name"
                        name="name"
                        placeholder={`${t("category name")}`}
                        className="form-control my-3"
                    />
                    {registerFormik.errors.name && registerFormik.touched.name ? (
                        <div className="alert alert-danger">
                            {registerFormik.errors.name}
                        </div>
                    ) : null}

                    <button
                        disabled={!(registerFormik.dirty && registerFormik.isValid)}
                        className="btn btn-orange mt-3"
                        type="submit"
                    >
                    {
                        loading ? 
                        <div>{t("Uploading...")}  <i className="fas fa-spinner fa-spin"></i></div> :
                        <div>{t("Save Modifications")}</div>
                    }
                        
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CategoryManage;
