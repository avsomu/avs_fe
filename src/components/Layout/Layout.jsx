"use client";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setExpiryFalse, setSSOAuth, setUserName } from "@/lib/feature/login/loginSlice";

function Layout({ children }) {
    const dispatch = useAppDispatch();
    const selector = useAppSelector;
    const { ssoAuthenticated, expiryFalse } = selector(state => state.login);
    const { data, status } = useSession();
    console.log({ data, status })

    useEffect(() => {
        if (data) {
            dispatch(setSSOAuth(true))
            dispatch(setUserName(data?.user?.name))
            const tokenExp = data?.expires && Math.floor(new Date(data?.expires).getTime() / 1000);
            const currentTime = Math.floor(Date.now() / 1000);
            // console.log({ tokenExp, currentTime })
            if (currentTime > tokenExp) {
                dispatch(setExpiryFalse(true));
            }
            else {
                dispatch(setExpiryFalse(false));
            }
        }

    }, [data, ssoAuthenticated, expiryFalse])

    if (!ssoAuthenticated && status === 'unauthenticated') {
        return (
            <div className="signIn-AD">
                <button className="sign-Azure" onClick={() => signIn('azure-ad')}>{'Sign In With AD'}</button>
            </div>
        );
    }
    else {
        return (
            <>{children}</>
        );
    }
}

export default Layout;
