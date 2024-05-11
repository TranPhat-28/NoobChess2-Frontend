import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebookF } from "react-icons/fa6";

const FacebookLoginButton = () => {
    const facebookLogin = () => {
        console.log("Le");
    };

    return (
        <FacebookLogin
            appId="1371810450190886"
            callback={facebookLogin}
            render={(renderProps) => (
                <div onClick={renderProps.onClick}>
                    <button className="login-btn">
                        <FaFacebookF size={"1.1rem"} color={"blue"} />
                    </button>
                </div>
            )}
        />
    );
};

export default FacebookLoginButton;
