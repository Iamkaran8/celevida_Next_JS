// import styles from '../../styles/patientleveldata/PopulationLevelData.module.css'

// export const PopulationLevelData = ({ title, data }) => {

  
//     return (
//         <>
//             <h4 style={{'marginLeft':'20px'}}>{title}</h4>
//             <div className={styles.container}>


//                 {
//                     data.map((data) => (
//                         <>
//                             <div className={styles.content_container} key={data.id}>
//                                 <h4>{data.value}</h4>
//                                 <p>{data.title}</p>
//                             </div>
//                         </>
//                     ))
//                 }
//             </div>
//         </>
//     )
// }



import styles from '../../styles/patientleveldata/PopulationLevelData.module.css'

export const PopulationLevelData = ({ title, data }) => {
    return (
        <>
            <h4 style={{ marginLeft: '20px' }}>{title}</h4>
            <div className={styles.container}>
                {data.map((item) => (
                    <div className={styles.content_container} key={item.id}>
                        <h4>{item.value}</h4>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
