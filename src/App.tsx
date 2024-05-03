// import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import { Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./pages/Login";
import QuickPlay from "./pages/QuickPlay";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/main">
                    <Route index element={<div>Lobby</div>} />
                    <Route path="social" element={<div>Social</div>} />
                </Route>
                <Route path="/quickplay" element={<QuickPlay />} />
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </>
    );
}

export default App;

{
    /* <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
                type="icon"
                shape="circle"
            /> */
}
