import axios from "axios";
import { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { MdHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import PlayerInfoCard from "../../components/PlayerInfoCard";
import useGlobalModal from "../../hooks/GlobalModalHandler";
import useQuickplayHandler from "../../hooks/QuickplayHandler";
import { RootState } from "../../redux/store";
import { hideLoading, showLoading } from "../../utilities";
import { resetQuickplayData } from "../../redux/features/quickplaySlice";

const QuickPlay = () => {
    // Game handler
    const {
        game,
        onSquareClick,
        optionSquares,
        showPromotionDialog,
        onPromotionPieceSelect,
        moveTo,
    } = useQuickplayHandler();

    // Dispatch
    const dispatch = useDispatch();

    // Modal handler
    const { openGlobalModal } = useGlobalModal();

    // Game history
    const history = useSelector((state: RootState) => state.quickplay.history);

    useEffect(() => {
        // Show the loading modal
        showLoading();
        // Reset the quickplay data from previous (if any)
        dispatch(resetQuickplayData());

        // Request to get backend ready
        axios
            .get("/api/IsReady")
            .then((response) => {
                if (response.data == "OK") {
                    // Close the loading modal
                    hideLoading();
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
                    <PlayerInfoCard player={"random"} />
                    <PlayerInfoCard player={"ai"} />
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
                    <button
                        className="btn btn-primary w-full"
                        onClick={() =>
                            openGlobalModal({
                                title: "Quit game",
                                content: "Do you want to quit the game?",
                                confirmButton: "Leave",
                                onConfirmNavigate: "/",
                                showCancelButton: true,
                            })
                        }
                    >
                        Finish game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuickPlay;
