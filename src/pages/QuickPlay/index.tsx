import axios from "axios";
import { useEffect, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { FaCircleInfo } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { useSelector } from "react-redux";
import QuickPlayRandomAvatar from "../../components/QuickPlayRandomAvatar";
import useGlobalModal from "../../hooks/GlobalModalHandler";
import useQuickplayHandler from "../../hooks/QuickplayHandler";
import { RootState } from "../../redux/store";
import { RandomInRange, hideLoading } from "../../utilities";

const QuickPlay = () => {
    // Generate a random seed for random avatar
    const randomInt = useMemo(() => RandomInRange(1000).toString(), []);

    // Game handler
    const {
        game,
        onSquareClick,
        optionSquares,
        showPromotionDialog,
        onPromotionPieceSelect,
        moveTo,
    } = useQuickplayHandler();

    // Modal handler
    const { openGlobalModal } = useGlobalModal();

    // Game history
    const history = useSelector((state: RootState) => state.quickplay.history);

    useEffect(() => {
        // Show the loading modal
        // showLoading();

        // Request to get backend ready
        axios
            .get("/api/IsReady")
            .then((response) => {
                if (response.data == "OK") {
                    // Close the loading modal
                    // hideLoading();
                }
            })
            .catch((e) => {
                // Something went wrong
                console.log(e.message);
                hideLoading();
                openGlobalModal({
                    title: "Error initializing game",
                    content: "Oops! We cannot start a quickgame right now.",
                    img: "/error.png",
                    confirmButton: "Home",
                    onConfirmNavigate: "/",
                    showCancelButton: false,
                });
            });
    }, []);

    return (
        <div className="h-full w-full bg-base-300 flex flex-col justify-center items-center">
            <div className="w-full p-2 max-w-md md:max-w-6xl flex flex-col items-center gap-2 md:grid md:grid-cols-2">
                <div className="w-full md:h-full md:col-start-2 flex md:flex-col gap-2">
                    <div className="bg-base-200 rounded-lg shadow-lg flex-1 flex p-2 gap-2 md:items-center md:pl-6 md:pr-6 md:gap-6">
                        <div className="h-12 w-12 md:h-24 md:w-24 rounded-full bg-base-100">
                            <QuickPlayRandomAvatar username={randomInt} />
                        </div>

                        <div className="flex-1">
                            <p className="font-bold md:text-3xl">
                                Player#{randomInt}
                            </p>
                            <p className="text-sm md:text-2xl">Ranking N/A</p>
                        </div>

                        <div
                            className="tooltip hidden md:block"
                            data-tip="You can send friend request after the game has finished"
                        >
                            <FaCircleInfo size={"40px"} />
                        </div>
                    </div>

                    <div className="bg-base-200 rounded-lg shadow-lg flex-1 flex p-2 gap-2 md:items-center md:pl-6 md:pr-6 md:gap-6">
                        <div className="h-12 w-12 md:h-24 md:w-24 rounded-full bg-base-100">
                            <QuickPlayRandomAvatar username={randomInt} />
                        </div>

                        <div className="flex-1">
                            <p className="font-bold md:text-3xl">
                                Player#{randomInt}
                            </p>
                            <p className="text-sm md:text-2xl">Ranking N/A</p>
                        </div>

                        <div
                            className="tooltip hidden md:block"
                            data-tip="You can send friend request after the game has finished"
                        >
                            <FaCircleInfo size={"40px"} />
                        </div>
                    </div>
                </div>
                <div className="bg-base-200 p-2 rounded-lg shadow-md w-full max-w-sm md:max-w-full md:col-start-1 md:row-start-1 md:row-span-2">
                    <Chessboard
                        id="ClickToMove"
                        animationDuration={200}
                        arePiecesDraggable={false}
                        position={game.fen()}
                        onSquareClick={onSquareClick}
                        onPromotionPieceSelect={onPromotionPieceSelect}
                        customSquareStyles={{
                            ...optionSquares,
                        }}
                        promotionToSquare={moveTo}
                        showPromotionDialog={showPromotionDialog}
                    />
                </div>
                <div className="w-full h-32 md:col-start-2 md:h-full flex flex-col gap-2">
                    <div className="w-full flex-1 flex shadow-md p-2 bg-base-200 rounded-lg">
                        <div className="flex-1">
                            Last move: {history[history.length - 1]?.move}
                        </div>
                        <button className="btn btn-outline btn-ghost btn-square h-full">
                            <MdHistory size={"20px"} />
                        </button>
                    </div>
                    <button className="btn btn-primary w-full">
                        Finish game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuickPlay;
