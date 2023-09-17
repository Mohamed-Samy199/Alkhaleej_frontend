// import jwtDecode from "jwt-decode";
// import { createContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";


// export let AuthContext = createContext(null);

// export default function AuthContextProvider(props) {

//     const [ userData , setUserData] = useState(null)
//     let saveUserData = () =>{
//         let encodeToken = localStorage.getItem('token');
//         let decodeToken = jwtDecode(encodeToken);
//         console.log(decodeToken);
//         setUserData(decodeToken)
//     }
//     useEffect(()=>{
//         if(localStorage.getItem('token')){
//             saveUserData()
//         }
//     },[])

//     let logout = () =>{
//         localStorage.removeItem("token");
//         setUserData(null);
//         return  <Navigate to="login" />
//     }

//     return <AuthContext.Provider value={{userData , saveUserData , logout}}>
//     {props.children}
//     </AuthContext.Provider>
// }