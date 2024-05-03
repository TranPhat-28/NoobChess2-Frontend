import { useDispatch } from "react-redux";
import {
    resetModalState,
    setModalState,
} from "../redux/features/globalModalSlice";
import { ModalDataState } from "../types";

const useGlobalModal = () => {
    const dispatch = useDispatch();

    const openGlobalModal = (options: ModalDataState) => {
        dispatch(setModalState(options));

        (
            document.getElementById("global_modal") as HTMLDialogElement
        ).showModal();
    };

    const closeGlobalModal = () => {
        (document.getElementById("global_modal") as HTMLDialogElement).close();
        // Then reset everything
        dispatch(resetModalState());
    };

    return { openGlobalModal, closeGlobalModal };
};

export default useGlobalModal;
