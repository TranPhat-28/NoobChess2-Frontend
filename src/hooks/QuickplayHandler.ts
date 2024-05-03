import axios from "axios";
import { Chess, Square } from "chess.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OptionSquares } from "../types";
import { setHistory } from "../redux/features/quickplaySlice";
import { PromotionPieceOption } from "react-chessboard/dist/chessboard/types";
import useGlobalModal from "./GlobalModalHandler";

const useQuickplayHandler = () => {
    const { openGlobalModal } = useGlobalModal();

    // Navigate
    const dispatch = useDispatch();

    // The game
    const [game, setGame] = useState<Chess>(
        new Chess("7k/8/6K1/8/8/8/8/R7 w - - 0 1")
    );

    // Highlighting the squares
    const [moveFrom, setMoveFrom] = useState("");
    const [moveTo, setMoveTo] = useState(null);

    // Promotion dialog
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [optionSquares, setOptionSquares] = useState({});

    function getMoveOptions(square: Square) {
        const moves = game.moves({
            square,
            verbose: true,
        });
        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }

        const newSquares: OptionSquares = {};
        moves.map((move) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) &&
                    game.get(move.to).color !== game.get(square).color
                        ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                        : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                borderRadius: "50%",
            };
            return move;
        });
        newSquares[square] = {
            background: "rgba(255, 255, 0, 0.4)",
        };
        setOptionSquares(newSquares);
        return true;
    }

    async function fetchAiResponseMove() {
        try {
            const aiMoveResponse = await toast.promise(
                axios.post("/api/Singleplayer/Guess", {
                    guessModeInputFEN: game.fen(),
                }),
                {
                    pending: "AI is thinking...",
                    error: "Something went wrong",
                }
            );

            // Some error happened
            if (!aiMoveResponse.data.isSuccess) {
                openGlobalModal({
                    title: "Error",
                    content:
                        "Oops! Something went wrong on the server and the game was interrupted.",
                    img: "/error.png",
                    confirmButton: "Home",
                    onConfirmNavigate: "/",
                    showCancelButton: false,
                });
                console.log(aiMoveResponse.data.message);
            }
            // If gameover
            else if (aiMoveResponse.data.data.isGameOver) {
                // Make the move (if Black won)
                if (aiMoveResponse.data.data.wonSide === "Black") {
                    const gameCopy = game;
                    const move = gameCopy.move({
                        from: aiMoveResponse.data.data.from,
                        to: aiMoveResponse.data.data.to,
                        promotion: aiMoveResponse.data.data.promotion,
                    });
                    // setBlackHistory([
                    //     ...blackHistory,
                    //     `${move.from}${move.to}`,
                    // ]);
                    dispatch(
                        setHistory({
                            side: "black",
                            move: `${move.from}${move.to}`,
                        })
                    );
                }

                openGlobalModal({
                    title: "Gameover",
                    content: `${aiMoveResponse.data.data.wonSide} won with a ${aiMoveResponse.data.data.endgameType}`,
                    img: `${
                        aiMoveResponse.data.data.wonSide === "White"
                            ? "victory.png"
                            : "defeat.png"
                    }`,
                    confirmButton: "Home",
                    onConfirmNavigate: "/",
                    showCancelButton: true,
                });
            } else {
                const gameCopy = game;
                const move = gameCopy.move({
                    from: aiMoveResponse.data.data.from,
                    to: aiMoveResponse.data.data.to,
                    promotion: aiMoveResponse.data.data.promotion,
                });

                // setBlackHistory([...blackHistory, `${move.from}${move.to}`]);
                dispatch(
                    setHistory({
                        side: "black",
                        move: `${move.from}${move.to}`,
                    })
                );

                setGame(gameCopy);
                setMoveFrom("");
                setMoveTo(null);
                setOptionSquares({});
            }
        } catch (err) {
            // console.log(err);
            // toast.error("Something went wrong");
            openGlobalModal({
                title: "Error",
                content:
                    "Oops! Something went wrong on the server and the game was interrupted.",
                img: "/error.png",
                confirmButton: "Home",
                onConfirmNavigate: "/",
                showCancelButton: false,
            });
            console.log(err);
        }
    }

    function onSquareClick(square) {
        // from square
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions) setMoveFrom(square);
            return;
        }

        // to square
        if (!moveTo) {
            // check if valid move before showing dialog
            const moves = game.moves({
                moveFrom,
                verbose: true,
            });
            const foundMove = moves.find(
                (m) => m.from === moveFrom && m.to === square
            );
            // not a valid move
            if (!foundMove) {
                // check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square);
                // if new piece, setMoveFrom, otherwise clear moveFrom
                setMoveFrom(hasMoveOptions ? square : "");
                return;
            }

            // valid move
            setMoveTo(square);

            // if promotion move
            if (
                (foundMove.color === "w" &&
                    foundMove.piece === "p" &&
                    square[1] === "8") ||
                (foundMove.color === "b" &&
                    foundMove.piece === "p" &&
                    square[1] === "1")
            ) {
                setShowPromotionDialog(true);
                return;
            }

            // is normal move
            const gameCopy = game;
            const move = gameCopy.move({
                from: moveFrom,
                to: square,
                promotion: "q",
            });

            // console.log(`White ${move.from}${move.to}`)
            // setWhiteHistory([...whiteHistory, `${move.from}${move.to}`]);
            dispatch(
                setHistory({
                    side: "white",
                    move: `${move.from}${move.to}`,
                })
            );

            // if invalid, setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            setGame(gameCopy);

            fetchAiResponseMove();
            setMoveFrom("");
            setMoveTo(null);
            setOptionSquares({});
            return;
        }
    }

    function onPromotionPieceSelect(piece?: PromotionPieceOption) {
        // if no piece passed then user has cancelled dialog, don't make move and reset
        if (piece) {
            const gameCopy = game;
            const move = gameCopy.move({
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() ?? "q",
            });

            // console.log(`White ${move.from}${move.to}`)
            // setWhiteHistory([...whiteHistory, `${move.from}${move.to}`]);
            dispatch(
                setHistory({
                    side: "white",
                    move: `${move.from}${move.to}`,
                })
            );

            setGame(gameCopy);
            fetchAiResponseMove();
        }

        setMoveFrom("");
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});
        return true;
    }

    return {
        game,
        onSquareClick,
        optionSquares,
        showPromotionDialog,
        onPromotionPieceSelect,
        moveTo,
    };
};

export default useQuickplayHandler;
