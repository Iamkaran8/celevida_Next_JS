import styles from '@/styles/dashboard/AssesmentReport/AssesmentReport.module.css'
import Image from 'next/image';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function AssesmentReport({ name, age, weight, height, gender, phone, status, onClose, allData }) {
    console.log("all data", allData)
    const formatDate = (isoDate) => {
        if (!isoDate) return "N/A";
        const date = new Date(isoDate);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: "Asia/Kolkata"
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    };
    // 👉 Download as PDF function
    const handleDownloadPDF = async () => {
        const input = document.getElementById("report-content"); // target report container
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4"); // portrait, A4 size
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Assessment_Report.pdf");
    };

    // const handleDownloadPDF = async () => {
    //     const input = document.getElementById("report-content");

    //     // Clone report to avoid disturbing UI
    //     const clonedNode = input.cloneNode(true);
    //     clonedNode.style.width = "1024px";  // force desktop width
    //     clonedNode.style.maxWidth = "1024px";
    //     clonedNode.style.minWidth = "1024px";
    //     clonedNode.style.transform = "scale(1)";
    //     clonedNode.style.margin = "0 auto";
    //     clonedNode.style.position = "absolute";
    //     clonedNode.style.left = "-9999px"; // keep it hidden

    //     document.body.appendChild(clonedNode);

    //     // Generate canvas from cloned desktop version
    //     const canvas = await html2canvas(clonedNode, { scale: 2 });
    //     const imgData = canvas.toDataURL("image/png");

    //     const pdf = new jsPDF("p", "mm", "a4");
    //     const pdfWidth = pdf.internal.pageSize.getWidth();
    //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    //     pdf.save("Assessment_Report.pdf");

    //     // Clean up
    //     document.body.removeChild(clonedNode);
    // };


    return (
        <div className={styles.container}>
            <div className={styles.inner_container} id='report-content'>
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
                        <p>Name : {allData.Last_Name}</p>
                        <p>Age : {allData.Age}</p>
                        <p>Weight : {allData.Body_Weight_kg}</p>
                        <p>Height : {height}</p>
                        <p>Gender : {allData.Genders}</p>
                        <p>Phone : {allData.Phone}</p>
                    </div>
                </div>


                <div className={styles.bmi_container}>
                    <div className={styles.bmi_head}>
                        <Image src="/images/report.png" height={28} width={26} alt='image' />
                        <h3>BMI Assessment</h3>
                    </div>
                    <div>
                        <p className={styles.bmi_red}>BMI : {allData.BMI} Kg/m</p>
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
                            <div className={`${styles.nutrition_assesment_result_inner_cont} ${allData.Protein_Rich_Foods === "Adequate" ? styles.res_inner_green_cont : styles.res_inner_red_cont}`}>
                                <div className={`${allData.Protein_Rich_Foods === "Adequate" ? styles.green_circle : styles.red_circle} ${styles.circle_cont}`}>
                                    <span className={styles.count_txt}>1/5</span>
                                </div>
                                <p className={`${allData.Protein_Rich_Foods === "Adequate" ? styles.green_clr_result_txt : styles.red_clr_result_txt}`} >Protein - Rich Foods</p>
                                <h3 className={`${allData.Protein_Rich_Foods === "Adequate" ? styles.green_clr_result_txt : styles.red_clr_result_txt}`}>{allData.Protein_Rich_Foods}</h3>
                            </div>
                        </div>

                        <div className={styles.nutrition_assesment_result_Outer_cont}>
                            <div className={`${styles.nutrition_assesment_result_inner_cont} ${allData.Fibre_Rich_Foods === "Adequate" ? styles.res_inner_green_cont : styles.res_inner_red_cont}`}>
                                <div className={`${allData.Fibre_Rich_Foods === "Adequate" ? styles.green_circle : styles.red_circle} ${styles.circle_cont}`}>
                                    <span className={styles.count_txt}>1/5</span>
                                </div>
                                <p className={`${allData.Fibre_Rich_Foods === "Adequate" ? styles.green_clr_result_txt : styles.red_clr_result_txt}`}>Fibre Rich Foods</p>
                                <h3 className={`${allData.Fibre_Rich_Foods === "Adequate" ? styles.green_clr_result_txt : styles.red_clr_result_txt}`}>{allData.Fibre_Rich_Foods}</h3>
                            </div>
                        </div>

                        <div className={styles.nutrition_assesment_result_Outer_cont}>
                            <div className={`${styles.nutrition_assesment_result_inner_cont} ${allData.Carb_Rich_Foods === "Adequate" ? styles.res_inner_green_cont : styles.res_inner_red_cont}`}>
                                <div className={`${allData.Carb_Rich_Foods === "Adequate" ? styles.green_circle : styles.red_circle} ${styles.circle_cont}`}>
                                    <span className={styles.count_txt}>1/5</span>
                                </div>
                                <p className={`${allData.Carb_Rich_Foods === "Adequate" ? styles.green_clr_result_txt : styles.red_clr_result_txt}`}>Carbohydrate-rich foods</p>
                                <h3 className={`${allData.Carb_Rich_Foods === "Adequate" ? styles.green_clr_result_txt : styles.red_clr_result_txt}`}>{allData.Carb_Rich_Foods}</h3>
                            </div>
                        </div>

                        <div className={styles.nutrition_assesment_result_Outer_cont}>
                            <div className={`${styles.nutrition_assesment_result_inner_cont} ${allData.Fat_Rich_Foods === "Adequate" ? styles.res_inner_green_cont : styles.res_inner_red_cont}`}>
                                <div className={`${allData.Fat_Rich_Foods === "Adequate" ? styles.green_circle : styles.red_circle} ${styles.circle_cont}`}>
                                    <span className={styles.count_txt}>1/5</span>
                                </div>
                                <p className={`${allData.Fat_Rich_Foods === "Adequate" ? styles.green_clr_result_txt : styles.red_clr_result_txt}`}>Fat-rich foods</p>
                                <h3 className={`${allData.Fat_Rich_Foods === "Adequate" ? styles.green_clr_result_txt : styles.red_clr_result_txt}`}>{allData.Fat_Rich_Foods}</h3>
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
                    <p className={styles.blue_txt}>Report generated on: {allData?.Created_Time ? formatDate(allData.Created_Time) : "N/A"}</p>
                    <p className={styles.para_txt} >Celevida GlucoControl Program Nutrition Tracker v3.0</p>
                </div>
                <div>
                    <div className={styles.btn_container}>
                        <button onClick={handleDownloadPDF}>Download PDF</button>
                    </div>
                </div>
            </div>

        </div>
    );
}


