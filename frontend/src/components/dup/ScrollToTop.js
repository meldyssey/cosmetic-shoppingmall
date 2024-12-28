import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    console.log("ScrollToTop component rendered");

    const { pathname } = useLocation();

    useEffect(() => {
        // console.log("ScrollToTop triggered with pathname:", pathname);
        // console.log("ecewcewcewecc:", window);
        // console.log(
        //     "Scrollable:",
        //     document.body.scrollHeight > window.innerHeight
        // );
        // console.log("Page height:", document.body.scrollHeight);
        // console.log("Viewport height:", window.innerHeight);

        console.log("Before scroll:", window.scrollY);
        window.scrollTo(0, 0);
        console.log("After scroll:", window.scrollY);
    }, [pathname]);

    return <></>;
};

export default ScrollToTop;
