export type OptionSquares = {
    [key: string]: {
        background: string;
        borderRadius?: string;
    };
};

export type Move = {
    side: "black" | "white";
    move: string;
};
