import styles from '@/styles/dashboard/PatientSegmentation/PatientSegmentation.module.css'

export const PatientSegmentation = () => {
    return (
        <>
            <div className={styles.PatientSegmentation_container}>
                <h3>Patient Segmentation</h3>
                <div className={styles.pie_chart_Outer_cont}>
                    <div className={styles.pie_chart_Cont}>
                        <div className={styles.chart_circle}>
                            l
                        </div>
                    </div>
                    <div className={styles.status_cont}>
                        <p className={styles.status_li} ><span className={styles.green_Circle}></span>Prescribed 65%</p>
                        <p className={styles.status_li} ><span className={styles.Blue_CLr_Circle}></span>Nurture 25%</p>
                        <p className={styles.status_li} ><span className={styles.gray_Circle}></span>Not Prescribed 15%</p>
                    </div>
                </div>
            </div>
        </>
    )
}