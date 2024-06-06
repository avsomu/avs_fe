import { PatientDetailComponent } from "@/components/PatientDetailComponent/PatientDetailComponent";

export default async function PatientDetail(req) {
    const { searchParams } = req;
    const { id } = searchParams;
    const dataRes = await getData();
    return <PatientDetailComponent data={dataRes} patientId={id} />
}

export async function getData() {
    /*const headers = {
       "Authorization": `Bearer ${accessToken}`,
       "Content-Type": "application/json"
   }
   const medicalRecords = await fetch('{{baseUrl}}/idg/summaries/:summary_pk/medical_record/', {
       method: "GET",
       headers: headers
   });
   const vitalVisists = await fetch('{{baseUrl}}/idg/summaries/:summary_pk/visits/', {
       method: "GET",
       headers: headers
   });

   const vitals = await medicalRecords.json().then(res => res).catch((error) => error);
   const vitalVisists=await vitalVisits.json().then(res=>res).catch(error=>error)
   console.log('rescords', {vitals,vitalVists})
   const medicalRecord={
    vital:vitals,
    vists:vitalVists
   }
   return medicalRecord;*/
   
    const res = fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((res) => res.json()).then((data) => data)
        .catch((error) => console.error("error", error));
    return res;
}