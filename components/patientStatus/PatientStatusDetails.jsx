"use client"

import Image from 'next/image'
import styles from '../../styles/dashboard/patientStatusDetails/patientStatusDetails.module.css'
import { useParams, useRouter } from 'next/navigation';

export const PatientStatusDetails = ({ title, logo, color, count,navigate }) => {
    const router = useRouter();
    const handleNavigate = () => {
        router.push(`/${navigate}`);
    };
    return (    
        <>
            <div className={styles.Patient_container} onClick={()=>handleNavigate()}>
                <div className={styles.cont_left}>
                    <div className={styles.circle_blue}>
                        <Image src={logo} height={20} width={32} alt="onboarded patients" />
                    </div>
                </div>
                <div className={styles.cont_right}>
                    <span>{title}</span>
                    <h6 style={{ color: color }}>{count}</h6>
                </div>
            </div>
        </>
    )
}