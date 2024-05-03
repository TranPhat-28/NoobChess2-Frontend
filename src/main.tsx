import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import GlobalModal from "./components/GlobalModal/index.tsx";
import Loading from "./components/Loading/index.tsx";

axios.defaults.baseURL = "https://noob-chess-server.onrender.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
                <BrowserRouter>
                    <App />
                    <ToastContainer />
                    <Loading />
                    <GlobalModal />
                </BrowserRouter>
            </GoogleOAuthProvider>
        </Provider>
    </React.StrictMode>
);
