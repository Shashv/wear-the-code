import React from "react";
import { useRouter } from "next/router";
const useSearchParamsstate = () => {
    const router = useRouter();
    return {
        setQuery: (props: { [key: string]: string }) => router.replace({ query: { ...router.query, ...props } }),
        getDetails: () => router,
        setPath: (pathname: string) => router.replace(pathname)
    }
}
export default useSearchParamsstate;