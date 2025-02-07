import React from "react";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
const useSearchParamsstate = () => {
    const router: NextRouter = useRouter();
    return {
        setQuery: (props: { [key: string]: string }) => router.replace({ query: { ...router.query, ...props } }),
        getDetails: () => router,
        setPath: (pathname: string) => router.replace(pathname),
        query:router.query
    }
}
export default useSearchParamsstate;