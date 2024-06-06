import IdgComponent from "@/components/IdgComponent/IdgComponent";

export default function PatientDetail(req) {
    const { searchParams } = req;
    const { id } = searchParams;
    return <IdgComponent patientId={id} />
}