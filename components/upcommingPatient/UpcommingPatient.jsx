import styles from '@/styles/dashboard/upcommingPatient/upcommingpatient.module.css'


export const UpcommingPatient = () => {
    return (
        <>
            <div className={styles.upcommingPatient_container}>
                <div  className={styles.upcommingPatient_inner}>
                    <div style={{ display: 'flex' }}>
                        <div className={styles.patient_details_left}>
                            <span className={styles.up_txt}>Upcoming patient </span>
                            <span className={styles.pt_name}>Nimi Martins </span>
                            <span className={styles.pt_number}>+91 7837738029</span>
                        </div>
                        <div className={styles.patient_details_right}>
                            <span className={styles.date_txt}>Date : <span> 09/08/2025</span></span>
                        </div>
                    </div>
                    <div>
                        <p className={styles.coach}>Coach : <span className={styles.coach_name}>John</span></p>
                        <p><svg className={styles.phone_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z" /></svg><span className={styles.red_clr_txt}> Upcoming Call on</span> <span className={styles.date}> 22/08/2025</span></p>
                    </div>
                </div>
                <div className={styles.btn_cont}>
                    <button>View</button>
                    <button>Download Pdf</button>
                </div>
            </div>
        </>
    )
}