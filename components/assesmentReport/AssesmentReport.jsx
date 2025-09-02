import styles from '@/styles/dashboard/AssesmentReport/AssesmentReport.module.css'
import Image from 'next/image';

export default function AssesmentReport({ name, age, weight, height, gender, phone, status, onClose }) {
    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>


                <div className={styles.program_header}>
                    <div className={styles.close_button}>
                        <button onClick={() => onClose()}>X</button>
                    </div>
                    <h1 > 🩺  Celevida Gluco Control Program</h1>
                    <p>Nutrition Tracker - Assessment Report</p>
                    <div className={styles.purple_clr_line}>

                    </div>
                </div>
                <div className={styles.patient_information_cont}>
                    <div className={styles.information_header}>
                        <div className={styles.head}>
                            <Image src="/images/report.png" height={28} width={26} alt='image' />
                            <h3>Patient Information</h3>
                        </div>
                        <div>
                            <div className={` ${status === "Celevida_Onboarded"
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
                            </div>
                        </div>
                    </div>

                    <div className={styles.personal_details}>
                        <p>Name : {name}</p>
                        <p>Age : {age}</p>
                        <p>Weight : {weight}</p>
                        <p>Height : {height}</p>
                        <p>Gender : {gender}</p>
                        <p>Phone : {phone}</p>
                    </div>
                </div>


                <div className={styles.bmi_container}>
                    <div className={styles.bmi_head}>
                        <Image src="/images/report.png" height={28} width={26} alt='image' />
                        <h3>BMI Assessment</h3>
                    </div>
                    <div>
                        <p className={styles.bmi_red}>BMI : 13.6 Kg/m</p>
                    </div>
                    <div>
                        <p className={styles.bmi_category}><b>Category</b> : Underweight</p>
                    </div>
                    <div>
                        <p className={styles.bmi_action_txt}>BMI does not fall under the normal category. Further evaluation recommended.
                        </p>
                    </div>
                </div>


                <div className={styles.nutrition_assesment_container}>
                    <div className={styles.nutrition_assesment}>
                        <Image src="/images/report.png" height={28} width={26} alt='image' />
                        <h3>Nutrition Analysis</h3>
                    </div>
                    <div className={styles.cont_Nutri}>
                        <div className={styles.nutrition_assesment_result_Outer_cont}>
                            <div className={styles.nutrition_assesment_result_inner_cont}>
                                <div className={`${styles.red_circle} ${styles.circle_cont}`}>
                                    <span className={styles.count_txt}>1/5</span>
                                </div>
                                <p className={styles.green_clr_result_txt}>Protein - Rich Foods</p>
                                <h3 className={styles.red_clr_result_txt}>Excess/Inadequate</h3>
                            </div>
                        </div>

                        <div className={styles.nutrition_assesment_result_Outer_cont}>
                            <div className={styles.nutrition_assesment_result_inner_cont}>
                                <div className={`${styles.red_circle} ${styles.circle_cont}`}>
                                    <span className={styles.count_txt}>1/5</span>
                                </div>
                                <p className={styles.green_clr_result_txt}>Protein - Rich Foods</p>
                                <h3 className={styles.red_clr_result_txt}>Excess/Inadequate</h3>
                            </div>
                        </div>

                        <div className={styles.nutrition_assesment_result_Outer_cont}>
                            <div className={styles.nutrition_assesment_result_inner_cont}>
                                <div className={`${styles.red_circle} ${styles.circle_cont}`}>
                                    <span className={styles.count_txt}>1/5</span>
                                </div>
                                <p className={styles.green_clr_result_txt}>Protein - Rich Foods</p>
                                <h3 className={styles.red_clr_result_txt}>Excess/Inadequate</h3>
                            </div>
                        </div>

                        <div className={styles.nutrition_assesment_result_Outer_cont}>
                            <div className={styles.nutrition_assesment_result_inner_cont}>
                                <div className={`${styles.red_circle} ${styles.circle_cont}`}>
                                    <span className={styles.count_txt}>1/5</span>
                                </div>
                                <p className={styles.green_clr_result_txt}>Protein - Rich Foods</p>
                                <h3 className={styles.red_clr_result_txt}>Excess/Inadequate</h3>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styles.action_required}>
                    <p className={styles.action_required_header}>Action Required</p>
                    <p className={styles.action_required_heade_para}>Your daily habits and food choices need improvement, as you may be at a higher risk of impaired glucose levels and diabetes associated risk factors. Consult your health care provider for further evaluation. Visit now!</p>
                </div>


                <div >
                    <div className={styles.border}>

                    </div>
                </div>


                <div className={styles.report_generate_cont}>
                    <p className={styles.blue_txt}>Report generated on: August 1, 2025 at 11:19 AM</p>
                    <p className={styles.para_txt} >Celevida GlucoControl Program Nutrition Tracker v3.0</p>
                </div>
            </div>
        </div>
    );
}






