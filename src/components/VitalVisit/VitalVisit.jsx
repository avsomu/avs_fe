import styles from "@/components/VitalVisit/vitalVisit.module.scss";
import { useEffect } from "react";
export default function VitialVisit({ patientVital = [], istooltip = false }) {
    useEffect(() => {
        if (patientVital) {
            patientVital?.sort((a, b) => new Date(a.date) - new Date(b.date))
        }
    }, [])
    return (
        <table className={styles.tableScrollable}>
            <thead>
                <tr className="thead-flex-box">
                    <th className="firstTh"><div className="scroll-th first-th"></div></th>
                    {patientVital?.map(item => (
                        <th key={item.date}><div className="scroll-th">{item?.date}</div></th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {patientVital?.[0].vitals.map((vital, index) => (
                    <tr key={index}>
                        <th className="vital-key">
                            <div className={`${istooltip ? 'stickey-th th-vital' : 'stickey-th'}`}>
                                {vital.vitalKey}
                            </div>
                        </th>
                        {patientVital?.map((item, idx) => (
                            <td className="border-td" key={idx}>
                                <div className="scroll-td">{item.vitals[index].value}</div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}