import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Utils/baseUrl';
import { toast } from 'react-toastify';


const LoginWithGoogleGmail = ({saveUserData}) => {
    const navigate = useNavigate();
    const notify = (msg, type) => toast[type](msg);

    const onSuccess = (credentialResponse) => {
        const idToken = credentialResponse.credential;
        sendIdTokenToBackend(idToken);
    };

    const onError = () => {
        console.log('Login failed');
    };

    const sendIdTokenToBackend = (credential) => {
        axios.post(`${baseUrl}/auth/loginWithGmail`, { credential })
            .then((data) => {
                if (data.status === 201 || data.status === 200) {
                    localStorage.setItem("token", data.data.access_token);
                    saveUserData();
                    notify("success", "success");
                    navigate('/');
                }
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    };

    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {},
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
            />
        </form>
    );
}
export default LoginWithGoogleGmail;
