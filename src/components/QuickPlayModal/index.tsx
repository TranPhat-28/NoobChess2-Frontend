import { useNavigate } from "react-router-dom";

const QuickPlayModal = () => {
    const navigate = useNavigate();

    return (
        <dialog id="quickPlayModal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">YOU ARE NOT LOGGED IN</h3>
                <p className="py-4">
                    QuickPlay game will NOT be saved. Do you want to continue?
                </p>
                <div className="modal-action">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            navigate("/quickplay");
                            (document.getElementById(
                                "quickPlayModal"
                            ) as HTMLDialogElement).close();
                        }}
                    >
                        Start
                    </button>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default QuickPlayModal;
