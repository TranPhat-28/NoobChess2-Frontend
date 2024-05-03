export const showLoading = () => {
    const loading = document.getElementById("loading") as HTMLDialogElement;
    loading.showModal();
};

export const hideLoading = () => {
    const loading = document.getElementById("loading") as HTMLDialogElement;
    loading.close();
};
