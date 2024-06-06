"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import styles from "@/components/IdgComponent/idgComponent.module.scss"
import SummaryDiv from "@/components/SummaryDiv/SummaryDiv";
import { translateLabel } from "@/utility/globals";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { idgDataMock } from "@/utility/idgmockData";
import { useAppSelector } from "@/lib/hook";
import { idgsummaryVital } from "@/utility/queryPatientmockData";
import { formatTextParagraph } from "@/utility/formatparagraph";
import { setExpiryFalse, setSSOAuth } from "@/lib/feature/login/loginSlice";
import { signOut } from "next-auth/react";

export default function IdgComponent(props) {
    const { patientId = '' } = props;
    const selector = useAppSelector;
    const [isModal, setIsModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [modalName, setIsModalName] = useState("");
    const [editText, setEditText] = useState(idgDataMock);
    const [tmpVital, setTempVital] = useState(idgsummaryVital)
    const index = patientId === "000001" ? 0 : patientId === "000002" ? 1 : 2;
    const { ssoAuthenticated, expiryFalse } = selector((state) => state.login);
    const { patientName } = selector((state) => state.patient);
    const reportType = "Routine";

    const router = useRouter();

    const patientBio = {
        "persons_age": "Patient's Age",
        "gender": "Gender",
        "benefit_period": "Benefit Period",
        "diagnosis": "Person's Primary Diagnosis",
    }


    const handleFooterDialog = (btnName = "") => {
        if (btnName !== "Edit" && btnName !== "backBtn") {
            setIsModalName(btnName)
            setIsModal(true)
            setIsEdit(false)
        }
        else if (btnName === "backBtn") {
            router.back();
        }
        else {
            setIsEdit(true)
        }
    }

    const handleEditData = (e, titleIndex, sectionIndex) => {
        const newVal = "".concat(e.target.value);
        const editData = JSON.parse(JSON.stringify(editText));
        editData[titleIndex]?.sections?.forEach((section) => {
            if (section?.label === sectionIndex) {
                section.solutions[0] = newVal;
            }
        })
        setEditText(editData)
    }

    const handleVitalEdit = (e, key) => {
        const newVal = e.target.value;
        setTempVital(prevState => ({
            ...prevState,
            [index]: {
                ...prevState[index],
                [key]: newVal
            }
        }));
    };


    const handleConsentOk = (btn = '') => {
        if (btn === "expiry") {
            setExpiryFalse(false)
            setSSOAuth(false);
            signOut();
        }
    }

    const handleOnSave = () => {
        setEditText(editText)
    }
    const handleCancel = () => {
        setEditText(idgDataMock)
        setTempVital(idgsummaryVital)
        if (expiryFalse) {
            setExpiryFalse(false)
            setSSOAuth(false);
            signOut();
        }

    }

    const transferText = async () => {
        const formattedData = formatTextParagraph(tmpVital[index], patientBio, editText);
        const copiedVal = await navigator.clipboard.writeText(formattedData).then(() => {
            return true
        }).catch(error => { return false })
        return copiedVal;
    }


    useEffect(() => {
        console.log({ expiryFalse, ssoAuthenticated })
        if (expiryFalse) {
            setIsModal(true)
        }
    }, [ssoAuthenticated, expiryFalse])

    return (
        <>
            {ssoAuthenticated && <>
                <Modal isModal={isModal} setIsModal={setIsModal} modalName={expiryFalse ? "Session Expired" : modalName} onSave={handleOnSave} onConsentOk={(btn) => handleConsentOk(btn)}
                    isExpiry={expiryFalse ? true : false}
                    onCancel={handleCancel} handleTransfer={transferText} />
                <Header />
                <div className={styles.idgContainer}>
                    <div className="idg-label">{translateLabel?.idgSummary?.title}</div>
                    <div className="idg-report">
                        <div className="idg-sp-name">{`${patientName}`}</div>
                        <span className="idg-report-type">Report Type: <strong>{`${reportType}`}</strong></span>
                    </div>
                    <div className="idg-bio">
                        {Object.entries(tmpVital[index]).map(([key, value]) => (
                            <div className="idg-bio-flex" key={patientBio[key]}>
                                <label>{patientBio[key]}
                                </label>
                                {isEdit ? <input value={value} onChange={e => handleVitalEdit(e, key)}></input> : <p>{value}</p>}
                            </div>))}
                    </div>
                    <SummaryDiv isEdit={isEdit} handleEditData={(e, titleIndex, sectionIndex) => handleEditData(e, titleIndex, sectionIndex)} data={editText} id={patientId} />
                </div>
                <Footer screen='idg' onFooterDialog={(btnName) => handleFooterDialog(btnName)} />
            </>}
        </>
    )
}