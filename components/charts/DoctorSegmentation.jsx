import { useSelector } from 'react-redux';
import DoughnutChart from '../charts/Doughnut';
import styles from '../../styles/dashboard/PatientSegmentation/PatientSegmentation.module.css';

export const DoctorSegmentation = () => {
  const { Feedbacks } = useSelector(
    (state) => state.superadmin
  );

  // Count all Contacts as Celevida Onboarded
  const contactsCount = Feedbacks?.filter(item => item.moduleName === 'Contacts').length || 0;
  
  // Count all Leads as Celevida Nurtured
  const leadsCount = Feedbacks?.filter(item => item.moduleName === 'Leads').length || 0;

  const total = contactsCount + leadsCount;

  const contactsPercentage = total ? (contactsCount / total) * 100 : 0;
  const leadsPercentage = total ? (leadsCount / total) * 100 : 0;

  return (
    <div className={styles.PatientSegmentation_container}>
      <h3>Patient Segmentation</h3>
      <div className={styles.pie_chart_Outer_cont}>
        <div className={styles.pie_chart_Cont}>
          <div className={styles.chart_circle}>
            <DoughnutChart
              prescribed={contactsCount}
              nurture={leadsCount}
              not_prescribed={0}
            />
          </div>
        </div>
        <div className={styles.status_cont}>
          <p className={styles.status_li}>
            <span className={styles.green_Circle}></span>
            Celevida Onboarded (Contacts) {contactsPercentage.toFixed(2)}%
          </p>
          <p className={styles.status_li}>
            <span className={styles.Blue_CLr_Circle}></span>
            Celevida Nurtured (Leads) {leadsPercentage.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};
