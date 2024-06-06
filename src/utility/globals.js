export const applyFooter = ["idg", "pdp"];
export const allowedRoutes = [
    "/patient-lists",
    "/patient-detail",
    "/idg-summary",
];

export const translateLabel = {
    patientLists: {
        label: "Lists of Patients",
        theader: {
            patientId: "Patient ID",
            patientName: "Patient Name",
            lastVisit: "Last Visit",
            idgDue: "IDG Due",
            idgViewBtn: "View IDG Summary",
        },
        tbody: {
            noPatient: "No Patients List Found",
        },
    },
    headerFooter: {
        logoutLabel: "Logout",
        backBtn: "Back",
        editBtn: "Edit",
        copyBtn: "Transfer",
        shareFeedback: "Share Feedback",
        idgBtn: "View IDG Summary",
        saveBtn: "Save",
        homeBtn: "Patient List"
    },
    idgSummary: {
        title: "IDG Summary"
    },
    patientDetails: {
        title: "Patient Details"
    }
};
