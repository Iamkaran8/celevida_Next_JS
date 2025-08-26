import Image from 'next/image'
import styles from '../../styles/dashboard/patientStatusDetails/patientStatusDetails.module.css'

export const PatientStatusDetails = () => {
    return (
        <>
            <div className={styles.Patient_container}>
                <div className={styles.cont_left}>
                    <div className={styles.circle_blue}>
                        <Image src="/images/onboardedpatients.svg" height={20} width={32} alt="onboarded patients" />
                    </div>
                </div>
                <div className={styles.cont_right}>
                    <span>Onboarded Patients</span>
                    <h6>350</h6>
                </div>
            </div>
        </>
    )
}