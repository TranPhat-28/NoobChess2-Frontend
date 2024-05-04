import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const GlobalModal = () => {
    const {
        title,
        content,
        img,
        confirmButton,
        onConfirmNavigate,
        showCancelButton,
    } = useSelector((state: RootState) => state.globalModal);

    const navigate = useNavigate();

    return (
        <dialog id="global_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-2">{content}</p>
                {img && <img className="w-64 ml-auto mr-auto" src={img} />}

                <div className="modal-action">
                    <form method="dialog">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                if (onConfirmNavigate) {
                                    navigate(onConfirmNavigate);
                                }
                            }}
                        >
                            {confirmButton ? confirmButton : "OK"}
                        </button>
                        {showCancelButton === true && (
                            <button className="btn ml-2">Cancel</button>
                        )}
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default GlobalModal;
