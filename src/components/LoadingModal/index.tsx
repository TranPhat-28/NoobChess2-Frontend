import { BeatLoader } from "react-spinners";

const LoadingModal = () => {
    return (
        <dialog id="loadingModal" className="modal">
            <div className="modal-box">
                <p className="text-xl font-bold text-center">Loading</p>
                <div className="w-full flex justify-center py-4">
                    <BeatLoader />
                </div>
                <div role="alert" className="alert flex">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info shrink-0 w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span className="text-xs">
                        We deployed our app using a free service, therefore it
                        might take longer to get ready. Thank you for being
                        patient ❤️
                    </span>
                </div>
            </div>
        </dialog>
    );
};

export default LoadingModal;
