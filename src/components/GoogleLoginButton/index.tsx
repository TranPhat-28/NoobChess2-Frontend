import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
    return (
        <GoogleLogin
            type="icon"
            onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log("Login Failed");
            }}
        />
    );
};

export default GoogleLoginButton;
