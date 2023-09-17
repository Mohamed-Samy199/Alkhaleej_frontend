import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-simple-typewriter/dist/index'
import { CategoryContextProvider } from './Components/Context/CategoryContext/Category';

ReactDOM.createRoot(document.getElementById('root')).render(

    <CategoryContextProvider>
        <App />
    </CategoryContextProvider>
)
