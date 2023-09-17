import { Helmet } from "react-helmet"
import notFoundPng from "../Assets/Monster 404 Error.gif"

const NotFound = () => {
    return (
        <div className="text-center w-100 my-5">
            <Helmet>
                <meta charSet="utf-8" />
                <title>404</title>
            </Helmet>
            <img src={notFoundPng} alt="404" />
        </div>
    )
}

export default NotFound
