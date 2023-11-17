import * as Yup from 'yup';
import axios from "axios";
import upload from "../../Assets/upload.png";
import { useFormik } from "formik";
import { Fragment, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CategoryContext } from '../../Context/CategoryContext/Category';
import { Helmet } from "react-helmet";


const BrandManage = () => {
    const { categories } = useContext(CategoryContext);

    let validationSchema = Yup.object({
        name: Yup.string().min(3).max(30).required(),
        image: Yup.mixed().required(),
        categoryId: Yup.string().required(),
    });

    const notify = (msg, type) => toast[type](msg);
    const url = "http://localhost:5000/brand";
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
        formData.append("categoryId", values.categoryId);

        try {
            let data = await axios.post(url, formData, { headers });
            if (data.status === 201) {
                toast.success('Brand Added Successfully', { duration: 2000, className: " text-white" });
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 400 || error.response.status === 500) {
                notify(error.response.data.message, 'error')
            }
        }
    };

    let registerFormik = useFormik({
        initialValues: {
            name: '',
            categoryId: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="brand-manage my-4 mx-3">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Brand Manage</title>
            </Helmet>
            <div className="container">
                <h3 className='text-capitalize gray'>add new Brand</h3>
                <form onSubmit={registerFormik.handleSubmit}>
                    <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="subcategory"
                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                            />
                        ) : (
                            <img src={upload} alt="subcategory" />
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

                    <label htmlFor="categoryId" className='mb-3'>Choose a Category</label>
                    <select
                        name="categoryId"
                        id="categoryId"
                        className='w-100 form-control'
                        style={{ border: ".4px solid #ff8503", cursor: "pointer" }}
                        value={registerFormik.values.categoryId}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                    >
                        <option value="select category">select category</option>
                        {categories.length > 0 &&
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

                    <input
                        type="text"
                        value={registerFormik.values.name}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        id="name"
                        name="name"
                        placeholder='brand name'
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
                        Save Modifications
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BrandManage;
