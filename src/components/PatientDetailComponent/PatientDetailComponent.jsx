"use client";
import Header from "@/components/Header/Header";
import styles from "@/components/PatientDetailComponent/patientDetails.module.scss";
import Footer from "@/components/Footer/Footer";
import VitialVisit from "@/components/VitalVisit/VitalVisit";
import { allowedRoutes, applyFooter } from "@/utility/globals";
import { navigate } from "@/app/actions";
import { useAppSelector } from "@/lib/hook";
import { mockData, patientVital } from "@/utility/queryPatientmockData";
import { signOut } from "next-auth/react";
import { setExpiryFalse, setSSOAuth } from "@/lib/feature/login/loginSlice";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

export const PatientDetailComponent = (props) => {
    const { data: { vital = {}, vists = [] }, patientId = '' } = props;
    const selector = useAppSelector;
    const index = patientId === "000001" ? 0 : patientId === "000002" ? 1 : 2;
    const { ssoAuthenticated, expiryFalse } = selector((state) => state.login);
    const { patientName } = selector((state) => state.patient);
    const [modalOpen, setModalOpen] = useState(false)
    const handleBtnClick = (btnName = "") => {
        if (btnName === "idgBtn") {
            navigate(`${allowedRoutes?.[2]}/summary?id=${patientId}`)
        }
        if (btnName === "backBtn") {
            navigate(allowedRoutes?.[0])
        }
    }
    const patientLists = patientVital?.vitals?.filter(item => item?.id === patientId);

    const vitalData = {
        "persons_age": "Patient's Age",
        "gender": "Gender",
        "benefit_period": "Benefit Period",
        "diagnosis": "Diagnosis",
        "allergies": "Allergies",
        "hospice_aide": "Hospice Aide",
    }

    useEffect(() => {
        console.log({ expiryFalse, ssoAuthenticated })
        if (expiryFalse) {
            setModalOpen(true)
        }
    }, [ssoAuthenticated, expiryFalse])
    const onConsentOk = (btn = '') => {
        if (btn === "expiry") {
            setExpiryFalse(false)
            setSSOAuth(false);
            signOut();
        }
    }
    const onCancel = () => {
        setExpiryFalse(false)
        setSSOAuth(false);
        signOut();
    }
    return (
        <>
            {ssoAuthenticated &&
                <>
                    <Modal isModal={modalOpen} setIsModal={setModalOpen} modalName="Expired" isExpiry={true} onConsentOk={(btn) => onConsentOk(btn)} onCancel={onCancel} />
                    <Header />
                    <div className={styles.patientDetails}>
                        <div className="pdp-title">{patientName}</div>
                        <p className="pdp-label">{"Patient Details"}</p>
                        <div className="pdp-bio-container">
                            <div className="pdp-bio">
                                {Object.entries(mockData[index]).map(([key, value]) => (<div className="bio-wrap" key={key}><label>{vitalData[key]}</label><p>{value}</p></div>))}
                            </div>
                        </div>
                        <div className="table-scroll">
                            <VitialVisit patientVital={patientLists?.[0]?.vitalLists} />
                        </div>
                    </div>
                    < Footer screen={applyFooter?.[1]} onFooterDialog={(btnName) => handleBtnClick(btnName)} />
                </>}
        </>
    );
}
