import loading from "../Assets/loading.gif"

const LoadingScreen = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <img src={loading} alt="loading" />
        </div>
    )
}

export default LoadingScreen
