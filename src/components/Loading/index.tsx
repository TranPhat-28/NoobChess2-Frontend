import { BeatLoader } from "react-spinners";

const Loading = () => {
    return (
        <dialog id="loading" className="modal">
            <div className="modal-box max-w-xs">
                <h3 className="font-bold text-xl text-center">Loading</h3>
                <div className="flex justify-center pt-4">
                    <BeatLoader />
                </div>
            </div>
        </dialog>
    );
};

export default Loading;
