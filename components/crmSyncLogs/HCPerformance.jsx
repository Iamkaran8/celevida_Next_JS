import styles from '@/styles/dashboard/PatientSegmentation/PatientSegmentation.module.css'

import { useSelector } from 'react-redux'
import { HCPerfomanceBarChart } from '../charts/HCPerfomanceBarChart';

export const HCPerformance = () => {
    const { prescribed, nurture, not_prescribed } = useSelector((state) => state.doctor);
    const total = prescribed.length + nurture.length + not_prescribed.length;

    const prescribedPercentage = total ? (prescribed.length / total) * 100 : 0;
    const nurturePercentage = total ? (nurture.length / total) * 100 : 0;
    const not_prescribedPercentage = total ? (not_prescribed.length / total) * 100 : 0;


    return (
        <>
            <div className={styles.PatientSegmentation_container}>
                <div className={styles.pie_chart_Outer_cont}>
                    <HCPerfomanceBarChart/>
                </div>
            </div>
        </>
    )
}