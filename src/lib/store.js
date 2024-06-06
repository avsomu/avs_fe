import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "@/lib/feature/login/loginSlice";
import patientReducer from "@/lib/feature/patient/patientSlice"
 
const rootReducer = combineReducers({
  login: loginReducer,
  patient:patientReducer
});
 
const store = configureStore({
  reducer: rootReducer,
});
 
export default store;