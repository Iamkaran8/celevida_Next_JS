
import styles from '@/styles/dashboard/RecentPatientActivity/RecentPatientActivityCard.module.css'
import Image from 'next/image'




export const PatientActivityCard = ({ patient_name, patient_id, status, phone_number, date, id }) => {
    return (
        <>
            {
                <div className={styles.card_outer_container} key={id}>
                    <div className={styles.patient_details_sec}>
                        <div className={styles.patient_details_left}>
                            <Image src='/images/Profile-pic.png' alt='profile-pic' height={28} width={28} />
                        </div>
                        <div>
                            <h4>{patient_name}</h4>
                            <p>{patient_id}</p>
                        </div>
                    </div>
                    <div className={styles.Prescription_status_cont}>
                        <span className={styles.status}>{status}</span>
                    </div>
                    <div className={styles.patient_phone_number}>
                        <p>{phone_number}</p>
                    </div>
                    <div className={styles.patient_date}>
                        <p>{date}</p>
                    </div>
                    <div className={styles.patient_action}>
                        <Image src='/images/show-icon.svg' alt='show-Icon' height={29} width={34} />
                        <Image src='/images/download-icon.svg' alt='Download-Icon' height={29} width={34} />
                    </div>
                </div>


            }

        </>
    )
}