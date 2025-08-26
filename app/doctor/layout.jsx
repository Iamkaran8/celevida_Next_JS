import { Sidebar } from "@/components/sidebar/Sidebar";
import styles from '../../styles/dashboard/dashboardLayout.module.css'


export default function layout({ children }) {
    return (
        <div className={styles.dashboardContainer}>
            {/* <div>
                <Sidebar />
            </div> */}
            <div className={styles.left_side}  >
                {children}
            </div>
        </div>
    )
}