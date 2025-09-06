import LineChart from '../charts/LineChart'
import styles from './GraphOuterContainer.module.css'

export const GraphOuterContainer = ({ title, component }) => {
    return (
        <>
            <div className={styles.outer_container}>
                <h3>{title}</h3>
                <div className={styles.graph_Container} >
                    {component}
                </div>
            </div>
        </>
    )
}