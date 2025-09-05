import styles from '../../styles/patientleveldata/patientLevelData.module.css'
import { PatientLevelData } from './PatientLevelData'

export const PatientLevelDataContainer = () => {
    return (
        <>
            <div className={styles.container}>
                <PatientLevelData />
            </div>
        </>
    )
}