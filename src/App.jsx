import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
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
import Reviews from "./Components/Reviews/Reviews"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import NotFound from "./Components/404/404"
import FilterCategory from "./Components/FilterCategory/FilterCategory"
import ControlBoard from "./Components/ContorlBoard/ControlBoard"
import CategoryManage from "./Components/AdminManage/CategoryManage/CategoryManage"
import SubcategoryManage from "./Components/AdminManage/SubcategoryManage/SubcategoryManage"
import ProductManage from "./Components/AdminManage/ProductManage/ProductManage"
import BrandManage from "./Components/AdminManage/BrandManage/BrandManage"
import { ToastContainer } from "react-toastify"
import { useEffect, useState } from "react"
import jwtDecode from "jwt-decode"
import NewAdmin from "./Components/NewAdmin/NewAdmin";
import Support from "./Components/Support/Support";
import Help from "./Components/Help/Help";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist"
import Payment from "./Components/Payment/Payment";
import PaymentCart from "./Components/PaymentCart/PaymentCart";
import Orders from "./Components/Orders/Orders";
import RemoveAdmin from "./Components/AdminManage/RemoveAdmin/RemoveAdmin";
import AllAdmins from "./Components/AdminManage/AllAdmins/AllAdmins";
import AllPayments from "./Components/AdminManage/AllPayments/AllPayments";


const App = () => {

    const [userData, setUserData] = useState(null)
    let saveUserData = () => {
        let encodeToken = localStorage.getItem('token');
        let decodeToken = jwtDecode(encodeToken);
        setUserData(decodeToken);
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            saveUserData();
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
                { path: 'register', element: <Register saveUserData={saveUserData} /> },
                { path: 'login', element: <Login saveUserData={saveUserData} /> },
                { path: 'category', element: <Category userData={userData} /> },
                { path: "filterCategory", element: <FilterCategory /> },
                {
                    path: 'subcategory', element: <Subcategories />, children: [
                        { index: true, element: <FilterProduct /> },
                    ]
                },
                { path: 'brand', element: <Brand userData={userData} /> },
                { path: 'brand/:_id', element: <SameBrand /> },
                {
                    path: 'products', element: <Products />, children: [
                        { index: true, element: <AllProduct userData={userData} /> },
                        { path: "product", element: <Product /> },
                    ]
                },
                { path: "product/:_id/:name", element: <ProductDetails userData={userData} /> },
                { path: "pocoProduct", element: <PocoProducts /> },

                { path: "review", element: <ProtectedRoute userData={userData}><Reviews /></ProtectedRoute> },
                { path: "support", element: <Support /> },
                { path: "help", element: <Help /> },
                { path: "cart", element: <ProtectedRoute userData={userData}><Cart /></ProtectedRoute> },
                { path: "wishlist", element: <ProtectedRoute userData={userData}><Wishlist /></ProtectedRoute> },
                { path: "payment", element: <ProtectedRoute userData={userData}><Payment /></ProtectedRoute> },
                { path: "card", element: <ProtectedRoute userData={userData}><PaymentCart /></ProtectedRoute> },
                { path: "orders", element: <ProtectedRoute userData={userData}><Orders /></ProtectedRoute> },
                { path: "newAdmin", element: <ProtectedRoute userData={userData}><NewAdmin userData={userData}/></ProtectedRoute> },
                { path: "remove_admin", element: <ProtectedRoute userData={userData}><RemoveAdmin userData={userData}/></ProtectedRoute> },
                { path: "all_admin", element: <ProtectedRoute userData={userData}><AllAdmins userData={userData}/></ProtectedRoute> },
                { path: "payments", element: <ProtectedRoute userData={userData}><AllPayments userData={userData}/></ProtectedRoute> },
                {
                    path: "control_board", element: <ProtectedRoute userData={userData}><ControlBoard userData={userData}/></ProtectedRoute>, children: [
                        { index: true, element: <ProtectedRoute userData={userData}><CategoryManage /></ProtectedRoute> },
                        { path: "subcategoey_manage", element: <ProtectedRoute userData={userData}><SubcategoryManage /></ProtectedRoute> },
                        { path: "product_manage", element: <ProtectedRoute userData={userData}><ProductManage /></ProtectedRoute> },
                        { path: "brand_manage", element: <ProtectedRoute userData={userData}><BrandManage /></ProtectedRoute> },
                    ]
                },
                { path: "*", element: <NotFound /> }
            ]
        }
    ]);

    return (
        <div>
            <ToastContainer theme="colored" />
            <RouterProvider router={routes} />
        </div>
    )
}

export default App;