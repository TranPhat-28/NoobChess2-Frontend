import { Chessboard } from "react-chessboard";
import QuickPlayRandomAvatar from "../../components/QuickPlayRandomAvatar";
import { MdHistory } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";

const QuickPlay = () => {
    const randomUsername = Math.round(Math.random() * 1000).toString();

    return (
        <div className="h-full w-full bg-base-300 flex flex-col justify-center items-center">
            <div className="w-full p-2 max-w-md md:max-w-6xl flex flex-col items-center gap-2 md:grid md:grid-cols-2">
                <div className="w-full md:h-full md:col-start-2 flex md:flex-col gap-2">
                    <div className="bg-base-200 rounded-lg shadow-lg flex-1 flex p-2 gap-2 md:items-center md:pl-6 md:pr-6 md:gap-6">
                        <div className="h-12 w-12 md:h-24 md:w-24 rounded-full bg-base-100">
                            <QuickPlayRandomAvatar username={randomUsername} />
                        </div>

                        <div className="flex-1">
                            <p className="font-bold md:text-3xl">
                                Player#{randomUsername}
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
                            <QuickPlayRandomAvatar username={randomUsername} />
                        </div>

                        <div className="flex-1">
                            <p className="font-bold md:text-3xl">
                                Player#{randomUsername}
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
                    <Chessboard />
                </div>
                <div className="w-full h-32 md:col-start-2 md:h-full flex flex-col gap-2">
                    <div className="w-full flex-1 flex shadow-md p-2 bg-base-200 rounded-lg">
                        <div className="flex-1 bg-pink-300">
                            History goes here
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
