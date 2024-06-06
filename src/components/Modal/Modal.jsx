import styles from "@/components/Modal/modal.module.scss"
import FileTransfer from "@/assests/FileTransfer.svg"
import Image from "next/image"
import Consent from "@/assests/Consent.svg"
import NonConsent from "@/assests/NonConsent.svg"
import Button from "@/components/Button/Button"
import { useState } from "react";
import CloseIcon from "@/assests/CloseIcon.svg";
import SuccesIcon from "@/assests/Success.svg";
import DangerIcon from "@/assests/DangerIcon.svg";
import ExpiryIcon from "@/assests/ExpiryIcon.svg";

export default function Modal({ isModal = false, setIsModal = () => { }, modalName = "", onSave = () => { }, onConsentOk = () => { }, onCancel = () => { }, handleTransfer = () => { }, isExpiry = false }) {
    const [isDisable, setIsDisable] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isConsentIcon, setIsConsentIcon] = useState(false);
    const [isError, setIsError] = useState(false)

    const handleConsent = () => {
        setIsConsentIcon(!isConsentIcon)
        setIsDisable(!isDisable)
    }

    const handleCancelBtn = () => {
        setIsSuccess(false)
        setIsError(false);
        setIsModal(false);
        setIsConsentIcon(false);
        setIsDisable(true)
        onCancel();
    }

    const handleTransferBtn = () => {
        const isCopied = handleTransfer();
        isCopied.then(res => {
            if (res) {
                setIsSuccess(true);
                setIsConsentIcon(!isConsentIcon);
                setIsDisable(!isDisable)
            }
            else {
                setIsSuccess(false)
                setIsError(true);
                setIsConsentIcon(!isConsentIcon);
                setIsDisable(!isDisable)
            }
        })

    }

    const handleOkButton = (btn = '') => {
        setIsSuccess(false)
        setIsError(false);
        setIsModal(false)
        onConsentOk(btn)
    }

    const handleSaveBtn = () => {
        setIsSuccess(true)
        onSave()
    }
    return (
        <>
            {
                isModal &&
                <div className={styles.modal}>
                    {
                        modalName !== 'Save' && !isSuccess || isSuccess ?
                            <div className={`${modalName === 'Transfer' ? "transfer modalBox" : "modalBox"}`}>
                                <Image className="close-icon" src={CloseIcon} alt="close-icon" data-testid="close-icon-id" onClick={handleCancelBtn} />
                                <Image className={isExpiry ? "expired" : !isSuccess && !isError ? "fileTransfer" : isError ? "dangerIcon" : "successIcon"} src={isExpiry ? ExpiryIcon : !isSuccess && !isError ? FileTransfer : isError ? DangerIcon : SuccesIcon} alt={!isSuccess ? "file-transfer" : "success-icon"} />
                                <label className="modalLabel">{!isSuccess && !isError ? modalName : isError ? "Error!" : "Success"}</label>
                                {!isSuccess && !isError && !isExpiry ? <>
                                    <div className="labelText">{'Are you sure you want to transfer this summary?'}</div>
                                    <div className="consentFlag">
                                        <Image className="consent-icon" data-testid="handle-consent" src={!isConsentIcon ? NonConsent : Consent} alt="consent-transfer" onClick={handleConsent} />
                                        <p>
                                            <b>Attestation:</b> This <b>IDG Summary/Comprehensive Assessment Update </b>was drafted with the support of generative AI;  I confirm that I have thoroughly reviewed and edited this <b>IDG Summary/Comprehensive Assessment Update </b>to reflect my comprehensive review of the patient’s medical record
                                        </p>
                                    </div>
                                    <div className="btnWrap">
                                        <Button className="cancel-btn-transfer"
                                            onClick={handleCancelBtn}
                                            label={"Cancel"}
                                            disabled={false}
                                            tag="button"
                                            testId={"cancel-btn-transfer"} />
                                        <Button className="btn-transfer"
                                            onClick={handleTransferBtn}
                                            label={"Yes, Transfer"}
                                            disabled={isDisable ? true : false}
                                            tag="button"
                                            testId={"btn-transfer"} />
                                    </div></> :
                                    <>
                                        <div className={isExpiry?"expiryTypo":"successTypo"}>{isExpiry ? "Your session has expired, you will be redirected to the login page." : isError ? "Your summary is not ready to transfer at this moment" : modalName === "Save" ? "Your changes have been successfully saved!" : "Your summary is ready to  transfer!"}</div>
                                        <Button className="ok-btn-transfer" testId={"ok-btn"} onClick={() => handleOkButton(isExpiry ? "expiry" : isError ? "Try Again" : modalName === "Save" ? "save" : "transfer")} label={isError ? "Try Again" : "OK"} disabled={false} tag="button" />
                                    </>}
                            </div> :
                            <div className="modalSave">
                                <Image className="close-icon" src={CloseIcon} alt="close-icon" onClick={handleCancelBtn} />
                                <div className="save-label">{'Save Changes'}</div>
                                <div className="save-context">{'Do you want to save  changes in IDG summary? '}</div>
                                <div className="btn-wrap-save">
                                    <Button className="cancel-btn-transfer"
                                        onClick={handleCancelBtn}
                                        label={"Cancel"}
                                        disabled={false}
                                        tag="button"
                                        testId={"cancel-btn-transfer"} />
                                    <Button className="btn-transfer"
                                        onClick={handleSaveBtn}
                                        label={"Yes"}
                                        disabled={false}
                                        tag="button"
                                        testId={"save-btn"} />
                                </div>
                            </div>
                    }
                </div>
            }
        </>
    )
}