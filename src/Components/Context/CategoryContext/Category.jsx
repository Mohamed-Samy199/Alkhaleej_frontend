import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export let CategoryContext = createContext(null);

export function CategoryContextProvider(props) {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);

    // category
    const getAllCategories = async (urlData, callback) => {
        let { data } = await axios.get(`http://localhost:5000/${urlData}`);
        callback(data.category);
    }
    useEffect(() => {
        getAllCategories('category', setCategories);
        getAllCategories('brand', setBrands);
    }, [])

    // subcategry
    let [subItems, setSubItems] = useState([])
    const sendSubcategory = (e) => {
        setSubItems(e);
    }
    // filter product
    let [subProds, setSubProd] = useState([])
    const sendProduct = (e) => {
        setSubProd(e);
    }
    // brand
    const getAllBrand = async (urlData, callback) => {
        let { data } = await axios.get(`http://localhost:5000/${urlData}`);
        callback(data.brand);
    }
    useEffect(() => {
        getAllBrand('brand', setBrands);
    }, [])

    // product
    const getAllProduct = async (urlData, callback) => {
        let { data } = await axios.get(`http://localhost:5000/${urlData}`);
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
            return products.filter((e) => e.name.includes(search))
        }
        return products;
    }

    // filter data product from subcategory 
    let [filterProdCategory, setfilterProdCategory] = useState([])
    const filterProd = (e) => {
        setfilterProdCategory(e)
    }

    // cart products
    const [userCartId, setUserCartId] = useState(null)
    const [cartId, setCartId] = useState(null);
    const [cartProducts, setCartProducts] = useState(null);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    // wishlist products
    const [numOfWishlist, setNumOfWishlist] = useState(0);
    const [wishlistProducts, setWishlistProducts] = useState([]);

    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "authorization": `Muhammad__${localStorage.getItem("token")}`
    }
    // cart
    let addProductCart = async (prodId) => {
        try {
            let data = await axios.post("http://localhost:5000/cart", {
                "productId": prodId
            }, {
                headers
            })
            if (data.status === 200) {
                setUserCartId(data.data.cart.userId)
                setNumOfCartItems(data.data.numOfCartItems)
                setCartProducts(data.data.cart.products)
                getCartProduct()
                toast.success(data.data.message, { duration: 1000, className: " text-white" });
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
            let data = await axios.get("http://localhost:5000/cart", {
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
            let data = await axios.patch("http://localhost:5000/cart/remove", {
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
            let data = await axios.patch("http://localhost:5000/cart/clear", {
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
    // wishlist
    let addToWishlist = async (wishId) => {
        try {
            let data = await axios.post(`http://localhost:5000/product/wishlist`, {
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
            let data = await axios.patch(`http://localhost:5000/product/wishlist/remove`, {
                "productId": wishId
            }, {
                headers
            })
            if (data.status === 200) {
                setNumOfWishlist(data.data.numOfCartItems)
                setWishlistProducts(data.data.wishlist);
                getWishlist();
                toast.success("remove your liked", { duration: 3000, className: " text-success" });
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
            let data = await axios.get("http://localhost:5000/product/wishlist/wishlist", {
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
            let data = await axios.get("http://localhost:5000/coupon", {
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
    }, [])
    useEffect(() => {
        getWishlist()
    }, [])
    useEffect(() => {
        getCoupon()
    }, [])

    return <CategoryContext.Provider value={{
        categories, setCategories,
        subItems, sendSubcategory,
        brands,
        products, setProducts,
        search, searchProduct,
        nameFilterProducts,
        subProds, sendProduct,
        filterProdCategory, filterProd,

        userCartId,
        cartId,
        cartProducts, setCartProducts,
        addProductCart,
        removeCartItem,
        clearCartData,
        numOfCartItems,

        numOfWishlist,
        wishlistProducts,
        addToWishlist,
        removeFromWishlist,

        coupon
    }}>
        {props.children}
    </CategoryContext.Provider>
}