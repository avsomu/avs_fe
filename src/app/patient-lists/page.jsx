import dynamic from "next/dynamic";
const PatientListComponent = dynamic(
    () => import("@/components/PatientListComponent/PatientListComponent"),
    {
        loading: () => <p>Loading...</p>,
    }
);
export default async function PatientList() {
    const id = "0004";
    const dataRes = await getData(id);
    return <PatientListComponent data={dataRes} />;
}

export async function getData({ patientId = "" }) {
    /*const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    }
    const listOfPatients = await fetch('{{baseUrl}}/idg/patients/', {
        method: "GET",
        headers: headers
    });

    const records = await listOfPatients.json().then(res => res).catch((error) => error);
    console.log('rescords', records)
    return records;*/
    const res = fetch(`https://jsonplaceholder.typicode.com/posts/1`)
        .then((res) => res.json())
        .then((rsp) => rsp)
        .catch((error) => console.error("error", error));
    return res;
}