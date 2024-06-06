"use client";
import React from "react";
import Table from "@/components/Table/Table";
import styles from "@/components/PatientListComponent/patientList.module.scss";
import { navigate } from "@/app/actions";
import Header from "@/components/Header/Header";
import { allowedRoutes, translateLabel } from "@/utility/globals";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { setListOfPatients, setPatientName } from "@/lib/feature/patient/patientSlice";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { setExpiryFalse, setSSOAuth } from "@/lib/feature/login/loginSlice";
import { signOut } from "next-auth/react";


export default function PatientListComponent({ data = [] }) {
    const selector = useAppSelector;
    const rowLists = [
        { key: "id", header: translateLabel.patientLists.theader.patientId },
        { key: "name", header: translateLabel.patientLists.theader.patientName },
        { key: "visitDate", header: translateLabel.patientLists.theader.lastVisit },
        { key: "assesment", header: translateLabel.patientLists.theader.idgDue },
        {
            key: "idgStatus",
            header: translateLabel.patientLists.theader.idgViewBtn,
        },
    ];
    const dataLists = [
        {
            id: '000001',
            name: "John Doe",
            visitDate: "04/30/2024",
            assesment: "Due today",
            idgStatus: "Routine",
        },
        {
            id: '000002',
            name: "Mark Steven",
            visitDate: "05/06/2024",
            assesment: "Within 2 days",
            idgStatus: "Routine",
        },
        {
            id: '000003',
            name: "Brian Jason",
            visitDate: "05/10/2024",
            assesment: "Within 4 days",
            idgStatus: "Routine",
        },
        // {
        //     id: 4,
        //     name: "Paul David",
        //     visitDate: "-",
        //     assesment: "within 10 days",
        //     idgStatus: "",
        // },
        // {
        //     id: 6,
        //     name: "Jeffrey Nicholas",
        //     visitDate: "04/06/2024",
        //     assesment: "within a week",
        //     idgStatus: "Routine",
        // },

    ];
    if (dataLists) dataLists?.sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate));
    const { ssoAuthenticated, expiryFalse } = selector(state => state.login);
    const [modalOpen, setModalOpen] = useState(false)
    // const { listofPatient } = selector(state => state.patient);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if (data) {
    //         dispatch(setListOfPatients(data));
    //     }
    // }, [data])

    useEffect(() => {
        console.log({ expiryFalse, ssoAuthenticated })
        if (expiryFalse) {
            setModalOpen(true)
        }
    }, [ssoAuthenticated, expiryFalse])
    const handleIDGClick = (e, btnRow) => {
        e.preventDefault();
        const name = dataLists?.find((item) => item?.id === btnRow)
        dispatch(setPatientName(name?.name))
        navigate(`${allowedRoutes?.[2]}/summary?id=${btnRow}`);
    };
    const handlePDClick = (e, patient) => {
        e.preventDefault();
        const name = dataLists?.find((item) => item?.id === patient)
        dispatch(setPatientName(name?.name))
        navigate(`${allowedRoutes?.[1]}/detail?id=${patient}`);
    };

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
            {ssoAuthenticated && <>
                <Modal isModal={modalOpen} setIsModal={setModalOpen} modalName="Expired" isExpiry={true} onConsentOk={(btn) => onConsentOk(btn)} onCancel={onCancel} />
                <Header />
                <div className={styles.ptListsContainer}>
                    <div className="listsTitle">{"Lists of Patients"}</div>
                    <Table
                        rowHeader={rowLists}
                        dataLists={dataLists}
                        handleIDGClick={handleIDGClick}
                        handlePDClick={handlePDClick}
                    />
                </div>
            </>}
        </>
    );
}