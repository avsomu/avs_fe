import { translateLabel } from "@/utility/globals";
import styles from "@/components/Table/table.module.scss";
import Button from "@/components/Button/Button";

export default function Table({
    handleIDGClick = () => { },
    handlePDClick = () => { },
    dataLists = [],
    rowHeader = [],
}) {
    const patientDetailClick = (e, patientIndex) => {
        handlePDClick(e, patientIndex);
    };

    const patientIdgClick = (e, patientIndex) => {
        e.stopPropagation();
        handleIDGClick(e, patientIndex);
    };
    return (
        <div className={styles.responsiveTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {rowHeader?.map((header) => (
                            <th key={header.key}>{header.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataLists?.length ? (
                        dataLists.map((row, index) => (
                            <tr key={index}>
                                {rowHeader.map((column, columnIndex) => (
                                    <td
                                        key={columnIndex}
                                        onClick={(e) =>  patientDetailClick(e, row["id"]) }
                                        data-testid={`pdp-${row[column.key]}`}
                                    >
                                        {column.header ===
                                            translateLabel.patientLists.theader.idgViewBtn &&
                                            row[column.key] ? (
                                            <Button
                                                label={row[column.key]}
                                                tag="button"
                                                type={row[column.key]}
                                                onClick={(e) => patientIdgClick(e, row["id"])}
                                                testId={`idg-${row[column.key]}-${row["name"]}`}
                                                className={
                                                    row[column.key] === "Recertification" ? "recertBtn" : row[column.key] === "Discharge" ? "disBtn" : "idgPLists"
                                                }
                                                disabled={false}
                                            />
                                        ) : (
                                            row[column.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="noPatient">
                                {translateLabel.patientLists.tbody.noPatient}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}