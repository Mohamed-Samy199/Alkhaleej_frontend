import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { baseUrl } from "../../../Utils/baseUrl";
import { Navigate } from "react-router-dom";

export let CategoryContext = createContext(null);

export function CategoryContextProvider(props) {
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "authorization": `Muhammad__${localStorage.getItem("token")}`
    }
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);


    // language
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    const handleChangeLangauge = (lang) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    }

    // local langauge 
    const [t, seti18next] = useTranslation();
    const [navPosition, setNavPosition] = useState("right"); // Default position is "right"

    useEffect(() => {
        seti18next.changeLanguage(language);

        if (!localStorage.getItem("language")) {
            localStorage.setItem("language", "en");
        }

        let rightOrLeft = localStorage.getItem("language") === "en" ? "right" : "left";
        setNavPosition(rightOrLeft || "right");
        // Perform other side effects here, if needed
    }, [language, seti18next]);

    // category
    const getAllCategories = async (urlData, callback) => {
        let { data } = await axios.get(`${baseUrl}/${urlData}`);
        callback(data.category);
    }
    useEffect(() => {
        getAllCategories('category', setCategories);
        getAllCategories('brand', setBrands);
        getAllCategories('product', setProducts);

    }, []);

    // admin -> users, payments
    const getAllUsers = async (urlData, callback) => {
        let { data } = await axios.get(`${baseUrl}/${urlData}`, { headers });
        callback(data);
    }
    useEffect(() => {
        getAllUsers('order', setPayments);
        getAllUsers('auth', setUsers);
    }, [])

    // subcategry
    let [subItems, setSubItems] = useState([]);
    const sendSubcategory = (e) => {
        setSubItems(e);
    }
    // delete subcategory
    const handeleDeleteSubcategory = async (category, sub) => {
        try {

            const { data } = await axios.delete(`${baseUrl}/category/${category}/subcategory/${sub}`, { headers });
            if (data.status === 200) {
                toast.success("Product deleted", { duration: 3000 });
                return true;
            } else {
                toast.error(data.message, { duration: 3000 });
                return false;
            }
        } catch (error) {
            toast.error(error.response.data.message, "error");
        }
    };
    // delete review 
    const handeleDeleteReviw = async (productId, reviewId) => {
        try {
            const data = await axios.delete(`${baseUrl}/product/review/${productId}/${reviewId}`, { headers });
            if (data.status === 200) {
                toast.success(data.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message, "error");
        }
    }
    // filter product
    let [subProds, setSubProd] = useState([])
    const sendProduct = (e) => {
        setSubProd(e);
    }
    // brand
    const getAllBrand = async (urlData, callback) => {
        let { data } = await axios.get(`${baseUrl}/${urlData}`);
        callback(data.brand);
    }
    useEffect(() => {
        getAllBrand('brand', setBrands);
    }, [])

    // product
    const getAllProduct = async (urlData, callback) => {
        let { data } = await axios.get(`${baseUrl}/${urlData}`);
        callback(data.products);
    }
    useEffect(() => {
        getAllProduct('product', setProducts);
    }, [])

    // search product
    const [search, setSearch] = useState("")
    const searchProduct = (e) => {
        setSearch(e.target.value);
    }
    const nameFilterProducts = () => {
        if (search.length !== 0) {
            return products?.filter((e) => language === "en" ? e.name.toLowerCase().includes(search) : e.translations[language].includes(search))
        }
        return products;
    }

    // filter data product from subcategory 
    let [filterProdCategory, setfilterProdCategory] = useState([])
    const filterProd = (e) => {
        setfilterProdCategory(e)
    }
    // delete category, brand, product
    const handeleDelete = async (product, id) => {
        try {
            const { data } = await axios.delete(`${baseUrl}/${product}/${id}`, { headers });
            if (data.status === 200) {
                // setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
                toast.success("Product deleted", { duration: 3000 });
                return true;
            } else {
                toast.error(data.message, { duration: 3000 });
                return false;
            }
        } catch (error) {
            toast.error(error.response.data.message, "error");
        }
    };

    // cart products
    const [userCartId, setUserCartId] = useState(null)
    const [cartId, setCartId] = useState(null);
    const [cartProducts, setCartProducts] = useState(null);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    // wishlist products
    const [numOfWishlist, setNumOfWishlist] = useState(0);
    const [wishlistProducts, setWishlistProducts] = useState([]);


    // cart
    let addProductCart = async (prodId) => {
        try {
            let data = await axios.post(`${baseUrl}/cart`, {
                "productId": prodId
            }, {
                headers
            })
            if (data.status === 200) {
                setUserCartId(data.data.cart.userId)
                setNumOfCartItems(data.data.numOfCartItems)
                setCartProducts(data.data.cart.products)
                getCartProduct()
                toast.success(data.data.message);
                return true;
            } else {
                toast.error(data.data.message, { duration: 1000, className: "bg-danger text-white" });
                return false;
            }
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("yor session out, try to login again", { duration: 1000, className: "bg-danger text-white" });
            }
        }
    }
    let getCartProduct = async () => {
        try {
            let data = await axios.get(`${baseUrl}/cart`, {
                headers
            })
            if (data.status === 200) {
                setUserCartId(data.data.cart.userId)
                setNumOfCartItems(data.data.numOfCartItems)
                setCartProducts(data.data.cart.products)
                setCartId(data.data.cart._id);
                localStorage.setItem("cartId", data.data.cart._id)
            }
        } catch (error) {
            if (error.response.status == 404) {
                toast.error("No Cart exist for this User", { duration: 2000, className: "text-danger px-4 fw-bolder" });
                <Navigate to='/' />
            }
        }
    }
    let removeCartItem = async (prodId) => {
        try {
            let data = await axios.patch(`${baseUrl}/cart/remove`, {
                "productId": prodId,
            }, {
                headers
            })
            if (data.status === 200) {
                setUserCartId(data.data.cart.userId)
                setNumOfCartItems(data.data.numOfCartItems)
                setCartProducts(data.data.cart.products)
                getCartProduct()
                toast.success('Product removed successfully from your cart', {
                    duration: 3000, className: " text-white", iconTheme: {
                        primary: '#fff',
                        secondary: '#fff',
                    },
                });
                return true;
            } else {
                toast.error(data.message, { duration: 3000, className: "bg-danger text-white" });
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
    let clearCartData = async (id) => {
        try {
            let data = await axios.patch(`${baseUrl}/cart/clear`, {
                "userId": id
            },
                {
                    headers
                })
            if (data.status === 200) {
                setCartProducts(data.data.cart.products)
                setCartId(data.data.cart._id);
                localStorage.removeItem("cartId")
                getCartProduct()
                toast.success('Cart clear successfully', {
                    duration: 3000, className: " text-white", iconTheme: {
                        primary: '#fff',
                        secondary: '#fff',
                    },
                });
                return true;
            } else {
                toast.error(data.message, { duration: 3000, className: "bg-danger text-white" });
                return false;
            }
        } catch (error) {
            if (error.response.status == 404) {
                toast.error("No Cart exist for this User", { duration: 2000, className: "text-danger px-4 fw-bolder" });
                <Navigate to='/' />
            }
        }
    }
    // update quntity
    let updateCartQuantity = async (prodId, action) => {
        try {
            let data = await axios.patch(
                `${baseUrl}/cart/update/${prodId}/${action}`,
                {},
                {
                    headers,
                }
            );
            console.log(data.data);
            if (data.status === 200) {
                getCartProduct()
                toast.success('Quantity updated successfully.', {
                    duration: 3000,
                    className: 'text-white',
                    iconTheme: {
                        primary: '#fff',
                        secondary: '#fff',
                    },
                });
                return true;
            } else {
                toast.error(data.message, {
                    duration: 3000,
                    className: 'bg-danger text-white',
                });
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    };

    // wishlist
    let addToWishlist = async (wishId) => {
        try {
            let data = await axios.post(`${baseUrl}/product/wishlist`, {
                "productId": wishId
            }, {
                headers
            })
            if (data.status === 200) {
                setNumOfWishlist(data.data.numOfCartItems)
                setWishlistProducts(data.data.wishlist);
                getWishlist();
                toast.success("add to your liked", { duration: 3000, className: " text-white" });
                return true;
            } else {
                toast.error(data.message, { duration: 3000, className: "text-white" });
                return false;
            }
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("yor session out, try to login again", { duration: 1000, className: "bg-danger text-white" });
            }
        }
    }
    let removeFromWishlist = async (wishId) => {
        try {
            let data = await axios.patch(`${baseUrl}/product/wishlist/remove`, {
                "productId": wishId
            }, {
                headers
            })
            if (data.status === 200) {
                setNumOfWishlist(data.data.numOfCartItems)
                setWishlistProducts(data.data.wishlist);
                getWishlist();
                toast.success("remove your liked", { duration: 3000, className: " text-white" });
                return true
            } else {
                toast.error(data.message, { duration: 3000, className: "text-white" });
                return false;
            }
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("yor session out, try to login again", { duration: 1000, className: "bg-danger text-white" });
            }
        }
    }
    let getWishlist = async () => {
        try {
            let data = await axios.get(`${baseUrl}/product/wishlist/wishlist/wishlist`, {
                headers
            })
            if (data.status === 200) {
                setNumOfWishlist(data.data.numOfCartItems)
                setWishlistProducts(data.data.wishlist.wishlist);
            }
            return true
        } catch (error) {
            console.log(error);
        }
    }

    // coupon
    let [coupon, setCoupon] = useState(null)
    let getCoupon = async () => {
        try {
            let data = await axios.get(`${baseUrl}/coupon`, {
                headers
            })
            if (data.status === 200) {
                setCoupon(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCartProduct()
    }, []);
    useEffect(() => {
        getWishlist()
    }, [])
    useEffect(() => {
        getCoupon()
    }, []);

    return <CategoryContext.Provider value={{
        categories, setCategories,
        subItems, sendSubcategory,
        brands,
        users,
        payments,
        products, setProducts,
        search, searchProduct,
        nameFilterProducts,
        subProds, sendProduct,
        filterProdCategory, filterProd,
        handeleDelete,
        handeleDeleteSubcategory,
        handeleDeleteReviw,

        language,
        handleChangeLangauge,
        t, seti18next,
        navPosition, setNavPosition,

        getAllCategories,
        setBrands,
        getAllBrand,
        getAllProduct,

        userCartId,
        cartId,
        cartProducts, setCartProducts,
        addProductCart,
        removeCartItem,
        clearCartData,
        numOfCartItems,
        getCartProduct,
        updateCartQuantity,

        coupon,

        numOfWishlist,
        wishlistProducts,
        addToWishlist,
        removeFromWishlist,

    }}>
        {props.children}
    </CategoryContext.Provider>
}