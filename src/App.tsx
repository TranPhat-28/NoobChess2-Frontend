import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

function App() {
    // const login = useGoogleLogin({
    //     onSuccess: (tokenResponse) => console.log(tokenResponse),
    //     flow: 'implicit',
    // });

    return (
        <>
            {/* <button className="btn btn-secondary" onClick={() => login()}>
                Google login
            </button> */}
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
                type="icon"
                shape="circle"
            />
        </>
    );
}

export default App;
