"use client";
import { useState } from "react";
import Image from "next/image";
import likeThumbs from "@/assests/Like.svg";
import unlikeThumbs from "@/assests/Unlike.svg";
import Button from "@/components/Button/Button";
import { applyFooter } from "@/utility/globals";
import { translateLabel } from "@/utility/globals";
import styles from "@/components/Footer/footer.module.scss";

export default function Footer({ screen = "", onFooterDialog = () => { } }) {
    const [editCopyBtn, setEditCopyBtn] = useState(false);
    const handleBtnClick = (e, btnName = "") => {
        e.preventDefault();
        if (btnName === "Edit" || btnName === "Save") {
            setEditCopyBtn(!editCopyBtn)
        }
        onFooterDialog(btnName)
    };

    return (
        <div
            className={
                screen && screen !== "" && applyFooter.includes(screen)
                    ? styles.footerContainer
                    : styles.hiddenFooter
            }
            id="footerBox"
            data-test-id="footerBox"
        >
            <Button
                onClick={(e) => handleBtnClick(e, "backBtn")}
                label={translateLabel.headerFooter.backBtn}
                tag="button"
                testId="back-btn"
                className="backBtn"
            />
            {screen && screen === "pdp" && (
                <div>
                    <Button
                        onClick={(e) => handleBtnClick(e, "idgBtn")}
                        label={translateLabel.headerFooter.idgBtn}
                        tag="button"
                        className="idgBtn"
                        testId='idgBtn'
                    />
                </div>
            )}
            {screen && screen === "idg" ? (
                <>
                    <div className="idg-box">
                        <Button
                            onClick={(e) => handleBtnClick(e, !editCopyBtn ? translateLabel.headerFooter.editBtn : translateLabel?.headerFooter?.saveBtn)}
                            label={!editCopyBtn ? translateLabel.headerFooter.editBtn : translateLabel?.headerFooter?.saveBtn}
                            tag="button"
                            className="editBtn"
                            testId="editBtn"
                        />
                        <Button
                            onClick={(e) => handleBtnClick(e, translateLabel.headerFooter.copyBtn)}
                            label={translateLabel.headerFooter.copyBtn}
                            tag="button"
                            className={editCopyBtn ? "copyBtnDisable" : "copyBtn"}
                            disabled={editCopyBtn ? true : false}
                            testId="copyBtn"
                        />
                    </div>
                    <div className="feed-flex-box">
                        <p className="share-feedback">
                            {translateLabel.headerFooter.shareFeedback}
                        </p>
                        <div className="like-feed-box">
                            <Image className="like-icon" src={likeThumbs} alt="likeThumbs" />
                        </div>
                        <div className="unlike-feed-box">
                            <Image
                                className="unlike-icon"
                                src={unlikeThumbs}
                                alt="unlikeThumbs"
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="empty-container" />
            )}
        </div>
    );
}