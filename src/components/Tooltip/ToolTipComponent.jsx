import { useEffect, useState } from "react";
import Image from "next/image";
import CloseIcon from '@/assests/CloseIcon.svg';
import VitialVisit from "@/components/VitalVisit/VitalVisit";
import styles from '@/components/Tooltip/tooltip.module.scss';


export default function ToolTipComponent({ label = '', vitalVisit = [], handleClose = () => { }, id = '' }) {
    const [isPlaceTop, setIsisPlaceTop] = useState(false);
    const res = vitalVisit?.find((item) => item?.id === id);
    const footerId = document.getElementById('footerBox')?.getBoundingClientRect();

    useEffect(() => {
        const tooltipElement = document.getElementById(`selected-tooltip-${label}`);
        if (tooltipElement) {
            const placetopBottom = footerId?.bottom - tooltipElement?.getBoundingClientRect().bottom < footerId?.height ? true : false;
            setIsisPlaceTop(placetopBottom)
        }
    }, []);

    useEffect(() => {
        if (isPlaceTop) {
            const tooltipContainer = document.querySelector(`.${styles.tooltipContianer}`)
            if (tooltipContainer) {
                tooltipContainer.style.bottom = "100%",
                    tooltipContainer.style.top = '-200px'
            }
        }
    }, [isPlaceTop])

    return (
        <div data-testid={`selected-tooltip-${label}`} id={`selected-tooltip-${label}`} className={styles.tooltipContianer}>
            <div className="label-space">
                <label className="label-data">{label}</label>
                <Image data-testid="close-btn" className="close-icon" src={CloseIcon} alt="closeIcon" onClick={handleClose} />
            </div>
            <div className="vital-table"> <VitialVisit patientVital={res?.[label]} istooltip={true} /></div>
        </div>
    )
}