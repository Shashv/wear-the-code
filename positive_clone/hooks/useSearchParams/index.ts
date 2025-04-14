// import React from "react";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
const useSearchParamsstate = () => {
    const router: NextRouter = useRouter();
    // console.log("Router details", router.query);
    return {
        setQuery: (props: { [key: string]: string }) => router.replace({ query: { ...router.query, ...props } }),
        getDetails: () => router,
        setPath: (pathname: string) => router.replace(pathname),
        query: router.query
    }
}
export default useSearchParamsstate;