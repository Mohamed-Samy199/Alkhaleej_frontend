import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './i18n.js';
import './index.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-simple-typewriter/dist/index'
import { CategoryContextProvider } from './Components/Context/CategoryContext/Category';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(

    <GoogleOAuthProvider clientId="135958270131-l8hbjdidks4uhs0iidai3hsqsfn4o11g.apps.googleusercontent.com">
        <CategoryContextProvider>
            <App />
        </CategoryContextProvider>
    </GoogleOAuthProvider>
)

