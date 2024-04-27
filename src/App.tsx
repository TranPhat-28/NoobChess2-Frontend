// import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import { Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./pages/Login";

function App() {
    return (
        // <Routes>
        //     <Route path="/" element={<RootLayout />}>
        //         <Route index element={<Home />} />
        //         <Route path="/lobby" element={<Lobby />} />
        //         <Route path="/news" element={<News />} />
        //         <Route path="/social" element={<Social />} />
        //         <Route path="/settings" element={<Settings />} />
        //     </Route>

        //     <Route path="/game" element={<GameLayout />}>
        //         <Route path=":mode" element={<Game />} />
        //     </Route>

        //     <Route path="*" element={<div>Not found</div>} />
        // </Routes>

        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main">
                <Route index element={<div>Lobby</div>} />
                <Route path="social" element={<div>Social</div>} />
            </Route>
            <Route path="/quickplay" element={<div>Quick play</div>} />
        </Routes>
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
