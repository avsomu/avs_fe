import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    patientName: "",
    listofPatient: [],
    summaryData: {},
    vitalVisits: [],
    medicalRecords: []
};

export const patientSlice = createSlice({
    name: "patientSlice",
    initialState,
    reducers: {
        setPatientName: (state, action) => {
            state.patientName = action.payload;
        },

        setListOfPatients: (state, action) => {
            state.listofPatient = action.payload
        },

        setSummaryData: (state, action) => {
            state.summaryData = action.payload
        },
        setVitalVists: (state, action) => {
            state.vitalVisits = action.payload
        },
        setMedicalRecords: (state, action) => {
            state.medicalRecords = action.payload
        }
    },
});

export const { setPatientName, setListOfPatients, setSummaryData, setVitalVists, setMedicalRecords } = patientSlice.actions;
export default patientSlice.reducer;