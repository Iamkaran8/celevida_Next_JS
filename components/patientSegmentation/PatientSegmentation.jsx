

import { useSelector } from 'react-redux';
import { selectFilteredPatients } from '../../app/store/slices/doctorSlice';
import DoughnutChart from '../charts/Doughnut';
import styles from '../../styles/dashboard/PatientSegmentation/PatientSegmentation.module.css';








export const PatientSegmentation = () => {
  const filteredPatients = useSelector(selectFilteredPatients);

  const prescribed = filteredPatients.filter(p => p.StatusPrespcription === "Celevida_Onboarded").length;
  const nurture = filteredPatients.filter(p => p.StatusPrespcription === "Celevida_Nurture").length;
  const not_prescribed = filteredPatients.filter(p => !["Celevida_Onboarded", "Celevida_Nurture"].includes(p.StatusPrespcription)).length;

  const total = prescribed + nurture + not_prescribed;

  const prescribedPercentage = total ? (prescribed / total) * 100 : 0;
  const nurturePercentage = total ? (nurture / total) * 100 : 0;
  const not_prescribedPercentage = total ? (not_prescribed / total) * 100 : 0;

  return (
    <div className={styles.PatientSegmentation_container}>
      <h3>Patient Segmentation</h3>
      <div className={styles.pie_chart_Outer_cont}>
        <div className={styles.pie_chart_Cont}>
          <div className={styles.chart_circle}>
            <DoughnutChart prescribed={prescribed} nurture={nurture} not_prescribed={not_prescribed} />
          </div>
        </div>
        <div className={styles.status_cont}>
          <p className={styles.status_li}><span className={styles.green_Circle}></span>Prescribed {prescribedPercentage.toFixed(2)}%</p>
          <p className={styles.status_li}><span className={styles.Blue_CLr_Circle}></span>Nurture {nurturePercentage.toFixed(2)}%</p>
          <p className={styles.status_li}><span className={styles.gray_Circle}></span>Not Prescribed {not_prescribedPercentage.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};
