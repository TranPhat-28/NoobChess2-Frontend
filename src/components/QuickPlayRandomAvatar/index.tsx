import { minidenticon } from "minidenticons";
import { useMemo } from "react";

const QuickPlayRandomAvatar = ({ username }: { username: string }) => {
    const svgURI = useMemo(
        () =>
            "data:image/svg+xml;utf8," +
            encodeURIComponent(minidenticon(username, 100, 50)),
        [username]
    );
    return <img src={svgURI} alt={username} className="h-full w-full" />;
};

export default QuickPlayRandomAvatar;
