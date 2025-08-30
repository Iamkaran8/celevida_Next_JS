"use client"

import styles from '@/styles/dashboard/RecentPatientActivity/RecentPatientActivityCard.module.css'
import Image from 'next/image'

export const PatientActivityCard = ({
  patient_name,
  patient_id,
  status,
  phone_number,
  date,
  id,
  onShowPopup
}) => {
  // If no patient details → show message
  if (!patient_name && !patient_id) {
    return <p className="text-center">Users Not Found</p>;
  }

  // Otherwise render patient card
  return (
    <div className={styles.card_outer_container} key={id}>
      <div className={styles.patient_details_sec}>
        <div className={styles.patient_details_left}>
          <Image src='/images/person.png' alt='profile-pic' height={28} width={28} />
        </div>
        <div>
          <h4>{patient_name}</h4>
          <p>{patient_id}</p>
        </div>
      </div>

      <div className={styles.Prescription_status_cont}>
        <span className={` ${status === "Celevida_Onboarded"
          ? styles.status_onboarded
          : status === "Celevida_Nurture"
            ? styles.status__nurture
            : styles.defaultStatus
          }`}>
          {status === "Celevida_Onboarded"
            ? "Prescribed"
            : status === "Celevida_Nurture"
              ? "Nurture"
              : "N/A"}
        </span>
      </div>

      <div className={styles.patient_phone_number}>
        <p>{phone_number}</p>
      </div>

      <div className={styles.patient_date}>
        <p>{date}</p>
      </div>

      <div className={styles.patient_action}>
        <Image
          src='/images/show-icon.svg'
          alt='show-Icon'
          height={29}
          width={34}
          onClick={onShowPopup}
          style={{ cursor: 'pointer' }}
        />
        <Image src='/images/download-icon.svg' alt='Download-Icon' height={29} width={34} />
      </div>
    </div>
  );
};
