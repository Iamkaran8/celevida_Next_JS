
import styles from '@/styles/dashboard/PatientSegmentation/PatientSegmentation.module.css'

import DoughnutChart from '../charts/Doughnut'
import { useSelector } from 'react-redux'


export const FEActivity = () => {
    const { prescribed, nurture, not_prescribed } = useSelector((state) => state.doctor);
    const total = prescribed.length + nurture.length + not_prescribed.length;

    const prescribedPercentage = total ? (prescribed.length / total) * 100 : 0;
    const nurturePercentage = total ? (nurture.length / total) * 100 : 0;
    const not_prescribedPercentage = total ? (not_prescribed.length / total) * 100 : 0;


    return (
        <>
            <div className={styles.PatientSegmentation_container}>
                <h3>FE Activity</h3>
                <div className={styles.pie_chart_Outer_cont}>
                    <div className={styles.pie_chart_Cont}>
                        <div className={styles.chart_circle}>
                            <DoughnutChart prescribed={prescribed.length} nurture={nurture.length} not_prescribed={not_prescribed.length} />
                        </div>
                    </div>
                    <div className={styles.status_cont}>
                        <p className={styles.status_li}><span className={styles.green_Circle}></span>Prescribed {prescribedPercentage.toFixed(2)}%</p>
                        <p className={styles.status_li}><span className={styles.Blue_CLr_Circle}></span>Nurture {nurturePercentage.toFixed(2)}%</p>
                        <p className={styles.status_li}><span className={styles.gray_Circle}></span>Not Prescribed {not_prescribedPercentage.toFixed(2)}%</p>
                    </div>
                </div>
            </div>
        </>
    )
}