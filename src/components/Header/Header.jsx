"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CompassusIcon from "@/assests/HeaderIcon.svg";
import Profile from "@/assests/Profile.png";
import LeftBar from "@/assests/LeftBar.svg";
import styles from "@/components/Header/header.module.scss";
import { allowedRoutes, redirectRoute, translateLabel } from "@/utility/globals";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setSSOAuth } from "@/lib/feature/login/loginSlice";
import { navigate } from "@/app/actions";
import Button from "@/components/Button/Button";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Header() {
    const dispatch = useAppDispatch();
    const selector = useAppSelector;
    const { userName } = selector(state => state.login)
    const [isHidden, setIsHidden] = useState(false);
    const [isHome, setIsHome] = useState(false);
    const logoutRef = useRef(null);
    const path = usePathname();

    const handleClickOutside = (e) => {
        if (logoutRef?.current && !logoutRef?.current?.contains(e?.target)) {
            setIsHidden(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        if (path?.includes(allowedRoutes?.[0])) {
            setIsHome(true)
        }
        else {
            setIsHome(false)
        }
        return (() => document.removeEventListener('click', handleClickOutside))
    }, [path])


    const handleProfileClick = (e) => {
        e.preventDefault();
        setIsHidden(!isHidden);
    };

    const handleHomeBtn = () => {
        navigate(allowedRoutes?.[0]);
    }

    const logoutClick = (e) => {
        e.preventDefault();
        setIsHidden(false);
        /* need to add the logout URL in the Azur config*/
        signOut({ redirect: false, callbackUrl: '/' })
        dispatch(setSSOAuth(false))
    };

    return (
        <div className={styles.headerDiv}>
            <div>
                <Image
                    className="headerImg"
                    src={CompassusIcon}
                    alt="HeaderIcon"
                    data-testid="header_icon"
                ></Image>
            </div>
            <div className="homeSection">
                {!isHome && <Button
                    onClick={handleHomeBtn}
                    label={translateLabel.headerFooter.homeBtn}
                    tag="button"
                    className="homeBtn"
                    testId="homeBtn"
                />}
                <div ref={logoutRef} className="profileDiv">
                    <p data-testid="profile_name">{userName}</p>
                    <span className="userImg">
                        <Image
                            className="profileImage"
                            src={Profile}
                            alt="userProfile"
                            data-testid="profile_icon"
                            onClick={(e) => handleProfileClick(e)}
                        />
                    </span>

                    <div className={isHidden ? "logout-section" : "profileHidden"}>
                        <Image src={LeftBar} className="left-bar" alt="left-bar" />
                        <p data-testid="logout-btn" onClick={(e) => logoutClick(e)}>
                            {translateLabel.headerFooter.logoutLabel}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}