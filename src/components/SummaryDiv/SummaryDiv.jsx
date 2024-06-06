import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/components/SummaryDiv/summary.module.scss";
import ToolTipIcon from "@/assests/ToolTip.svg";
import ToolTipComponent from "@/components/Tooltip/ToolTipComponent";
import { tooltipIndData } from "@/utility/queryPatientmockData";

export default function SummaryDiv({ data = [], isEdit = false, handleEditData = () => { }, id = '' }) {
    const [toolTipIndex, setTooltipIndex] = useState(null);
    const handleTool = (selectedlabel = '') => {
        setTooltipIndex(prevInd => selectedlabel === prevInd ? null : selectedlabel)
        const tooltipElement = document.getElementById(`tooltip-${selectedlabel}`);
        const tooltipPosition = tooltipElement.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({
            top: tooltipPosition,
            behavior: 'smooth'
        })
    }

    const handleClose = () => {
        setTooltipIndex(null)
    }
    useEffect(() => { }, [data])
    return (
        <>
            {data?.map((item, titleIndex) =>
                <div className={styles.summarySection} key={item?.title ?? titleIndex}>
                    <label data-testid="title-id" className="title-section">{item?.title}</label>
                    {item?.sections?.map((section, sectionIndex) =>
                        <div id={`tooltip-${section?.label}`} className="query-flex-box" key={section?.label ?? sectionIndex}>
                            <div className="labelWrap">
                                <label>{section?.label}</label>
                                <Image data-testid={`tool-tip-${section?.label}`} src={ToolTipIcon} alt="tool-tip" onClick={() =>
                                    handleTool(section?.label)} />
                            </div>
                            {toolTipIndex === section?.label &&
                                <ToolTipComponent label={section?.label} vitalVisit={tooltipIndData} handleClose={handleClose} id={id} />
                            }
                            <div className={isEdit ? "query-solution-edit" : "query-solution-box"}>
                                {
                                    isEdit ?
                                        <input type="text" data-testid={`change-${section?.label}`} onChange={(e) => handleEditData(e, titleIndex, section?.label)} value={section?.solutions} />
                                        : <p>{section?.solutions}</p>
                                }
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}