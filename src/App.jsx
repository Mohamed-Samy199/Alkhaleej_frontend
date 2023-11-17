import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./Components/Home/Home"
import MainLayout from "./Components/MainLayout/MainLayout"
import Products from "./Components/Products/Products"
import Category from "./Components/Category/Category"
import Brand from "./Components/Brand/Brand"
import Subcategories from "./Components/Subcategories/Subcategories"
import Product from "./Components/ProductChlid/Product"
import AllProduct from "./Components/AllProduct/AllProduct"
import FilterProduct from "./Components/FilterProduct/FilterProduct"
import PocoProducts from "./Components/PocoProducts/PocoProducts"
import ProductDetails from "./Components/ProductDetails/ProductDetails"
import SameBrand from "./Components/SameBrand/SameBrand"
import Register from "./Components/Register/Register"
import Login from "./Components/Login/Login"
import { ToastContainer } from "react-toastify"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import Cart from "./Components/Cart/Cart"
import Wishlist from "./Components/Wishlist/Wishlist"
import Payment from "./Components/Payment/Payment"
import Orders from "./Components/Orders/Orders"
import PaymentCart from "./Components/PaymentCart/PaymentCart"
import Reviews from "./Components/Reviews/Reviews"
import SampleChat from "./Components/Chat/Chat"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import Coupon from "./Components/Coupon/Coupon"
import CouponDatails from "./Components/CouponDetails/CouponDatails"
import NotFound from "./Components/404/404"
import FilterCategory from "./Components/FilterCategory/FilterCategory"
import ControlBoard from "./Components/ContorlBoard/ControlBoard"
import CategoryManage from "./Components/AdminManage/CategoryManage/CategoryManage"
import SubcategoryManage from "./Components/AdminManage/SubcategoryManage/SubcategoryManage"
import ProductManage from "./Components/AdminManage/ProductManage/ProductManage"
import BrandManage from "./Components/AdminManage/BrandManage/BrandManage"

const App = () => {

    const [userData, setUserData] = useState(null)
    let saveUserData = () => {
        let encodeToken = localStorage.getItem('token');
        let decodeToken = jwtDecode(encodeToken);
        setUserData(decodeToken)
    }
    // console.log(localStorage.getItem('token'));
    // console.log(userData);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            saveUserData()
        }
    }, [])

    let logout = () => {
        localStorage.removeItem("token");
        setUserData(null);
        return <Navigate to="login" />
    }
    let routes = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout userData={userData} logout={logout} />,
            children: [
                { index: true, element: <Home /> },
                { path: 'register', element: <Register /> },
                { path: 'login', element: <Login saveUserData={saveUserData} /> },
                { path: 'category', element: <Category /> },
                { path: "filterCategory", element: <FilterCategory /> },
                {
                    path: 'subcategory', element: <Subcategories />, children: [
                        { index: true, element: <FilterProduct /> },
                    ]
                },
                { path: 'brand', element: <Brand /> },
                { path: 'brand/:_id', element: <SameBrand /> },
                {
                    path: 'products', element: <Products />, children: [
                        { index: true, element: <AllProduct /> },
                        { path: "product", element: <Product /> },
                    ]
                },
                { path: "product/:_id", element: <ProductDetails userData={userData} /> },
                { path: "pocoProduct", element: <PocoProducts /> },

                { path: "wishlist", element: <ProtectedRoute userData={userData}><Wishlist /></ProtectedRoute> },
                { path: "cart", element: <ProtectedRoute userData={userData}><Cart /></ProtectedRoute> },
                { path: "payment", element: <ProtectedRoute userData={userData}><Payment /></ProtectedRoute> },
                { path: "card", element: <ProtectedRoute userData={userData}><PaymentCart /></ProtectedRoute> },
                { path: "orders", element: <ProtectedRoute userData={userData}><Orders /></ProtectedRoute> },
                { path: "review", element: <ProtectedRoute userData={userData}><Reviews /></ProtectedRoute> },
                { path: "coupon", element: <ProtectedRoute userData={userData}><Coupon /></ProtectedRoute> },
                { path: "offer", element: <ProtectedRoute userData={userData}><CouponDatails /></ProtectedRoute> },
                { path: "control_board", element: <ProtectedRoute userData={userData}><ControlBoard /></ProtectedRoute> , children:[
                    {index : true , element : <CategoryManage/>},
                    {path : "subcategoey_manage" , element : <SubcategoryManage/>},
                    {path : "product_manage" , element : <ProductManage/>},
                    {path : "brand_manage" , element : <BrandManage/>},
                ] },
                { path: "*", element: <NotFound /> }
            ]
        }
    ])
    return (
        <div>
            <ToastContainer theme="colored" />
            <RouterProvider router={routes} />
            <SampleChat />
        </div>
    )
}

export default App