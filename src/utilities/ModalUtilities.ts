export const showQuickplayModal = () => {
    const modal = document.getElementById(
        "quickPlayModal"
    ) as HTMLDialogElement;
    modal.showModal();
};

export const showLoadingModal = () => {
    const modal = document.getElementById("loadingModal") as HTMLDialogElement;
    modal.showModal();
};
