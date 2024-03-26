import loading from "../Assets/loading.gif";
import "./LoadingScreen.modules.scss";

const LoadingScreen = () => {
    return (
        <div className="d-flex justify-content-center align-items-center loading-screen">
            <img src={loading} alt="loading" />
        </div>
    )
}

export default LoadingScreen